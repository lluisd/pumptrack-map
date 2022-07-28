import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import InteractiveImage from '../components/InteractiveImage/InteractiveImage'
import { getImageMaps } from '../lib/imageMaps'

function ImagePage ({ imageMaps }) {
  return (
    <Layout>
      <InteractiveImage pumptrackId="frodenofund" data={imageMaps.data} />
    </Layout>
  )
}

export async function getStaticProps() {
  const imageMaps = getImageMaps()
  return {
    props: {
      imageMaps
    }
  }
}


export default ImagePage
