import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './InteractiveImage.module.css';
import { ImageMap } from '@qiuz/react-image-map';
import { useState } from 'react'
import Panorama from '../Panorama/index'
import VideoVR from '../VideoVR/index'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const InteractiveImage = ({spot, handlerOnClose}) => {
  let pumptrack = { panoramas: [] }
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_CDN_URL}/${process.env.NEXT_PUBLIC_DATA}/${spot.id}.json`, fetcher)

  if (data) pumptrack = data
  const [panorama, setPanorama] = useState(null)
  const [videoVR, setVideoVR] = useState(null)

  const img = `${process.env.NEXT_PUBLIC_CDN_URL}/${process.env.NEXT_PUBLIC_MAPS}/${spot.id}.jpg`

  const mapArea = pumptrack.panoramas.map(map => {
    return {
      width: map.imageArea.width,
      height: map.imageArea.height,
      left: map.imageArea.left,
      top: map.imageArea.top,
      style: { background: 'rgba(255, 0, 0, 0.5)',borderRadius: "50%",
      display: "inline-block" , border: "1px solid black"},
      render: (area, index) => (
        <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
        ><VisibilityIcon sx={{ color: "white" }} fontSize="large"/></span>
      ),
    }
  })

  const onMapClick = (area, index) => {
    removeVideoVR()
    setPanorama(pumptrack.panoramas[index])
  }

  const removePanorama = () => {
    setPanorama(null)
  }

  const removeVideoVR = () => {
    setVideoVR(null)
  }

  const handlerBack = () => {
    removePanorama()
    removeVideoVR()
  }

  const handlerShowVideo = () => {
    removePanorama()
    setVideoVR(pumptrack.video)
  }

  return (
    <Grid container spacing={2} direction="column" >
      <Grid item sx={{ mt: 2 }}>
        <Grid container direction="row">
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-start" sx={{ ml: 4 }}>
              {(panorama || videoVR) && <Button variant="text"  onClick={handlerBack}>Back</Button>}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="row" justifyContent="center">
              <Grid item>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                  {pumptrack && pumptrack.name}
                </Typography>
              </Grid>
              <Grid item>
                <Box display="flex" justifyContent="flex-start" sx={{ ml: 4 }}>
                  {!videoVR && pumptrack.video && <Button variant="outlined" onClick={handlerShowVideo}>VR video</Button>}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end" sx={{ mr: 4 }}>
              <Button variant="text" onClick={handlerOnClose} >Close</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
         <Panorama panorama={panorama} />
         <VideoVR videoVR={videoVR}/>
          {!panorama && !videoVR &&
                <ImageMap
                  className={styles['interactiveImage-image']}
                  src={img}
                  map={mapArea}
                  onMapClick={onMapClick}
                />
          }
        </Box>
      </Grid>
    </Grid>
  )
}

export default InteractiveImage
