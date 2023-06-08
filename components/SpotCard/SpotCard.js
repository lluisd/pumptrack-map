import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './SpotCard.module.css';
import { useEffect, useState } from 'react'
import VideoVR from '../VideoVR/index'
import { Chip, Fab, Grid, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import NavigationIcon from '@mui/icons-material/Navigation';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import Panorama from '../Panorama'
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'next-i18next'
import veloIcon from '../../public/images/icon-velo.svg'

const SpotCard = ({spot, blurImages, handlerOnClose}) => {
  const { t } = useTranslation('common')

  const [panorama, setPanorama] = useState(null)
  const [videoVR, setVideoVR] = useState(null)

  const img = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_IMAGES}/${spot.id}.jpg`
  const blurImg = blurImages.find(bi => bi.id === spot.id).blurDataURL

  useEffect(() => {
    removePanorama()
    removeVideoVR()
  }, [spot])

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

  const handlerShowPanorama = () => {
    removeVideoVR()
    setPanorama(spot.panorama)
  }

  const handlerShowVideo = () => {
    removePanorama()
    setVideoVR(spot.video)
  }

  const getStatus = (spot) => {
    let status = 'error'
    if (spot.status === 'construction') {
      status = 'error'
    }
    else if (spot.hasOpeningHours) {
      status = 'warning'
    }
    else if (spot.status === 'open') {
      status = 'success'
    }
    return status
  }

  const getStatusText = (spot) => {
    let text = t(spot.status)
    if (spot.hasOpeningHours) {
      text = t('timetable')
    }
    return text
  }

  const getLink = (brand) => {
    let link
    switch (brand) {
      case 'velosolutions':
        link = 'https://velosolutions.com/es/'
        break
      case 'pumptrackpark':
        link = 'https://www.pumptrack.cat/'
        break
    }

    return link
  }

  return (
    <Grid container spacing={2} direction="column"  style={{ flexWrap: 'nowrap' }}>
      {(panorama || videoVR) && <Grid item sx={{ mt: 2 }}>
         <Grid container direction="row">
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-start" sx={{ ml: 4 }}>
              {(panorama || videoVR) && <Fab  size="small" aria-label="back"  onClick={handlerBack} className={styles.backButton} >
                <ArrowBackIcon  />
              </Fab> }
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h6" gutterBottom>
                {spot.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end" sx={{ mr: 4 }}>
              <Fab  size="small"  aria-label="close"  onClick={handlerOnClose} className={styles.closeButton} >
                <CloseIcon />
              </Fab>
            </Box>
          </Grid>
        </Grid>
      </Grid> }
      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          {panorama && <Panorama panorama={panorama}/>}
          {videoVR && <VideoVR videoVR={videoVR}/>}
          {!panorama && !videoVR &&
                <Grid container direction="column" style={{ flexWrap: 'nowrap' }}>
                  <Grid item>
                    <>
                      <Box className={styles.playButton} sx={{ '& > :not(style)': { m: 1 } }}>
                        {spot.video && <Fab color="primary" size="small" variant="extended"  onClick={handlerShowVideo} >
                          <PlayArrowIcon sx={{ mr: 1 }} />
                          <Box sx={{ mr: 1 }}>{t('play')}</Box>
                        </Fab> }
                        {spot.panorama && <Fab color="primary" size="small" onClick={handlerShowPanorama}>
                          <ThreeDRotationIcon />
                        </Fab> }
                      </Box>
                      <Fab size="small"  aria-label="close"  onClick={handlerOnClose} className={styles.closeButton} >
                        <CloseIcon  />
                      </Fab>
                    </>
                    <Image
                      width="1920"
                      height="1080"
                      src={img}
                      layout="responsive"
                      placeholder="blur"
                      key={img}
                      priority={true}
                      alt={t('picture-of') + spot.name}
                      blurDataURL={blurImg}/>
                    </Grid>
                  <Grid item>
                    <Grid container justifyContent="space-between" >
                      <Grid item xs={12} sm={10} md={8} className={styles.trackInfo} p={2}>
                        <Typography variant="h6" gutterBottom>
                          {spot.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {t('company')}: <Link href={getLink(spot.brand)} rel="noreferrer" target="_blank" color="secondary">{t(spot.brand)}</Link>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {spot.length ? `${t('length')}: ${spot.length} ${t('meters')}` : ''}
                        </Typography>
                      </Grid>
                      <Grid item  p={2} justify="flex-end" >
                        <Typography variant="subtitle1" gutterBottom>
                          <Grid container direction="row" alignItems="center" spacing={1} justifyContent="flex-end">
                            <Grid item>
                              <Chip label={getStatusText(spot)} color={getStatus(spot)}  />
                            </Grid>
                          </Grid>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          <Link href={spot.gmapsLink} rel="noreferrer" target="_blank" color="secondary">
                            <Grid container direction="row" alignItems="center" spacing={1} justifyContent="flex-end">
                              <Grid item>
                                <NavigationIcon size="small" />
                              </Grid>
                              <Grid item>
                                {t('gmaps-link')}
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

export default SpotCard
