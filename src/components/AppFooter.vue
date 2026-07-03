<template>
  <footer class="site-footer section reveal">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="logo">
          <img :src="logoUrl" alt="Muvatase Engineering" class="footer-logo" />
        </div>
        <p class="footer-bio">{{ company?.footer_bio || 'Delivering precision electrical engineering solutions across Zambia since 2009. Excellence in every connection.' }}</p>
        <div class="footer-social" v-if="hasSocialLinks">
          <a v-if="company?.facebook_url" :href="company.facebook_url" target="_blank" rel="noopener" aria-label="Facebook"><Facebook :size="18" /></a>
          <a v-if="company?.twitter_url" :href="company.twitter_url" target="_blank" rel="noopener" aria-label="Twitter"><Twitter :size="18" /></a>
          <a v-if="company?.instagram_url" :href="company.instagram_url" target="_blank" rel="noopener" aria-label="Instagram"><Instagram :size="18" /></a>
          <a v-if="company?.linkedin_url" :href="company.linkedin_url" target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin :size="18" /></a>
          <a v-if="company?.whatsapp_url" :href="company.whatsapp_url" target="_blank" rel="noopener" aria-label="WhatsApp"><MessageCircle :size="18" /></a>
        </div>
      </div>

      <div class="footer-links-group">
        <h4>Explore</h4>
        <nav class="footer-nav">
          <router-link v-for="link in footerLinks" :key="link.id || link.url" :to="link.url">{{ link.title }}</router-link>
        </nav>
      </div>

      <div class="footer-contact">
        <h4>Connect</h4>
        <div class="contact-details">
          <template v-if="company?.address">
            <p v-for="line in company.address.split('\n')" :key="line">{{ line }}</p>
          </template>
          <template v-else>
            <p>Sarutul Investment Building</p>
            <p>Second Floor, Room 2</p>
            <p>Alick Nkhata Road, LUSAKA</p>
          </template>
          <a v-if="company?.phone1" :href="`tel:${company.phone1.replace(/\s/g,'')}`" class="footer-link">{{ company.phone1 }}</a>
          <a v-else href="tel:+260977848046" class="footer-link">+260 977 848 046</a>
          <a v-if="company?.phone2" :href="`tel:${company.phone2.replace(/\s/g,'')}`" class="footer-link">{{ company.phone2 }}</a>
          <a v-else-if="!company?.phone1" href="tel:+260962848046" class="footer-link">+260 962 848 046</a>
          <a :href="`mailto:${company?.email || 'muvatase@gmail.com'}`" class="footer-link">{{ company?.email || 'muvatase@gmail.com' }}</a>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <div class="bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} {{ company?.name || 'Muvatase Engineering Limited' }}. All rights reserved.</p>
        <div class="bottom-links">
          <template v-for="(tag, i) in footerTaglines" :key="tag.id || tag.title">
            <span>{{ tag.title }}</span>
            <span v-if="i < footerTaglines.length - 1" class="dot"></span>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-vue-next'
import { useReveal } from '../composables/useReveal'
import { useCompany, useListItems, storageUrl } from '../composables/useContent'

useReveal()
const { company } = useCompany()

const logoUrl = computed(() => storageUrl(company.value?.logo_path) || '/logo.png')
const hasSocialLinks = computed(() => !!(company.value?.facebook_url || company.value?.twitter_url ||
  company.value?.instagram_url || company.value?.linkedin_url || company.value?.whatsapp_url))

const { items: footerLinks } = useListItems('footer_links', [
  { url: '/', title: 'Home' },
  { url: '/portfolio', title: 'Gallery' },
  { url: '/capabilities', title: 'Services' },
  { url: '/certifications', title: 'About' },
])

const { items: footerTaglines } = useListItems('footer_taglines', [
  { title: 'Professional Excellence' },
  { title: 'Zambian Engineering' },
])
</script>

<style scoped>
.site-footer {
  background: white;
  border-top-left-radius: var(--radius-xl);
  border-top-right-radius: var(--radius-xl);
  margin-top: 64px;
  padding-bottom: 32px;
  box-shadow: 0 -10px 40px rgba(15, 23, 42, 0.05);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 64px;
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.footer-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.footer-bio {
  color: var(--color-brand-500);
  line-height: 1.7;
  max-width: 360px;
}

.footer-social {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-brand-50);
  color: var(--color-brand-600);
  transition: var(--transition-smooth);
}

.footer-social a:hover {
  background: var(--color-accent);
  color: white;
}

h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-brand-900);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
}

.footer-nav,
.contact-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav a,
.footer-link {
  color: var(--color-brand-600);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.footer-nav a:hover,
.footer-link:hover {
  color: var(--color-accent);
  padding-left: 4px;
}

.contact-details p {
  color: var(--color-brand-600);
  font-size: 15px;
}

.footer-bottom {
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
}

.bottom-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

@media (min-width: 768px) {
  .bottom-inner {
    flex-direction: row;
    justify-content: space-between;
  }
}

.bottom-inner p {
  font-size: 14px;
  color: var(--color-brand-500);
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-brand-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dot {
  width: 4px;
  height: 4px;
  background: var(--color-brand-300);
  border-radius: 50%;
}
</style>
