<template>
  <div class="contact-page bg-gradient-soft">
    <!-- Header -->
    <section class="section">
      <div class="container">
        <SectionHeader :label="content.hero.label" :title="content.hero.title"
          :subtitle="content.hero.subtitle" />
      </div>
    </section>

    <!-- CONTACT INFO & MAP -->
    <section class="section container">
      <div class="contact-full-grid">
        <!-- Info Column -->
        <div class="contact-cards reveal">
          <div class="info-card-premium">
            <div class="icon-circle">
              <MapPin :size="24" />
            </div>
            <div class="info-details">
              <h4>Head Office</h4>
              <template v-if="company?.address">
                <p v-for="line in company.address.split('\n')" :key="line">{{ line }}</p>
              </template>
              <template v-else>
                <p>Sarutul Investment Building</p>
                <p>Second Floor, Room 2</p>
                <p>Alick Nkhata Road, LUSAKA</p>
              </template>
            </div>
          </div>

          <div class="info-card-premium">
            <div class="icon-circle">
              <Phone :size="24" />
            </div>
            <div class="info-details">
              <h4>Call Us</h4>
              <a v-if="company?.phone1" :href="`tel:${company.phone1.replace(/\s/g,'')}`">{{ company.phone1 }}</a>
              <a v-else href="tel:+260977848046">+260 977 848 046</a>
              <a v-if="company?.phone2" :href="`tel:${company.phone2.replace(/\s/g,'')}`">{{ company.phone2 }}</a>
              <a v-else-if="!company?.phone2 && !company?.phone1" href="tel:+260962848046">+260 962 848 046</a>
            </div>
          </div>

          <div class="info-card-premium">
            <div class="icon-circle">
              <Mail :size="24" />
            </div>
            <div class="info-details">
              <h4>Email Us</h4>
              <a :href="`mailto:${company?.email || 'muvatase@gmail.com'}`">
                {{ company?.email || 'muvatase@gmail.com' }}
              </a>
            </div>
          </div>
        </div>

        <!-- Map Column -->
        <div class="map-container reveal delay-1">
          <iframe
            :src="company?.map_embed_url || 'https://maps.google.com/maps?q=-15.407304917394724,28.332225212063076&t=&z=15&ie=UTF8&iwloc=&output=embed'"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { MapPin, Phone, Mail } from 'lucide-vue-next'
import SectionHeader from '../components/SectionHeader.vue'
import { useReveal } from '../composables/useReveal'
import { useCompany, usePageContent } from '../composables/useContent'

useReveal()
const { company } = useCompany()

const { content } = usePageContent('contact', {
  hero: { label: 'Get in Touch', title: 'Connect with Our Team',
          subtitle: 'Visit our head office in Lusaka or reach out via phone and email.' },
})
</script>

<style scoped>
.contact-full-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: flex-start;
}

@media (min-width: 1024px) {
  .contact-full-grid {
    grid-template-columns: 400px 1fr;
  }
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card-premium {
  background: white;
  padding: 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  gap: 20px;
  transition: var(--transition-smooth);
  border: 1px solid var(--border-color);
}

.info-card-premium:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
}

.icon-circle {
  width: 56px;
  height: 56px;
  background: var(--color-accent-soft);
  color: var(--color-brand-900);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-details h4 {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 8px;
}

.info-details p,
.info-details a {
  display: block;
  font-size: 16px;
  color: var(--color-brand-800);
  font-weight: 600;
  text-decoration: none;
  line-height: 1.5;
}

.info-details a:hover {
  color: var(--color-accent);
}

.map-container {
  height: 500px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .map-container {
    height: 350px;
  }
}
</style>
