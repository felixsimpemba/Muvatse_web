<template>
  <div class="section-header" :class="{ centered: centered, 'is-dark': dark }">
    <div class="label-wrapper reveal">
      <span v-if="label" class="soft-label">{{ label }}</span>
    </div>
    <h2 class="section-title reveal delay-1">
      <slot>{{ title }}</slot>
    </h2>
    <p v-if="subtitle" class="section-subtitle reveal delay-2">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  title: String,
  subtitle: String,
  centered: { type: Boolean, default: false },
  dark: { type: Boolean, default: false }
})
</script>

<style scoped>
.section-header {
  margin-bottom: var(--space-12);
  max-width: 800px;
}

.section-header.centered {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.label-wrapper {
  margin-bottom: var(--space-4);
}

.soft-label {
  display: inline-block;
  padding: 6px 16px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--color-brand-900);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.section-header.is-dark .section-title {
  color: white;
}

.section-subtitle {
  font-size: var(--text-lg);
  color: var(--color-brand-600);
  line-height: 1.6;
}

.section-header.is-dark .section-subtitle {
  color: var(--color-brand-200);
}
</style>
