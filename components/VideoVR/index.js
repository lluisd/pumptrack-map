import dynamic from 'next/dynamic'

const VideoVR = dynamic(() => import('./VideoVR'), {
  ssr: false
})

export default VideoVR
