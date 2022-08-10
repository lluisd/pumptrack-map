import React, { useState, useDebugValue  } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'
import { InteractiveImage } from '../components/InteractiveImage'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import styles from "../styles/Home.module.css"
import useSWR from 'swr'

function MapPage({ allSpotsData }) {
  const center = [41.979401, 2.821426]
  const mapZoom = 10
  const bounds = [[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]
  const [pumptrack, setPumptrack] = useState(null)
  function handleSelectedPumptrack (pumptrack) {
    setPumptrack(pumptrack)
  }
  const modalHandleClose = () => setPumptrack(null)

  return (
    <Layout>
      <Map center={center} zoom={mapZoom} markers={allSpotsData.spots} maxBounds={bounds} onClick={handleSelectedPumptrack} />
      <Modal open={!!pumptrack}
             onClose={modalHandleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          {pumptrack && <InteractiveImage spot={pumptrack} handlerOnClose={modalHandleClose}/> }
        </Box>
      </Modal>
    </Layout>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '30%',
  left: '30%',
  transform: 'translate(-30%, -30%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24
}

export async function getStaticProps() {
  const allSpotsData = getSortedSpotsData()

  return {
    props: {
      allSpotsData
    }
  }
}

export default MapPage
