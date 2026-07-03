import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { 
      title: 'Muvatase Engineering Limited | Electrical Engineering Zambia',
      description: 'Muvatase Engineering Limited delivers precision electrical engineering across Zambia. Substation construction, line works, and solar plant development since 2009.',
      keywords: 'electrical engineering Zambia, substation construction, 33kV, solar plant development, Lusaka'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../views/Portfolio.vue'),
    meta: { 
      title: 'Our Work Portfolio | Muvatase Engineering Limited',
      description: 'Explore our portfolio of high-voltage electrical projects across Zambia, including substation construction and distribution networks.',
      keywords: 'electrical portfolio, project gallery, substation projects, engineering work Zambia'
    }
  },
  {
    path: '/capabilities',
    name: 'Capabilities',
    component: () => import('../views/Capabilities.vue'),
    meta: { 
      title: 'Services & Capabilities | Muvatase Engineering Limited',
      description: 'Specialized electrical engineering services including HV design, substation construction, solar plant development, and maintenance.',
      keywords: 'electrical services, HV design, solar energy Zambia, switchgear maintenance'
    }
  },
  {
    path: '/certifications',
    name: 'About & Certifications | Muvatase Engineering Limited',
    component: () => import('../views/Certifications.vue'),
    meta: { 
      title: 'About Us & Certifications | Muvatase Engineering Limited',
      description: 'Learn about Muvatase Engineering Limited, our history, standards, and commitment to excellence in Zambian engineering.',
      keywords: 'engineering certifications, about Muvatase, Zambian engineering standards'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { 
      title: 'Contact Us | Muvatase Engineering Limited',
      description: 'Get in touch with Muvatase Engineering Limited for your high-voltage electrical engineering needs in Zambia.',
      keywords: 'contact engineering firm, Lusaka electrical engineers, project inquiry'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

// Dynamic SEO updates
router.afterEach((to) => {
  // Update Title
  document.title = to.meta.title || 'Muvatase Engineering Limited'

  // Update Meta Description
  const description = to.meta.description || 'Muvatase Engineering Limited delivers precision electrical engineering across Zambia.'
  let metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description)
  }

  // Update Keywords
  const keywords = to.meta.keywords || 'electrical engineering, Zambia, substation'
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords)
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', document.title)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', description)

  // Update Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', window.location.origin + to.path)
})

export default router
