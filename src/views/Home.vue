<template>
  <div class="home-page bg-gradient-soft">

    <!-- ======= HERO: IMMERSIVE BACKGROUND ======= -->
    <section class="hero-immersive">
      <div class="hero-bg-container">
        <img
          :src="hero?.image_url || getImageUrl(PROJECT_IMAGES.HERO_IMAGE)"
          alt="Substation Infrastructure"
          class="hero-bg-img"
        />
        <div class="hero-overlay-gradient"></div>
      </div>

      <div class="container hero-immersive-content">
        <div class="hero-text-box">
          <h1 class="hero-title reveal delay-1" v-html="heroTitle"></h1>
          <p class="hero-lead reveal delay-2">{{ heroLead }}</p>
          <div class="hero-actions reveal delay-3">
            <router-link :to="hero?.cta_primary_link || '/contact'" class="btn btn-primary btn-lg">
              {{ hero?.cta_primary_label || 'Start a Project' }}
              <ArrowRight :size="18" />
            </router-link>
            <router-link :to="hero?.cta_secondary_link || '/portfolio'" class="btn btn-white-outline btn-lg">
              {{ hero?.cta_secondary_label || 'Explore Our Work' }}
              <ArrowRight :size="18" />
            </router-link>
          </div>

          <div class="hero-stats-row reveal delay-4">
            <div class="stat-pill" v-for="stat in heroStats" :key="stat.label">
              <span class="stat-val">{{ stat.value }}</span>
              <span class="stat-lab">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ======= CORE STORY ======= -->
    <section class="section">
      <div class="container">
        <div class="story-grid">
          <div class="story-text reveal">
            <SectionHeader :label="content.mission.label" :title="content.mission.title" />
            <p class="lead-text">{{ content.mission.body }}</p>
            <div class="story-features">
              <div class="sf-item" v-for="f in missionFeatures" :key="f.title">
                <div class="sf-icon">
                  <component :is="f.icon" />
                </div>
                <div>
                  <h4>{{ f.title }}</h4>
                  <p>{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="story-visual reveal delay-1">
            <div class="timeline-compact">
              <div v-for="(evt, i) in timeline.slice(-4)" :key="evt.date" class="t-compact-item">
                <div class="t-c-date">{{ evt.date }}</div>
                <div class="t-c-body">{{ evt.desc }}</div>
              </div>
              <router-link :to="content.mission.link_url || '/certifications'" class="view-more-link">{{ content.mission.link_label }} →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= BENTO WORK SHOWCASE ======= -->
    <section class="section bg-white">
      <div class="container">
        <SectionHeader :label="content.portfolio.label" :title="content.portfolio.title"
          :subtitle="content.portfolio.subtitle" centered />

        <div v-if="bentoItems.length" class="bento-grid reveal">
          <div
            v-for="(item, i) in bentoItems"
            :key="item.id"
            class="bento-item"
            :class="`bento-item-${i + 1}`"
          >
            <img
              v-if="item.image_url"
              :src="item.image_url"
              :alt="item.title"
              class="bento-img"
            />
            <div class="bento-overlay">
              <span class="bento-tag">{{ item.category }}</span>
              <h3>{{ item.title }}</h3>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <!-- Fallback static bento when no CMS items yet -->
        <div v-else class="bento-grid reveal">
          <div class="bento-item bento-item-1">
            <img :src="getImageUrl(PROJECT_IMAGES.SUBSTATION_GRID1)" alt="Substation" class="bento-img" />
            <div class="bento-overlay">
              <span class="bento-tag">Infrastructure</span>
              <h3>33/11kV Substation Construction</h3>
              <p>Turnkey delivery including earthing, busbars, and commissioning.</p>
            </div>
          </div>
          <div class="bento-item bento-item-2">
            <img :src="getImageUrl(PROJECT_IMAGES.OVERHEAD_LINES)" alt="Lines" class="bento-img" />
            <div class="bento-overlay">
              <span class="bento-tag">Line Works</span>
              <h3>HV Distribution Networks and Transformer Mounting</h3>
              <p>Expanding the grid with 33kV overhead lines.</p>
            </div>
          </div>
          <div class="bento-item bento-item-3">
            <img :src="getImageUrl(PROJECT_IMAGES.CONTROL_PANEL)" alt="Protection" class="bento-img" />
            <div class="bento-overlay">
              <span class="bento-tag">Automation</span>
              <h3>Auto Recloser Systems</h3>
            </div>
          </div>
          <div class="bento-item bento-item-4">
            <img :src="getImageUrl(PROJECT_IMAGES.TRANSFORMER_CLOSEUP)" alt="HV" class="bento-img" />
            <div class="bento-overlay">
              <span class="bento-tag">Maintenance</span>
              <h3>Transformer Assembly And Maintenance</h3>
            </div>
          </div>
        </div>

        <div class="bento-footer reveal delay-2">
          <router-link :to="content.portfolio.link_url || '/portfolio'" class="btn btn-secondary">{{ content.portfolio.link_label }}</router-link>
        </div>
      </div>
    </section>

    <!-- ======= SERVICES: THE MODERN GRID ======= -->
    <section class="section">
      <div class="container">
        <SectionHeader :label="content.services.label" :title="content.services.title"
          :subtitle="content.services.subtitle" />

        <div class="modern-services">
          <div v-for="(svc, i) in filteredServices" :key="svc.title" class="service-card reveal"
            :class="`delay-${i % 4}`">
            <div class="svc-icon-box">
              <component :is="svc.icon" :size="32" />
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
            <ul class="svc-list">
              <li v-for="feat in svc.features" :key="feat">
                <span class="dot"></span> {{ feat }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= IMPACT TESTIMONIAL ======= -->
    <section v-if="featuredTestimonial" class="section dark-section">
      <div class="container">
        <SectionHeader :title="content.testimonials.title" centered dark />
        <div class="testimonial-impact reveal">
          <div class="quote-icon">"</div>
          <p class="quote-text" v-html="featuredTestimonial.quote_text"></p>
          <div class="quote-author">
            <div class="author-info">
              <strong>{{ featuredTestimonial.author_name }}</strong>
              <span>{{ featuredTestimonial.author_role }} — {{ featuredTestimonial.company }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======= FINAL CALL TO ACTION ======= -->
    <section class="section">
      <div class="container">
        <div class="final-cta reveal">
          <div class="cta-inner">
            <h2>{{ content.cta.title }}</h2>
            <p>{{ content.cta.body }}</p>
            <div class="cta-btns">
              <a :href="`mailto:${company?.email || 'muvatase@gmail.com'}`" class="btn btn-outline btn-lg">{{ content.cta.link_label }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Power, UtilityPole, Sun, Bolt, Briefcase, Truck, Wrench, Cable, DraftingCompass, TowerControl, ArrowRight } from 'lucide-vue-next'
import SectionHeader from '../components/SectionHeader.vue'
import { PROJECT_IMAGES, getImageUrl } from '../constants/images'
import { useReveal } from '../composables/useReveal'
import {
  useCompany, useHero, useStats, useTimeline, useServices, usePortfolio, useTestimonials,
  usePageContent, useListItems,
} from '../composables/useContent'

useReveal()

const iconMap = { TowerControl, UtilityPole, Sun, DraftingCompass, Cable, Wrench, Power, Bolt, Truck, Briefcase }

// ── Live data from CMS ────────────────────────────
const { company }                   = useCompany()
const { hero }                      = useHero()
const { stats: heroStats }          = useStats()
const { timeline: timelineRaw }     = useTimeline()
const { services: servicesRaw }     = useServices()
const { portfolio: portfolioRaw }   = usePortfolio()
const { testimonials: testimonialList } = useTestimonials()

const { content } = usePageContent('home', {
  mission:      { label: 'Our Mission', title: 'Reliability Built Into Every Connection',
                  body: "Muvatase Engineering Limited has evolved from a general enterprise into Zambia's elite electrical engineering firm. We don't just build infrastructure; we build the backbone of Zambian industry.",
                  link_label: 'Full Company History', link_url: '/certifications' },
  portfolio:    { label: 'Our Portfolio', title: 'The Muvatase Standard',
                  subtitle: 'A look at our high-voltage execution across industrial and utility sectors.',
                  link_label: 'View Complete Gallery', link_url: '/portfolio' },
  services:     { label: 'Expertise', title: 'Engineering Solutions',
                  subtitle: 'Specialized capabilities across the electrical engineering lifecycle.' },
  testimonials: { title: 'What Our Clients Say' },
  cta:          { title: 'Ready to Power Your Next Project?',
                  body: 'From technical consultancy to full-scale HV construction, we are your partner in engineering excellence.',
                  link_label: 'Email Us' },
})

const { items: missionFeatureItems } = useListItems('home_mission_features', [
  { title: 'Elite Technical Team', icon_name: 'Briefcase', description: 'A young, disciplined, and highly innovative workforce.' },
  { title: 'Rapid Delivery',       icon_name: 'Bolt',      description: 'Proven track record of finishing projects ahead of schedule.' },
])

const heroTitle = computed(() => {
  if (hero.value?.title_line1) {
    const l1 = hero.value.title_line1
    const l2 = hero.value.title_line2 ? `<span class="text-accent">${hero.value.title_line2}</span>` : ''
    const l3 = hero.value.title_line3 || ''
    return [l1, l2, l3].filter(Boolean).join(' <br />')
  }
  return 'Engineering <br /><span class="text-accent">Zambia\'s</span> <br />Power Future'
})

const heroLead = computed(() =>
  hero.value?.lead_text ||
  'Delivering high-voltage electrical infrastructure with precision, safety, and unmatched reliability. From 33kV substations to turnkey solar plants.'
)

const timeline = computed(() =>
  timelineRaw.value.map(e => ({ date: e.date, desc: e.description }))
)

const filteredServices = computed(() =>
  servicesRaw.value.map(s => ({
    title:    s.title,
    icon:     iconMap[s.icon_name] || Wrench,
    desc:     s.description,
    features: s.features || []
  }))
)

const bentoItems = computed(() =>
  portfolioRaw.value.filter(p => p.image_url).slice(0, 4)
)

const featuredTestimonial = computed(() => testimonialList.value[0] || null)

const missionFeatures = computed(() =>
  missionFeatureItems.value.map(f => ({
    title: f.title,
    icon:  iconMap[f.icon_name] || Briefcase,
    desc:  f.description,
  }))
)
</script>

<style scoped>
/* ---------- Immersive Hero Styles ---------- */
.hero-immersive {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: var(--nav-height);
  background: var(--color-brand-900);
  color: white;
}

.hero-bg-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.7);
  animation: slowZoom 20s infinite alternate ease-in-out;
}

@keyframes slowZoom {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

.hero-overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right,
      rgba(15, 23, 42, 0.95) 0%,
      rgba(15, 23, 42, 0.7) 40%,
      rgba(15, 23, 42, 0.3) 100%);
}

