<template>
  <header class="site-header" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">
    <div class="container header-inner">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <img :src="logoUrl" alt="Muvatase Engineering" class="logo-image" />
      </router-link>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <router-link v-for="link in navLinks" :key="link.id || link.url" :to="link.url" class="nav-link">
          {{ link.title }}
        </router-link>
      </nav>

      <!-- Hamburger -->
      <button class="hamburger" @click="toggleMenu" :class="{ active: menuOpen }">
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <nav v-if="menuOpen" class="mobile-nav">
        <div class="mobile-links">
          <router-link v-for="link in navLinks" :key="link.id || link.url" :to="link.url" class="mobile-link" @click="closeMenu">
            {{ link.title }}
          </router-link>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCompany, useListItems, storageUrl } from '../composables/useContent'

const menuOpen = ref(false)
const isScrolled = ref(false)

const { company } = useCompany()
const logoUrl = computed(() => storageUrl(company.value?.logo_path) || '/logo.png')

const { items: navLinks } = useListItems('header_nav', [
  { url: '/', title: 'Home' },
  { url: '/portfolio', title: 'Gallery' },
  { url: '/capabilities', title: 'Services' },
  { url: '/certifications', title: 'About' },
  { url: '/contact', title: 'Contact Us' },
])

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false }
function handleScroll() { isScrolled.value = window.scrollY > 20 }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  transition: var(--transition-smooth);
}

.site-header.scrolled {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-md);
  height: 72px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-image {
  height: 70px;
  width: auto;
  object-fit: contain;
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 32px;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-link {
  font-family: var(--font-primary);
  font-weight: 600;
  color: var(--color-brand-600);
  text-decoration: none;
  transition: var(--transition-smooth);
  font-size: 15px;
}

.nav-link:hover,
.router-link-active {
  color: var(--color-accent);
}

.hamburger {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: var(--radius-md);
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

@media (min-width: 1024px) {
  .hamburger {
    display: none;
  }
}

.bar {
  width: 20px;
  height: 2px;
  background: var(--color-brand-900);
  transition: var(--transition-smooth);
  border-radius: 2px;
}

.hamburger.active .bar:first-child {
  transform: translateY(4px) rotate(45deg);
}

.hamburger.active .bar:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

.mobile-nav {
  position: fixed;
  top: 72px;
  left: 12px;
  right: 12px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 32px;
  z-index: 999;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.mobile-link {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-brand-900);
  text-decoration: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: var(--transition-smooth);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
