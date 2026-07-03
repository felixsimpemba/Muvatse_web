<template>
  <div class="divider-wrapper" :class="[type, position]">
    <svg v-if="type === 'curve'" viewBox="0 0 1440 120" preserveAspectRatio="none" class="divider-svg">
      <path 
        fill="currentColor" 
        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
    <svg v-if="type === 'wave'" viewBox="0 0 1440 120" preserveAspectRatio="none" class="divider-svg">
      <path 
        fill="currentColor" 
        d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,53.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'curve' },
  position: { type: String, default: 'bottom' } // top or bottom
})
</script>

<style scoped>
.divider-wrapper {
  width: 100%;
  height: 80px;
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
}

.divider-wrapper.top {
  transform: rotate(180deg);
}

.divider-svg {
  width: 100%;
  height: 100%;
  color: var(--color-brand-100);
}

.bg-white { color: white; }
</style>
