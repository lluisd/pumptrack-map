import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './InteractiveImage.module.css';
import { useState } from 'react'
import VideoVR from '../VideoVR/index'
import { Chip, Container, Fab, Grid, Link, Skeleton } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import useSWR from 'swr'
import NavigationIcon from '@mui/icons-material/Navigation';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';

const fetcher = (url) => fetch(url).then((res) => res.json())

const InteractiveImage = ({spot, blurImages, handlerOnClose}) => {
  const [imageIsLoaded, setImageIsLoaded] = useState (false)
  const [panorama, setPanorama] = useState(null)
  const [videoVR, setVideoVR] = useState(null)
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_DATA}/${spot.id}.json`, fetcher)
  let pumptrack = { panoramas: [] }

  if (data) pumptrack = data

  const img = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_IMAGES}/${spot.id}.jpg`

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

  const getStatus = (spot) => {
    let status = 'error'
    if (spot.hasOpeningHours) {
      status = 'warning'
    } else {
      status = 'success'
    }
    return status
  }

  const getBlurImage = (spot) => {
    const blurImage = blurImages.find(bi => bi.id === spot.id)
    return blurImage.blurDataURL
  }

  return (
    <Grid container spacing={2} direction="column" >
      {videoVR && <Grid item sx={{ mt: 2 }}>
         <Grid container direction="row">
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-start" sx={{ ml: 4 }}>
              {(panorama || videoVR) && <Button variant="text"  onClick={handlerBack}>Back</Button>}
            </Box>
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end" sx={{ mr: 4 }}>
              <Button variant="text" onClick={handlerOnClose} >Close</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid> }
      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          {videoVR && <VideoVR videoVR={videoVR}/>}
          {!panorama && !videoVR &&
                <Grid container direction="column" style={{ flexWrap: 'nowrap' }}>
                  <Grid item className={styles.imageContainer}>
                    <>
                    {pumptrack.video && <Fab color="primary" size="small" variant="extended"  onClick={handlerShowVideo} className={styles.playButton}>
                        <PlayArrowIcon sx={{ mr: 1 }} />
                        Play VR
                      </Fab> }
                      <Fab color="primary" size="small"  aria-label="close"  onClick={handlerOnClose} className={styles.closeButton} >
                        <CloseIcon/>
                      </Fab>
                    </>
                    <Image
                      onLoadingComplete={() => setImageIsLoaded(true)}
                      width="1920"
                      height="1080"
                      src={img}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={getBlurImage(spot)}/>
                    </Grid>
                  <Grid item>
                    <Grid container justifyContent="space-between" >
                      <Grid item xs={6} md={8} className={styles.trackInfo} p={2}>
                        <Typography variant="h6" gutterBottom>
                          {spot.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                        Province: {spot.province}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {spot.length ? `Length: ${spot.length} meters` : ''}
                        </Typography>
                      </Grid>
                      <Grid item  p={2} justify="flex-end" >
                        <Typography variant="subtitle1" gutterBottom>
                          <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item>
                              Status:
                            </Grid>
                            <Grid item>
                              <Chip label={spot.status} color={getStatus(spot)}  />
                            </Grid>
                          </Grid>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          <Link href={spot.gmapsLink} rel="noreferrer" target="_blank">
                            <Grid container direction="row" alignItems="center" spacing={1}>
                              <Grid item>
                                <NavigationIcon size="small" />
                              </Grid>
                              <Grid item>
                                Google maps
                              </Grid>
                            </Grid>
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
          }
        </Box>
      </Grid>
    </Grid>
  )
}

export default InteractiveImage
