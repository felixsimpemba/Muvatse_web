<template>
  <div class="app-shell" :class="{ 'nav-open': navOpen }">
    <AppHeader @nav-toggle="navOpen = $event" />
    <main id="main-content" class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const navOpen = ref(false)
</script>

<style>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: var(--nav-height);
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-smooth), transform var(--transition-smooth);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
