import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    {
      slug: 'blogs',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea', required: true },
        { name: 'content', type: 'textarea', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'image', type: 'text', required: true },
      ],
    },
    {
      slug: 'contacts',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'text', required: true },
        { name: 'message', type: 'textarea', required: true },
      ],
    },
    {
      slug: 'bookings',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'service', type: 'select', options: [
          { label: 'Consultation', value: 'consult' },
          { label: 'Full Development', value: 'development' },
          { label: 'Architecture Audit', value: 'audit' },
          { label: 'Elite Branding', value: 'branding' },
        ], required: true },
        { name: 'brief', type: 'textarea', required: true },
      ],
    },
    {
      slug: 'analytics',
      admin: {
        useAsTitle: 'topService',
      },
      fields: [
        { name: 'views', type: 'number', required: true, defaultValue: 0 },
        { name: 'leads', type: 'number', required: true, defaultValue: 0 },
        { name: 'engagementRate', type: 'text', required: true, defaultValue: '0%' },
        { name: 'topService', type: 'text', required: true, defaultValue: '' },
      ],
    },
    {
      slug: 'projects',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'image', type: 'text', required: true },
        { name: 'tag', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
        { name: 'fullDesc', type: 'textarea', required: true },
        { name: 'tech', type: 'array', fields: [{ name: 'item', type: 'text' }] },
        { name: 'link', type: 'text' },
      ],
    },
    {
      slug: 'services',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
        { name: 'tech', type: 'text', required: true },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
})
