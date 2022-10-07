import React, { useState, useDebugValue, useEffect } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'
import { SpotCard } from '../components/SpotCard'
import Box from '@mui/material/Box'
import styles from "../styles/Home.module.css"
import Fade from '@mui/material/Fade'
import { getImagePlaceholders } from '../lib/placeholders'
import { useRouter } from 'next/router'

function MapPage({ allSpotsData, blurImages }) {
  const router = useRouter()
  const slug = router.query.slug || []
  const center = [41.979401, 2.821426]
  const mapZoom = 10
  const bounds = [[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]
  const [pumptrack, setPumptrack] = useState(null)
  const [markerSelected, setMarkerSelected] = useState(false)

  useEffect(() => {
    if (slug.length === 1) {
      const pumptrackIdFromQuery = slug[0]
      const requestedSpot = allSpotsData.spots.find(spot => spot.id === pumptrackIdFromQuery)
      if (requestedSpot) {
        handleSelectedPumptrack(requestedSpot)
      }
    }
  }, [])

  function handleSelectedPumptrack (selectedPumptrack) {
    router.push(`/${selectedPumptrack.id}`, `/${selectedPumptrack.id}`, { shallow: true })
    setMarkerSelected(true)
    setPumptrack(selectedPumptrack)
  }
  const modalHandleClose = () => {
    setMarkerSelected(false)
    setTimeout(() => {
      setPumptrack(null)
    }, 1000)
  }

  return (
    <Layout>
      <Map center={center} zoom={mapZoom} markers={allSpotsData.spots} maxBounds={bounds} onClick={handleSelectedPumptrack} />
       <Fade in={markerSelected} timeout={1000} >
        <Box className={styles.contentbox} >
          {pumptrack && <SpotCard spot={pumptrack} blurImages={blurImages} handlerOnClose={modalHandleClose}/>}
        </Box>
      </Fade>
    </Layout>
  )
}

export async function getStaticProps(params) {
  const isHomePage = !!!params.slug

  if (isHomePage) {
    const allSpotsData = await getSortedSpotsData()
    const blurImages = await getImagePlaceholders(allSpotsData)

    return {
      props: {
        allSpotsData,
        blurImages
      }
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: false }},
    ],
    fallback: 'blocking',
  }
}

export default MapPage
