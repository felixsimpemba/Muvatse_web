<template>
  <div class="about-page">

    <!-- ======= HERO ======= -->
    <section class="about-hero" :style="{ backgroundImage: `url(${content.hero.image_url || getImageUrl(PROJECT_IMAGES.SITE_WORK_1)})` }">
      <div class="hero-overlay"></div>
      <div class="container about-hero-inner">
        <div class="hero-pill reveal">{{ content.hero.label }}</div>
        <h1 class="about-hero-title reveal delay-1">{{ content.hero.title }}</h1>
        <p class="about-hero-lead reveal delay-2">{{ content.hero.subtitle }}</p>
      </div>
    </section>

    <!-- ======= COMPANY OVERVIEW ======= -->
    <section class="section bg-gradient-soft">
      <div class="container overview-grid">
        <div class="reveal">
          <SectionHeader :label="content.overview.label" :title="content.overview.title" />
          <p v-if="company?.about" class="body-text">{{ company.about }}</p>
          <template v-else>
            <p class="body-text">
              Muvatase Engineering Limited was first registered on <strong>23 July 2009</strong>
              as Muvatase General Dealers. The company steadily grew through transportation,
              supply, and commercial electrical works before incorporating as a limited company
              in <strong>February 2020</strong>. On <strong>3 December 2024</strong>, the company
              formally rebranded to <em>Muvatase Engineering Limited</em> — a name that reflects
              the full breadth of its technical and engineering capabilities.
            </p>
            <p class="body-text">
              Headquartered in Sarutul Investment Building, Second Floor, Room 2, Alick Nkhata Road, LUSAKA, our team
              operates across Zambia on substations, power line infrastructure, solar installations,
              and large-scale government and industrial contracts.
            </p>
          </template>
          <div class="contact-strip">
            <a v-if="company?.phone1" :href="`tel:${company.phone1.replace(/\s/g,'')}`">{{ company.phone1 }}</a>
            <a v-else href="tel:+260977848046">+260 977 848 046</a>
            <span v-if="company?.phone2 || !company?.phone1" class="sep">·</span>
            <a v-if="company?.phone2" :href="`tel:${company.phone2.replace(/\s/g,'')}`">{{ company.phone2 }}</a>
            <a v-else-if="!company?.phone1" href="tel:+260962848046">+260 962 848 046</a>
            <span class="sep">·</span>
            <a :href="`mailto:${company?.email || 'muvatase@gmail.com'}`">{{ company?.email || 'muvatase@gmail.com' }}</a>
          </div>
        </div>

        <div class="overview-image reveal delay-1">
          <img :src="content.overview.image_url || getImageUrl(PROJECT_IMAGES.TRANSFORMER_CLOSEUP)" alt="Engineering in progress" />
        </div>
      </div>
    </section>

    <!-- ======= MISSION / VISION / VALUES ======= -->
    <section class="section mvv-section">
      <div class="container">
        <SectionHeader label="Mission, Vision & Values" title="Our Guiding Principles" centered />
        <div class="mvv-grid">
          <div class="mvv-card floating-card reveal">
            <div class="mvv-icon" style="background:#E0F2FE; color:#0369A1;">
              <Target :size="24" />
            </div>
            <h3>Mission</h3>
            <p>{{ company?.mission || 'To serve the country diligently and with integrity while running the business in a cost-effective and profitable manner.' }}</p>
          </div>
          <div class="mvv-card floating-card reveal delay-1">
            <div class="mvv-icon" style="background:#E8F5E9; color:#2E7D32;">
              <Eye :size="24" />
            </div>
            <h3>Vision</h3>
            <p>{{ company?.vision || 'To be one of the leading engineering companies in Africa in the provision of high-quality works and services through a well-disciplined, motivated, and highly innovative workforce.' }}</p>
          </div>
          <div class="mvv-card floating-card reveal delay-2">
            <div class="mvv-icon" style="background:#EDE7F6; color:#4527A0;">
              <Star :size="24" />
            </div>
            <h3>Values</h3>
            <ul class="values-list">
              <li v-for="v in values" :key="v">{{ v }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= WHAT WE DO ======= -->
    <section class="section bg-gradient-soft">
      <div class="container">
        <SectionHeader label="Business Areas" title="What We Do"
          subtitle="We operate across a diverse range of engineering and commercial activities." />
        <div class="services-grid-modern">
          <div v-for="(svc, i) in businessAreas" :key="svc.title" class="svc-item-modern reveal"
            :class="`delay-${i % 3}`">
            <div class="svc-icon-box">
              <component :is="svc.icon" :size="24" />
            </div>
            <div class="svc-content">
              <h4>{{ svc.title }}</h4>
              <p>{{ svc.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ======= WHAT MAKES US DIFFERENT ======= -->
    <section class="section diff-section">
      <div class="container">
        <SectionHeader :label="content.differentiators.label" :title="content.differentiators.title" centered />
        <div class="diff-grid">


          <div class="diff-col diff-us">
            <h4 class="diff-heading us">Muvatase Engineering</h4>
            <ul>
              <li v-for="item in usItems" :key="item.id || item.title">
                <span class="d-icon pos">✓</span> {{ item.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= LEADERSHIP TEAM ======= -->
    <section class="section bg-gradient-soft">
      <div class="container">
        <SectionHeader label="Our Leadership" title="Meet the Muvatase Team"
          subtitle="A young, disciplined, and highly innovative workforce driving Zambia's electrical future."
          centered />
        <div class="team-grid">
          <div v-for="(member, i) in team" :key="member.id || member.name" class="team-card floating-card reveal"
            :class="`delay-${i % 4}`">
            <div class="team-avatar-wrap">
              <img v-if="member.photo_url" :src="member.photo_url" :alt="member.name" class="team-photo" />
              <div v-else class="team-avatar-fallback">{{ member.initials }}</div>
            </div>
            <strong>{{ member.name }}</strong>
            <span>{{ member.role }}</span>
          </div>
        </div>
      </div>
    </section>




  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Eye, Target, Star,
  ShoppingCart, Settings2, TowerControl, UtilityPole, DraftingCompass,
  Cable, Wrench, Sun, Briefcase, Building2, Truck, Zap, Power, Bolt
} from 'lucide-vue-next'
import SectionHeader from '../components/SectionHeader.vue'
import { PROJECT_IMAGES, getImageUrl } from '../constants/images'
import { useReveal } from '../composables/useReveal'
import { useCompany, useTeam, useServices, usePageContent, useListItems } from '../composables/useContent'

useReveal()

const iconMap = {
  ShoppingCart, Settings2, TowerControl, UtilityPole, DraftingCompass,
  Cable, Wrench, Sun, Briefcase, Building2, Truck, Zap, Power, Bolt
}

const { company }        = useCompany()
const { team }           = useTeam()
const { services }       = useServices()

const values = computed(() => {
  if (company.value?.values) {
    return company.value.values.split(/[,\n]/).map(v => v.trim()).filter(Boolean)
  }
  return ['Honesty', 'Integrity', 'Innovation', 'Love', 'Environmentalism', 'Openness to New Technology']
})

const businessAreas = computed(() =>
  services.value.map(s => ({
    title: s.title,
    icon:  iconMap[s.icon_name] || Wrench,
    desc:  s.description,
  }))
)

const { content } = usePageContent('certifications', {
  hero:            { label: 'About Muvatase Engineering', title: 'Built on Integrity. Driven by Excellence.',
                     subtitle: 'Since 2009, Muvatase Engineering Limited has been delivering high-quality electrical infrastructure across Zambia — with professionalism, safety, and a commitment to schedules.' },
  overview:        { label: 'Who We Are', title: 'A Trusted Engineering Partner Since 2009' },
  differentiators: { label: 'Our Advantage', title: 'What Makes Muvatase Engineering Different' },
})

const { items: usItems } = useListItems('certifications_differentiators', [
  { title: 'Professionalism at every stage' },
  { title: 'Young and dynamic workforce' },
  { title: 'Consistent ability to meet targets' },
  { title: 'Proven schedule compliance record' },
])
</script>

<style scoped>
/* ---------- Hero ---------- */
.about-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center 30%;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 15, 30, 0.88) 0%, rgba(10, 15, 30, 0.50) 100%);
  z-index: 1;
}

.about-hero-inner {
  position: relative;
  z-index: 2;
  padding-top: calc(var(--nav-height) + 40px);
  padding-bottom: 60px;
  max-width: 680px;
}

.hero-pill {
  display: inline-block;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.04em;
  margin-bottom: 24px;
}

.about-hero-title {
  font-family: var(--font-primary);
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 900;
  color: white;
  line-height: 1.15;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.hero-accent {
  color: var(--color-accent);
}

.about-hero-lead {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
  max-width: 560px;
}

/* ---------- Overview ---------- */
.overview-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  align-items: center;
}

@media (min-width: 1024px) {
  .overview-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}

.body-text {
  color: var(--color-brand-600);
  font-size: 1rem;
  line-height: 1.85;
  margin-bottom: 20px;
}

.body-text strong {
  color: var(--color-brand-900);
}

.contact-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.contact-strip a {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
}

.contact-strip a:hover {
  text-decoration: underline;
}

.sep {
  color: var(--color-brand-300);
}

.overview-image {
  border-radius: var(--radius-xl);
  overflow: hidden;
  height: 380px;
  box-shadow: var(--shadow-xl);
}

.overview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------- MVV ---------- */
.mvv-section {
  background: white;
}

.mvv-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 40px;
}

