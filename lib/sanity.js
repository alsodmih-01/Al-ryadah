import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'jjyae3vo', // رقم مشروعك الذي ظهر في لوحة التحكم
  dataset: 'production', // قاعدة البيانات الأساسية
  apiVersion: '2024-03-01',
  useCdn: true,
})