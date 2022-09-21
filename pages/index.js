import React, { useState, useDebugValue  } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'
import { InteractiveImage } from '../components/InteractiveImage'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import styles from "../styles/Home.module.css"
import Fade from '@mui/material/Fade'
import ClickAwayListener from '@mui/base/ClickAwayListener';

function MapPage({ allSpotsData }) {
  const center = [41.979401, 2.821426]
  const mapZoom = 10
  const bounds = [[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]
  const [pumptrack, setPumptrack] = useState(null)
  const [markerSelected, setMarkerSelected] = useState(false)
  function handleSelectedPumptrack (pumptrack) {
    setMarkerSelected(true)
    setPumptrack(pumptrack)
  }
  const modalHandleClose = () => {
    console.log('handle close')
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
          {pumptrack && <InteractiveImage spot={pumptrack} handlerOnClose={modalHandleClose}/>}
        </Box>
      </Fade>
    </Layout>
  )
}

const modalStyle = {
  zindex: '7',
  position: 'absolute',
  top: '30%',
  left: '30%',
  transform: 'translate(-30%, -30%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24
}

export async function getStaticProps() {
  const allSpotsData = await getSortedSpotsData()

  return {
    props: {
      allSpotsData
    },
    revalidate: 60
  }
}

export default MapPage
