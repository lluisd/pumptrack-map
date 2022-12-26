import { useRef, useEffect, useState } from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid, Skeleton } from '@mui/material'
import styles from './VideoVR.module.css'
import * as React from 'react'

const VideoVR = ({videoVR}) => {
  const [loaded, setLoaded] = useState(false)
  const videoEl = useRef(null)
  const sceneEl = useRef(null)
  const textEl = useRef(null)

  useEffect(() => {
    setLoaded(false)
  }, [videoVR])

  useEffect(() => {
    let video = videoEl.current
    let scene = sceneEl.current
    let text = textEl.current
    scene.el.style.display = 'none'
    let loaded = false
    let clicked = false

    if (scene) {
      scene.el.addEventListener('loaded', () => {
        scene.el.style.display = 'block'
        setLoaded(true)
        loaded = true
        playVideo(video, loaded, clicked)
      })
      scene.el.addEventListener('click', () => {
        text.el.object3D.visible = false
        clicked = true
        playVideo(video, loaded, clicked)
      })
    }
  }, [])
  const videoUrl = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_VR_VIDEOS}/${videoVR}`

  const playVideo = (video, loaded, clicked) => {
    if(loaded && clicked && video)  {
      if (video) {
        video.volume = 0.2
        video.play()
      }
    }
  }

  return (
    <Grid container spacing={0} direction="column" >
      <Grid item className={styles.videoVR}>
        { loaded ? '' : <Skeleton variant="rectangular" width={600} height={400} animation="wave" />}
        <Scene ref={sceneEl} embedded  loading-screen="dotsColor: red; backgroundColor: black">
          <a-assets>
            <video preload="none" ref={videoEl} id="vrVideo" src={videoUrl} loop={false} playsInline crossOrigin="anonymous"   />
          </a-assets>
          <Entity primitive="a-camera">
            <Entity ref={textEl} position="0 0 -1.5"
                    text="align:center;
                width:6;
                wrapCount:100;
                color: white;
                value: Click or tap to start video"></Entity>
          </Entity>
          <Entity id="video" primitive="a-videosphere" src="#vrVideo" play-on-click rotation="0 -85 0"/>
        </Scene>
      </Grid>
    </Grid>
  )
}

export default VideoVR
