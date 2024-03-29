import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid, Skeleton } from '@mui/material'
import styles from './VideoVR.module.css'
import * as React from 'react'
import { useTranslation } from 'next-i18next'

const VideoVR = ({videoVR}) => {
  const { t } = useTranslation('common')
  const [loaded, setLoaded] = useState(false)
  const videoEl = useRef(null)
  const sceneEl = useRef(null)
  const textEl = useRef(null)

  const videoUrl = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_VR_VIDEOS}/${videoVR}`

  useLayoutEffect(() => {
    let video = videoEl.current
    let scene = sceneEl.current
    let text = textEl.current

    let sceneLoaded = false
    let clicked = false

    if (scene) {
      scene.el.addEventListener('loaded', () => {
        scene.el.style.display = 'block'
        setLoaded(true)
        sceneLoaded = true
        playVideo(video, sceneLoaded, clicked)
      })
      scene.el.addEventListener('click', () => {
        text.el.object3D.visible = false
        clicked = true
        playVideo(video, sceneLoaded, clicked)
      })
    }
  }, [])


  const playVideo = (video, sceneLoaded, clicked) => {
    if(sceneLoaded && clicked && video)  {
      if (video) {
        video.volume = 0.2
        video.play()
      }
    }
  }

  const entityText = `align:center; width:6; wrapCount:100; color: white; value: ${t('click-to-play')}`

  return (
    <Grid container spacing={0} direction="column" >
      <Grid item className={styles.videoVR}>
        { loaded ? '' : <Skeleton variant="rectangular" width={600} height={400} animation="wave" />}
        <Scene ref={sceneEl} embedded  loading-screen="dotsColor: red; backgroundColor: black" >
          <a-assets>
            <video preload="none" ref={videoEl} id="vrVideo" src={videoUrl} loop={false} playsInline crossOrigin="anonymous"   />
          </a-assets>
          <Entity primitive="a-camera">
            <Entity ref={textEl} position="0 0 -1.5" text={entityText}></Entity>
          </Entity>
          <Entity id="video" primitive="a-videosphere" src="#vrVideo" play-on-click rotation="0 -85 0"/>
        </Scene>
      </Grid>
    </Grid>
  )
}

export default VideoVR
