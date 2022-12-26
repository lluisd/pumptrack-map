import dynamic from 'next/dynamic'
import { Skeleton } from '@mui/material'

const VideoVR = dynamic(() => import('./VideoVR'), {
  ssr: false,
  loading: () => <Skeleton variant="rectangular" width={600} height={400} animation="wave" />
})

export default VideoVR