@media (min-width: 768px) {
  .mvv-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.mvv-card {
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mvv-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mvv-card h3 {
  font-size: 20px;
  color: var(--color-brand-900);
}

.mvv-card p {
  color: var(--color-brand-600);
  font-size: 15px;
  line-height: 1.7;
}

.values-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
}

.values-list li {
  font-size: 14px;
  color: var(--color-brand-700);
  font-weight: 600;
  padding-left: 18px;
  position: relative;
}

.values-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* ---------- Business Areas Modern Grid ---------- */
.services-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.svc-item-modern {
  background: white;
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-smooth);
  display: flex;
  gap: 20px;
}

.svc-item-modern:hover {
  border-color: var(--color-accent);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.svc-icon-box {
  width: 48px;
  height: 48px;
  background: var(--color-accent-soft);
  color: var(--color-brand-900);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition-smooth);
}

.svc-item-modern:hover .svc-icon-box {
  background: var(--color-accent);
  color: white;
}

.svc-content h4 {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--color-brand-900);
}

.svc-content p {
  font-size: 13px;
  color: var(--color-brand-600);
  line-height: 1.5;
}



/* ---------- Standards ---------- */
.standards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 40px;
}

@media (min-width: 768px) {
  .standards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .standards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.std-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.std-code {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.std-card h4 {
  font-size: 16px;
  color: var(--color-brand-900);
  margin-bottom: 4px;
}

.std-card p {
  font-size: 13px;
  color: var(--color-brand-500);
  line-height: 1.55;
}

/* ---------- Differentiator ---------- */
.diff-section {
  background: var(--color-brand-900);
}

.diff-section :deep(.soft-label) {
  background: rgba(144, 213, 255, 0.2);
  color: var(--color-accent);
}

.diff-section :deep(.section-title) {
  color: white;
}

.diff-grid {

  align-items: center;
  margin-top: 48px;
}

@media (max-width: 767px) {
  .diff-grid {
    grid-template-columns: 1fr;
  }

  .diff-vs {
    text-align: center;
  }
}

.diff-col {
  padding: 32px;
  border-radius: var(--radius-lg);
}

.diff-them {
  background: rgba(255, 255, 255, 0.05);
}

.diff-us {
  background: rgba(144, 213, 255, 0.1);
}

.diff-heading {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.35);
}

.diff-heading.us {
  color: var(--color-accent);
}

.diff-col ul {
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
}

.diff-col li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
}

