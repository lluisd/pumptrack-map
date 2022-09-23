import React, { useState, useDebugValue  } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'
import { InteractiveImage } from '../components/InteractiveImage'
import Box from '@mui/material/Box'
import styles from "../styles/Home.module.css"
import Fade from '@mui/material/Fade'
import { getImagePlaceholders } from '../lib/placeholders'
import { useRouter } from 'next/router'

function MapPage({ allSpotsData, blurImages }) {
  const router = useRouter()
  const slug = router.query.slug || []

  if (slug.length === 1) {
    const pumptrackIdFromQuery = slug[0]
    const requestedSpot = allSpotsData.spots.find(spot => spot.id === pumptrackIdFromQuery)
    if (requestedSpot) {
      handleSelectedPumptrack(requestedSpot)
    }
  }

  const center = [41.979401, 2.821426]
  const mapZoom = 10
  const bounds = [[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]
  const [pumptrack, setPumptrack] = useState(null)
  const [markerSelected, setMarkerSelected] = useState(false)
  function handleSelectedPumptrack (selectedPumptrack) {
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
          {pumptrack && <InteractiveImage spot={pumptrack} blurImages={blurImages} handlerOnClose={modalHandleClose}/>}
        </Box>
      </Fade>
    </Layout>
  )
}

export async function getStaticProps() {
  const allSpotsData = await getSortedSpotsData()
  const blurImages = await getImagePlaceholders(allSpotsData)

  return {
    props: {
      allSpotsData,
      blurImages
    }
  }
}


export default MapPage
