import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let io = null
  let mo = null

  function observe(el) {
    if (
      el.nodeType === 1 &&
      el.classList.contains('reveal') &&
      !el.classList.contains('is-visible')
    ) {
      io.observe(el)
    }
    if (el.nodeType === 1 && el.querySelectorAll) {
      el.querySelectorAll('.reveal:not(.is-visible)').forEach(child => io.observe(child))
    }
  }

  onMounted(() => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe elements already in the DOM
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))

    // Watch for elements added after mount (async API data)
    mo = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => observe(node))
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (io) io.disconnect()
    if (mo) mo.disconnect()
  })
}
