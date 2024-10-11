export const extractVideoId = (url) => {
  const match = url.match(/v=([^&]+)/)
  return match ? match[1] : null
}

export function getYoutubeThumbnail(videoUrl) {
  if (typeof videoUrl !== 'string') {
    console.error('Invalid input: videoUrl should be a string')
    return null
  }

  const videoIdMatch = videoUrl.match(
    // eslint-disable-next-line no-useless-escape
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  const videoId = videoIdMatch ? videoIdMatch[1] : null

  if (!videoId) {
    console.error('Invalid YouTube URL')
    return null
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}
