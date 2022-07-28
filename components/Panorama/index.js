import dynamic from 'next/dynamic'

const Panorama = dynamic(() => import('./Panorama'), {
  ssr: false
})

export default Panorama
