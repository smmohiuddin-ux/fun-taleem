import * as React from 'react'
import { render } from '@react-email/render'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Funtaleem'
const SENDER_DOMAIN = 'notify.funtaleem.pk'
const FROM_DOMAIN = 'notify.funtaleem.pk'

const ADMIN_RECIPIENTS = ['sales@funtaleem.pk']

const itemSchema = z.object({
  name: z.string().max(200).optional(),
  qty: z.number().int().nonnegative().optional(),
  price: z.number().nonnegative().optional(),
  lineTotal: z.number().nonnegative().optional(),
})

const payloadSchema = z.object({
  test: z.boolean().optional(),
  orderId: z.string().max(40),
  placedAt: z.string().max(60).optional(),
  fullName: z.string().max(120),
  phone: z.string().max(40),
  email: z.string().max(160).optional().nullable(),
  address: z.string().max(400),
  city: z.string().max(80),
  province: z.string().max(80),
  postalCode: z.string().max(20).optional().nullable(),
  notes: z.string().max(600).optional().nullable(),
  items: z.array(itemSchema).max(30),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().nonnegative(),
  paymentMethod: z.string().max(60).optional(),
})

export const Route = createFileRoute('/api/public/order-notify')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env['VITE_SUPABASE_URL']
        const supabaseServiceKey = process.env['SUPABASE_SERVICE_ROLE_KEY']
        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('order-notify: missing server configuration')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let parsed: z.infer<typeof payloadSchema>
        try {
          parsed = payloadSchema.parse(await request.json())
        } catch (err) {
          return Response.json({ error: 'Invalid payload' }, { status: 400 })
        }

        const template = TEMPLATES['order-notification']!
        const element = React.createElement(template.component, parsed as Record<string, unknown>)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const baseSubject =
          typeof template.subject === 'function'
            ? template.subject(parsed as Record<string, any>)
            : template.subject
        const subject = parsed.test ? `[TEST] ${baseSubject}` : baseSubject

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const results: Array<{ ok: boolean }> = []

        for (const recipient of ADMIN_RECIPIENTS) {
          const messageId = crypto.randomUUID()

          const { data: suppressed } = await supabase
            .from('suppressed_emails')
            .select('id')
            .eq('email', recipient.toLowerCase())
            .maybeSingle()

          if (suppressed) {
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: 'order-notification',
              recipient_email: recipient,
              status: 'suppressed',
            })
            results.push({ ok: false })
            continue
          }

          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: 'order-notification',
            recipient_email: recipient,
            status: 'pending',
          })

          const { error: enqueueError } = await supabase.rpc('enqueue_email', {
            queue_name: 'transactional_emails',
            payload: {
              message_id: messageId,
              to: recipient,
              from: `${SITE_NAME} <orders@${FROM_DOMAIN}>`,
              sender_domain: SENDER_DOMAIN,
              subject,
              html,
              text,
              purpose: 'transactional',
              label: 'order-notification',
              idempotency_key: `order-notify-${parsed.orderId}-${recipient}`,
              queued_at: new Date().toISOString(),
            },
          })

          if (enqueueError) {
            console.error('order-notify: enqueue failed', enqueueError)
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: 'order-notification',
              recipient_email: recipient,
              status: 'failed',
              error_message: 'Failed to enqueue email',
            })
            results.push({ ok: false })
            continue
          }

          results.push({ ok: true })
        }

        const queued = results.filter((r) => r.ok).length
        return Response.json({ success: queued > 0, queued })
      },
    },
  },
})
