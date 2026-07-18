// Mapping of actual project images
export const PROJECT_IMAGES = {
  // Main featured images from our_work directory
  TRANSFORMER_FIELD: 'our_work/transformer_installation.png',
  SUBSTATION_GRID: 'our_work/Ring Main Unit Installation.jpeg',
  CONTROL_PANEL: 'our_work/auto_closer.jpeg',
  OVERHEAD_LINES: 'our_work/High Voltage Overhead Line Construction and Transformer Mounting.jpeg',
  SOLAR_ARRAY: 'our_work/general1/WhatsApp Image 2026-04-20 at 2.30.29 PM.jpeg', // Keep for now
  SITE_WORK_1: 'our_work/HIgh Volktage Cabke Joining.jpeg',
  SITE_WORK_2: 'our_work/general1/WhatsApp Image 2026-04-20 at 2.30.30 PM.jpeg',
  WIRING_DETAIL: 'our_work/general1/WhatsApp Image 2026-04-20 at 2.30.31 PM (1).jpeg',
  SWITCHGEAR: 'our_work/auto_closer.jpeg',
  TEAM_ON_SITE: 'our_work/general1/WhatsApp Image 2026-04-20 at 2.30.30 PM.jpeg',
  CABINET_INTERNAL: 'our_work/general1/WhatsApp Image 2026-04-20 at 2.30.31 PM.jpeg',
  TRANSFORMER_CLOSEUP: 'our_work/transormer_installation.jpeg',
  HERO_IMAGE: 'our_work/general2/hero.jpeg',
  SUBSTATION_GRID1: 'our_work/33_11kV substation.jpeg',

  // Team images still in root
  // we can move them to a team folder later if needed 
  // another option is to keep them in the root for easy access 
  TEAM_DIRECTOR: 'director.png',
  TEAM_CFO: 'cfo.png',
  TEAM_COO: 'COO.png',
  TEAM_HC: 'H.C. Manager.png'
}

export const getImageUrl = (name) => {
  if (!name) return ''
  if (name.startsWith('http') || name.startsWith('/')) return name
  // If it's a simple name without path, it's likely in the root images folder
  // Otherwise, it uses the path provided in PROJECT_IMAGES
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

/**
 * Dynamically fetches all images from the our_work/gallery directory
 * and cleans up filenames for titles.
 */
export const getGalleryImages = () => {
  const images = import.meta.glob('../assets/images/our_work/gallery/*.{jpeg,jpg,png}', {
    eager: true,
    as: 'url'
  })

  return Object.entries(images).map(([path, url]) => {
    const filename = path.split('/').pop()
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "")

    // Determine category based on filename
    let category = 'Major Projects'
    let title = nameWithoutExt

    if (title.toLowerCase().includes('whatsapp')) {
      category = 'General Work'
      title = 'General Field Operation'
    } else {
      // Clean up titles for major projects
      title = title
        .replace(/_/g, ' ')
        .replace(/HIgh Volktage Cabke/gi, 'High Voltage Cable')
        .replace(/Joining/gi, 'Jointing')
        .replace(/transormer/gi, 'Transformer')
        .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize words
    }

    return {
      id: path,
      url,
      title,
      category,
      filename
    }
  })
}