.d-icon {
  font-weight: 900;
  flex-shrink: 0;
}

.neg {
  color: rgba(255, 255, 255, 0.25);
}

.pos {
  color: #4CAF50;
}

.diff-vs {
  font-family: var(--font-primary);
  font-size: 24px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.15);
  padding: 0 8px;
}

/* ---------- Team ---------- */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (min-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 36px 20px;
}

.team-avatar-wrap {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-brand-100);
  box-shadow: 0 4px 16px rgba(144, 213, 255, 0.2);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-avatar-fallback {
  width: 100%;
  height: 100%;
  background: var(--color-accent-gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-size: 28px;
  font-weight: 900;
}

.team-card strong {
  font-size: 16px;
  color: var(--color-brand-900);
}

.team-card span {
  font-size: 13px;
  color: var(--color-brand-500);
}

/* ---------- Testimonial ---------- */
.testi-card {
  padding: 48px;
  position: relative;
}

.quote-mark {
  font-size: 120px;
  line-height: 0.7;
  font-family: Georgia, serif;
  color: var(--color-brand-100);
  position: absolute;
  top: 32px;
  left: 40px;
  pointer-events: none;
}

blockquote {
  font-size: 1.1rem;
  line-height: 1.85;
  color: var(--color-brand-700);
  font-style: italic;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

blockquote strong {
  color: var(--color-brand-900);
  font-style: normal;
}

.testi-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.testi-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--color-accent-gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 16px;
  flex-shrink: 0;
}

.testi-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testi-info strong {
  font-size: 16px;
  color: var(--color-brand-900);
}

.testi-info span {
  font-size: 13px;
  color: var(--color-brand-500);
}

.testi-phone {
  font-size: 13px;
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
}

.testi-phone:hover {
  text-decoration: underline;
}

/* ---------- CTA ---------- */
.cta-bar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  padding: 40px 48px;
}

@media (min-width: 768px) {
  .cta-bar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cta-bar h3 {
  font-size: 22px;
  margin-bottom: 8px;
}

.cta-bar p {
  color: var(--color-brand-500);
  font-size: 15px;
}
</style>
