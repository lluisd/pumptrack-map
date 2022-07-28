import React, { useState } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'
import InteractiveImage from '../components/InteractiveImage/InteractiveImage'
import { getImageMaps } from '../lib/imageMaps'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function MapPage({ allSpotsData, imageMaps }) {
  const [center, setCenter] = useState([41.979401, 2.821426]);
  const [mapZoom, setMapZoom] = useState(9);
  const [bounds, setBounds] = useState([[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]);

  const [pumptrack, setPumptrack] = useState(null);

  const [openModal, setOpenModal] = useState(false)

  function handleSelectedPumptrack (pumptrack) {
    setPumptrack(pumptrack)
    setOpenModal(true)
  }
  const ModalHandleClose = () => setOpenModal(false);


  return (
    <Layout>
      <Map center={center} zoom={mapZoom} markers={allSpotsData.spots} maxBounds={bounds} onClick={handleSelectedPumptrack} />
      <Modal open={openModal}
             onClose={ModalHandleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {pumptrack && `Pumptrack ${pumptrack.name}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {pumptrack && <InteractiveImage pumptrackId={pumptrack.id} data={imageMaps.data}/> }
          </Typography>
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
  const imageMaps = getImageMaps()

  return {
    props: {
      allSpotsData,
      imageMaps
    }
  }
}

export default MapPage
