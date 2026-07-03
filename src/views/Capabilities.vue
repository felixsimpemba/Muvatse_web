<template>
  <div class="capabilities-page bg-gradient-soft">
    <!-- HERO -->
    <section class="section capabilities-hero">
      <div class="container">
        <SectionHeader :label="content.hero.label" :title="content.hero.title"
          :subtitle="content.hero.subtitle"
          centered />
      </div>
    </section>

    <!-- SERVICES GRID -->
    <section class="section">
      <div class="container">
        <div class="services-modern-grid">
          <div v-for="(svc, i) in capabilities" :key="svc.title" class="service-minimal-card reveal"
            :class="`delay-${i % 4}`">
            <div class="svc-icon-wrapper">
              <component :is="svc.icon" :size="32" />
            </div>
            <div class="svc-content">
              <h3>{{ svc.title }}</h3>
              <p>{{ svc.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INDUSTRIES -->
    <section class="section industries-section">
      <div class="container">
        <SectionHeader :label="content.industries.label" :title="content.industries.title" centered />
        <div class="industries-flex">
          <div v-for="ind in industries" :key="ind.id || ind.title" class="industry-chip reveal">
            {{ ind.title }}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section container">
      <div class="cta-banner reveal">
        <div class="cta-text">
          <h2>{{ content.cta.title }}</h2>
          <p>{{ content.cta.body }}</p>
        </div>
        <router-link :to="content.cta.link_url || '/contact'" class="btn btn-secondary">{{ content.cta.link_label }}</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  ShoppingCart, Settings2, TowerControl, UtilityPole, DraftingCompass,
  Cable, Wrench, Sun, Briefcase, Building2, Truck, Zap, Power, Bolt
} from 'lucide-vue-next'
import SectionHeader from '../components/SectionHeader.vue'
import { useReveal } from '../composables/useReveal'
import { useServices, usePageContent, useListItems } from '../composables/useContent'

useReveal()

const iconMap = {
  ShoppingCart, Settings2, TowerControl, UtilityPole, DraftingCompass,
  Cable, Wrench, Sun, Briefcase, Building2, Truck, Zap, Power, Bolt
}

const { services } = useServices()

const capabilities = computed(() =>
  services.value.map(s => ({
    title: s.title,
    icon:  iconMap[s.icon_name] || Wrench,
    desc:  s.description,
  }))
)

const { content } = usePageContent('capabilities', {
  hero:       { label: 'Our Expertise', title: 'Engineered for Precision',
                subtitle: 'Delivering complex electrical infrastructure with a focus on safety, reliability, and modern standards.' },
  industries: { label: 'Sectors', title: 'Industries We Serve' },
  cta:        { title: 'Looking for a technical partner?',
                body: 'Our engineering team is ready to discuss your specific requirements.',
                link_label: 'Get in Touch', link_url: '/contact' },
})

const { items: industries } = useListItems('capabilities_industries', [
  { title: 'Mining & Extractions' },
  { title: 'Commercial Infrastructure' },
  { title: 'Industrial Manufacturing' },
  { title: 'Renewable Energy Parks' },
  { title: 'Public Utilities' },
  { title: 'Agricultural Facilities' },
])
</script>

<style scoped>
.capabilities-hero {
  padding-bottom: 0;
}

.services-modern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.service-minimal-card {
  background: white;
  padding: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.service-minimal-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.svc-icon-wrapper {
  width: 64px;
  height: 64px;
  background: var(--color-accent-soft);
  color: var(--color-brand-900);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.service-minimal-card:hover .svc-icon-wrapper {
  background: var(--color-accent);
  color: white;
}

.svc-content h3 {
  font-size: 20px;
  margin-bottom: 12px;
  line-height: 1.3;
  color: var(--color-brand-900);
}

.svc-content p {
  font-size: 14px;
  color: var(--color-brand-600);
  line-height: 1.6;
}

.industries-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.industry-chip {
  padding: 12px 24px;
  background: white;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
  color: var(--color-brand-700);
  border: 1px solid var(--border-color);
}

.cta-banner {
  background: var(--color-brand-900);
  padding: 64px;
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  text-align: center;
  color: white;
  margin-bottom: var(--space-24);
}

@media (min-width: 768px) {
  .cta-banner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.cta-text h2 {
  font-size: 32px;
  margin-bottom: 8px;
}

.cta-text p {
  color: var(--color-brand-400);
}
</style>
