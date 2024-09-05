import defaultSettings from '@/settings'

const title = defaultSettings.title || '千网论文'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
