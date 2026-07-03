<template>
  <div class="gallery-page bg-technical">
    <!-- Header -->
    <section class="section gallery-header">
      <div class="container">
        <SectionHeader :label="content.hero.label" :title="content.hero.title"
          :subtitle="content.hero.subtitle"
          centered />
      </div>
    </section>

    <!-- Gallery Grid (CMS-managed portfolio items) -->
    <section class="section gallery-section">
      <div class="container gallery-grid">
        <div v-for="(item, i) in galleryItems" :key="item.id" class="gallery-item reveal" :class="`delay-${i % 4}`"
          @click="openLightbox(item)">
          <div class="gallery-card">
            <div class="card-visual">
              <img :src="item.url" :alt="item.title" loading="lazy">
              <div class="card-overlay">
                <div class="overlay-content">
                  <span class="category-pill">{{ item.category }}</span>
                  <h3>{{ item.title }}</h3>
                  <div class="zoom-icon">
                    <Maximize2 :size="20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal (local gallery) -->
    <Transition name="fade">
      <div v-if="selectedItem" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click.stop="closeLightbox">
          <X :size="32" />
        </button>
        <button class="lightbox-nav prev" @click.stop="prevImage" aria-label="Previous image">
          <ChevronLeft :size="48" />
        </button>
        <button class="lightbox-nav next" @click.stop="nextImage" aria-label="Next image">
          <ChevronRight :size="48" />
        </button>
        <div class="lightbox-content" @click.stop>
          <img :src="selectedItem.url || selectedItem.image_url" :alt="selectedItem.title" class="lightbox-image">
          <div class="lightbox-info">
            <span class="lightbox-cat">{{ selectedItem.category }}</span>
            <h2 class="lightbox-title">{{ selectedItem.title }}</h2>
            <p v-if="selectedItem.description" class="lightbox-desc">{{ selectedItem.description }}</p>
            <p class="lightbox-counter">{{ currentIndex + 1 }} / {{ galleryItems.length }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import SectionHeader from '../components/SectionHeader.vue'
import { useReveal } from '../composables/useReveal'
import { usePortfolio, usePageContent } from '../composables/useContent'

useReveal()

const selectedItem = ref(null)

const { portfolio } = usePortfolio()

const { content } = usePageContent('portfolio', {
  hero: { label: 'Our Work Gallery', title: 'Engineering Excellence in the Field',
          subtitle: 'A comprehensive visual record of our high-voltage infrastructure projects and technical delivery across Zambia.' },
})

const galleryItems = computed(() =>
  portfolio.value.filter(p => p.image_url).map(p => ({
    id: p.id,
    url: p.image_url,
    title: p.title,
    category: p.category,
    description: p.description,
  }))
)

const currentIndex = computed(() => {
  if (!selectedItem.value) return -1
  return galleryItems.value.findIndex(item => item.id === selectedItem.value.id)
})

const openLightbox = (item) => {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
}

const closeLightbox = () => {
  selectedItem.value = null
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
}

const nextImage = () => {
  if (galleryItems.value.length <= 1) return
  const nextIdx = (currentIndex.value + 1) % galleryItems.value.length
  selectedItem.value = galleryItems.value[nextIdx]
}

const prevImage = () => {
  if (galleryItems.value.length <= 1) return
  const prevIdx = (currentIndex.value - 1 + galleryItems.value.length) % galleryItems.value.length
  selectedItem.value = galleryItems.value[prevIdx]
}

const handleKeydown = (e) => {
  if (!selectedItem.value) return
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'Escape') closeLightbox()
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.lightbox-desc { font-size: 14px; color: rgba(255,255,255,0.65); margin-top: 8px; max-width: 600px; margin-left: auto; margin-right: auto; }

.gallery-page {
  min-height: 100vh;
  padding-bottom: 80px;
}

.bg-technical {
  background-color: #f8fafc;
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 32px 32px;
}

.gallery-header {
  padding-top: calc(var(--nav-height) + 60px);
  padding-bottom: 40px;
}

/* Sticky Filters */
.sticky-filters {
  position: sticky;
  top: 72px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  padding: 16px 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.filter-container {
  display: flex;
  justify-content: center;
}

.filter-pills {
  display: flex;
  gap: 8px;
  padding: 4px;
  background: #f1f5f9;
  border-radius: var(--radius-full);
}

.filter-pill {
  padding: 8px 24px;
  border: none;
  background: transparent;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-brand-600);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-pill.active {
  background: white;
  color: var(--color-brand-900);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Gallery Grid */
.gallery-section {
  padding-top: 40px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.gallery-item {
  cursor: pointer;
}

.gallery-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  aspect-ratio: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

.card-visual {
  width: 100%;
  height: 100%;
  position: relative;
}

.card-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-card:hover img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 24px;
}

.gallery-card:hover .card-overlay {
  opacity: 1;
}

.overlay-content {
  width: 100%;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.gallery-card:hover .overlay-content {
  transform: translateY(0);
}

.category-pill {
  display: inline-block;
  padding: 4px 10px;
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.overlay-content h3 {
  color: white;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
}

.zoom-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-close {
  position: absolute;
  top: 32px;
  right: 32px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  z-index: 10;
}

.lightbox-close:hover {
  opacity: 1;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav.prev {
  left: 40px;
}

.lightbox-nav.next {
  right: 40px;
}

.lightbox-content {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
}

.lightbox-image {
  max-height: 70vh;
  width: 100%;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.lightbox-info {
  text-align: center;
  color: white;
}

.lightbox-cat {
  font-size: 12px;
  font-weight: 800;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 8px;
}

.lightbox-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.lightbox-counter {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .lightbox-nav {
    width: 48px;
    height: 48px;
  }

  .lightbox-nav.prev {
    left: 10px;
  }

  .lightbox-nav.next {
    right: 10px;
  }

  .lightbox-title {
    font-size: 18px;
  }
}
</style>