.hero-immersive-content {
  position: relative;
  z-index: 2;
}

.hero-text-box {
  max-width: 720px;
}

.hero-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 32px;
}

.hero-title {
  font-size: clamp(3.5rem, 8vw, 6rem);
  line-height: 0.9;
  margin-bottom: 24px;
  letter-spacing: -0.04em;
  font-weight: 800;
}

.text-accent {
  color: var(--color-accent);
}

.hero-lead {
  font-size: 1.25rem;
  color: var(--color-brand-200);
  line-height: 1.6;
  max-width: 580px;
  margin-bottom: 48px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 64px;
}

.btn-white-outline {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-white-outline:hover {
  background: white;
  color: var(--color-brand-900);
  border-color: white;
}

.hero-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-pill {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-val {
  font-size: 28px;
  font-weight: 800;
  color: white;
  font-family: var(--font-primary);
}

.stat-lab {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-brand-400);
  font-weight: 700;
}

@media (max-width: 768px) {
  .hero-immersive {
    min-height: 80vh;
    text-align: center;
    justify-content: center;
  }

  .hero-overlay-gradient {
    background: linear-gradient(to bottom,
        rgba(15, 23, 42, 0.9) 0%,
        rgba(15, 23, 42, 0.6) 100%);
  }

  .hero-text-box {
    margin: 0 auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats-row {
    justify-content: center;
    gap: 24px;
  }
}

/* ---------- Story Section ---------- */
.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  align-items: center;
}

@media (min-width: 1024px) {
  .story-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.lead-text {
  font-size: 1.15rem;
  color: var(--color-brand-600);
  margin-bottom: 48px;
  line-height: 1.8;
}

.story-features {
  display: grid;
  gap: 32px;
}

.sf-item {
  display: flex;
  gap: 24px;
}

.sf-icon {
  width: 56px;
  height: 56px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sf-item h4 {
  font-size: 18px;
  margin-bottom: 8px;
}

.sf-item p {
  font-size: 14px;
  color: var(--color-brand-500);
}

/* Timeline Compact */
.timeline-compact {
  background: white;
  padding: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.t-compact-item {
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px dashed var(--border-color);
}

.t-compact-item:last-of-type {
  border-bottom: none;
}

.t-c-date {
  font-size: 12px;
  font-weight: 800;
  color: var(--color-accent);
  margin-bottom: 4px;
}

.t-c-body {
  font-size: 15px;
  color: var(--color-brand-800);
  font-weight: 500;
}

.view-more-link {
  display: inline-block;
  font-weight: 700;
  color: var(--color-brand-900);
  text-decoration: none;
  font-size: 14px;
  transition: var(--transition-smooth);
}

.view-more-link:hover {
  color: var(--color-accent);
  transform: translateX(4px);
}

/* ---------- Bento Gallery ---------- */
.bg-white {
  background: white;
}

.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.bento-item:hover .bento-img {
  transform: scale(1.05);
}

.bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 70%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  color: white;
}

.bento-tag {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.bento-overlay h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.bento-overlay p {
  font-size: 14px;
  opacity: 0.8;
}

.bento-footer {
  margin-top: 48px;
  text-align: center;
}

/* ---------- Modern Services ---------- */
.modern-services {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
}

.service-card {
  background: white;
  padding: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-smooth);
}

.service-card:hover {
  background: var(--color-brand-50);
  border-color: var(--color-accent);
  transform: translateY(-8px);
}

.svc-icon-box {
  width: 64px;
  height: 64px;
  background: var(--color-brand-50);
  color: var(--color-brand-900);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  transition: var(--transition-smooth);
}

.service-card:hover .svc-icon-box {
  background: var(--color-accent);
  color: white;
}

.service-card h3 {
  font-size: 22px;
  margin-bottom: 16px;
}

.service-card p {
  color: var(--color-brand-500);
  margin-bottom: 24px;
  font-size: 15px;
}

.svc-list {
  list-style: none;
  display: grid;
  gap: 12px;
}

.svc-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-brand-700);
}

.dot {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
}

/* ---------- Testimonial Impact ---------- */
.dark-section {
  background: var(--color-brand-900);
  color: white;
}

.testimonial-impact {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.quote-icon {
  font-size: 80px;
  font-family: serif;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: -20px;
  opacity: 0.3;
}

.quote-text {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 40px;
  font-family: var(--font-primary);
}

.quote-text strong {
  color: var(--color-accent);
}

.author-info strong {
  display: block;
  font-size: 18px;
}

.author-info span {
  font-size: 14px;
  color: var(--color-brand-400);
}

/* ---------- Final CTA ---------- */
.final-cta {
  background: var(--color-accent-gradient);
  padding: 80px;
  border-radius: var(--radius-xl);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-inner {
  position: relative;
  z-index: 1;
}

.final-cta h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 20px;
}

.final-cta p {
  font-size: 1.15rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btns {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-white {
  background: white;
  color: var(--color-brand-900);
}

.btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background: white;
  color: var(--color-brand-900);
}
</style>
