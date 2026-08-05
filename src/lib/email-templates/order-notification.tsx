import React from 'react'
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface OrderItem {
  name?: string
  qty?: number
  price?: number
  lineTotal?: number
}

export interface OrderNotificationProps {
  orderId?: string
  placedAt?: string
  fullName?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  notes?: string
  items?: OrderItem[]
  subtotal?: number
  shipping?: number
  total?: number
  paymentMethod?: string
}

const pkr = (n?: number) =>
  typeof n === 'number' ? `Rs. ${n.toLocaleString('en-PK')}` : '-'

const OrderNotificationEmail = ({
  orderId = 'FT-00000',
  placedAt,
  fullName = 'Customer',
  phone = '-',
  email,
  address = '-',
  city = '-',
  province = '-',
  postalCode,
  notes,
  items = [],
  subtotal = 0,
  shipping = 0,
  total = 0,
  paymentMethod = 'Cash on Delivery',
}: OrderNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New order ${orderId} - ${pkr(total)} from ${fullName}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>Funtaleem</Text>
          <Heading style={h1}>New order received</Heading>
          <Text style={muted}>
            Order <strong>{orderId}</strong>
            {placedAt ? ` - ${placedAt}` : ''}
          </Text>
        </Section>

        <Section style={card}>
          <Text style={sectionTitle}>Order items</Text>
          {items.map((it, i) => (
            <Row key={i} style={itemRow}>
              <Column>
                <Text style={itemName}>{it.name ?? 'Item'}</Text>
                <Text style={itemMeta}>
                  {pkr(it.price)} x {it.qty ?? 1}
                </Text>
              </Column>
              <Column align="right">
                <Text style={itemTotal}>{pkr(it.lineTotal)}</Text>
              </Column>
            </Row>
          ))}
          <Hr style={hr} />
          <Row>
            <Column><Text style={totalLabel}>Subtotal</Text></Column>
            <Column align="right"><Text style={totalValue}>{pkr(subtotal)}</Text></Column>
          </Row>
          <Row>
            <Column><Text style={totalLabel}>Shipping</Text></Column>
            <Column align="right">
              <Text style={totalValue}>{shipping === 0 ? 'FREE' : pkr(shipping)}</Text>
            </Column>
          </Row>
          <Hr style={hr} />
          <Row>
            <Column><Text style={grandLabel}>Total</Text></Column>
            <Column align="right"><Text style={grandValue}>{pkr(total)}</Text></Column>
          </Row>
          <Text style={payment}>Payment method: {paymentMethod}</Text>
        </Section>

        <Section style={card}>
          <Text style={sectionTitle}>Customer details</Text>
          <Text style={field}><strong>Name:</strong> {fullName}</Text>
          <Text style={field}><strong>Phone:</strong> {phone}</Text>
          <Text style={field}><strong>Email:</strong> {email || 'Not provided'}</Text>
        </Section>

        <Section style={card}>
          <Text style={sectionTitle}>Shipping address</Text>
          <Text style={field}>{address}</Text>
          <Text style={field}>
            {city}, {province}
            {postalCode ? ` ${postalCode}` : ''}
          </Text>
          {notes ? <Text style={field}><strong>Notes:</strong> {notes}</Text> : null}
        </Section>

        <Text style={footer}>Sent automatically by funtaleem.pk</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New order ${data?.orderId ?? ''} - ${pkr(data?.total)} (${data?.city ?? 'Pakistan'})`,
  displayName: 'Order notification (admin)',
  previewData: {
    orderId: 'FT-A1B2C',
    placedAt: '5 Aug 2026, 10:15 PM',
    fullName: 'Ayesha Khan',
    phone: '0300 1234567',
    email: 'ayesha@example.com',
    address: 'House 12, Street 4, DHA Phase 5',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500',
    notes: 'Please call before delivery',
    items: [
      { name: 'Kids Finger Painting Kit', qty: 1, price: 2220, lineTotal: 2220 },
      { name: 'Magical Tracing Book', qty: 2, price: 1450, lineTotal: 2900 },
    ],
    subtotal: 5120,
    shipping: 0,
    total: 5120,
    paymentMethod: 'Cash on Delivery',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Nunito, Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto', padding: '24px' }
const header = { paddingBottom: '8px' }
const brand = { margin: '0', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#e0537a', fontWeight: 700 }
const h1 = { margin: '8px 0 4px', fontSize: '24px', color: '#1f2430' }
const muted = { margin: '0', fontSize: '14px', color: '#6b7280' }
const card = { backgroundColor: '#faf7f2', padding: '18px 20px', margin: '16px 0' }
const sectionTitle = { margin: '0 0 12px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#8b6f47' }
const itemRow = { marginBottom: '8px' }
const itemName = { margin: '0', fontSize: '15px', fontWeight: 600, color: '#1f2430' }
const itemMeta = { margin: '2px 0 0', fontSize: '13px', color: '#6b7280' }
const itemTotal = { margin: '0', fontSize: '15px', fontWeight: 700, color: '#1f2430' }
const hr = { borderColor: '#e6ddd0', margin: '12px 0' }
const totalLabel = { margin: '2px 0', fontSize: '14px', color: '#6b7280' }
const totalValue = { margin: '2px 0', fontSize: '14px', color: '#1f2430' }
const grandLabel = { margin: '2px 0', fontSize: '16px', fontWeight: 700, color: '#1f2430' }
const grandValue = { margin: '2px 0', fontSize: '18px', fontWeight: 800, color: '#e0537a' }
const payment = { margin: '12px 0 0', fontSize: '13px', color: '#6b7280' }
const field = { margin: '4px 0', fontSize: '15px', color: '#1f2430' }
const footer = { margin: '20px 0 0', fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const }
