import dynamic from 'next/dynamic'
import { Skeleton } from '@mui/material'

const Panorama = dynamic(() => import('./Panorama'), {
  ssr: false,
  loading: () => <Skeleton variant="rectangular" width={600} height={400} animation="wave" />
})

export default Panorama
