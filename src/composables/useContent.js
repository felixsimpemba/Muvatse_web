import { ref, onMounted } from 'vue'
import axios from 'axios'

const API     = import.meta.env.VITE_API_URL || 'http://localhost:8001/api'
const STORAGE = API.replace(/\/api$/, '/storage')

async function get(path, fallback) {
  try {
    const res = await axios.get(API + path)
    return res.data
  } catch {
    return fallback
  }
}

export async function submitContact(payload) {
  const res = await axios.post(API + '/contact', payload)
  return res.data
}

export function storageUrl(path) {
  if (!path) return null
  return path.startsWith('http') ? path : `${STORAGE}/${path}`
}

export function useCompany() {
  const company = ref(null)
  onMounted(async () => { company.value = await get('/company', null) })
  return { company }
}

export function useHero() {
  const hero = ref(null)
  onMounted(async () => {
    const data = await get('/hero', null)
    if (data) {
      hero.value = {
        ...data,
        image_url: data.image_path
          ? (data.image_path.startsWith('http') ? data.image_path : `${STORAGE}/${data.image_path}`)
          : null,
      }
    }
  })
  return { hero }
}

export function useStats() {
  const stats = ref([])
  onMounted(async () => { stats.value = await get('/stats', []) })
  return { stats }
}

export function useTimeline() {
  const timeline = ref([])
  onMounted(async () => { timeline.value = await get('/timeline', []) })
  return { timeline }
}

export function useServices() {
  const services = ref([])
  onMounted(async () => { services.value = await get('/services', []) })
  return { services }
}

export function usePortfolio() {
  const portfolio = ref([])
  onMounted(async () => {
    const items = await get('/portfolio', [])
    portfolio.value = items.map(p => ({
      ...p,
      image_url: p.image_path
        ? (p.image_path.startsWith('http') ? p.image_path : `${STORAGE}/${p.image_path}`)
        : null
    }))
  })
  return { portfolio }
}

export function useTeam() {
  const team = ref([])
  onMounted(async () => {
    const members = await get('/team', [])
    team.value = members.map(m => ({
      ...m,
      photo_url: m.photo_path
        ? (m.photo_path.startsWith('http') ? m.photo_path : `${STORAGE}/${m.photo_path}`)
        : null
    }))
  })
  return { team }
}

export function useTestimonials() {
  const testimonials = ref([])
  onMounted(async () => { testimonials.value = await get('/testimonials', []) })
  return { testimonials }
}

const PAGE_CONTENT_FIELDS = ['label', 'title', 'subtitle', 'body', 'link_label', 'link_url']

// Fetches editable text blocks for a page, keyed by section_key, merged
// field-by-field over the given fallback so partially-filled CMS content
// doesn't blank out fields an admin hasn't set yet.
export function usePageContent(pageSlug, fallback = {}) {
  const content = ref(fallback)
  onMounted(async () => {
    const data = await get(`/page-content?page=${pageSlug}`, null)
    if (!data) return

    const merged = {}
    for (const key of Object.keys(fallback)) merged[key] = { ...fallback[key] }
    for (const key of Object.keys(data)) {
      const section = data[key]
      const target = merged[key] || (merged[key] = {})
      for (const field of PAGE_CONTENT_FIELDS) {
        if (section[field] != null && section[field] !== '') target[field] = section[field]
      }
      target.image_url = section.image_path
        ? (section.image_path.startsWith('http') ? section.image_path : `${STORAGE}/${section.image_path}`)
        : (target.image_url || null)
    }
    content.value = merged
  })
  return { content }
}

// Fetches an editable, sort-ordered list (e.g. nav links, industries, feature bullets)
// for the given group_key, falling back to the given static array if the API has none.
export function useListItems(groupKey, fallback = []) {
  const items = ref(fallback)
  onMounted(async () => {
    const data = await get(`/list-items?group=${groupKey}`, null)
    if (data && data.length) items.value = data
  })
  return { items }
}
