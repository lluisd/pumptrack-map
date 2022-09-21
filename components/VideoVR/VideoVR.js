import { useRef, useEffect, useState } from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid } from '@mui/material'
import styles from './VideoVR.module.css'
import Button from '@mui/material/Button'
import * as React from 'react'

const VideoVR = ({videoVR}) => {
  const videoEl = useRef(null)
  const sceneEl = useRef(null)
  const textEl = useRef(null)

  useEffect(() => {
    let video = videoEl.current
    let scene = sceneEl.current
    let text = textEl.current
    let loaded = false
    let clicked = false

    if (scene) {
      scene.el.addEventListener('loaded', () => {
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
  const videoUrl = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_VR_VIDEOS}/${videoVR[process.env.NEXT_PUBLIC_VR_VIDEO_SIZE]}`

  const playVideo = (video, loaded, clicked) => {
    if(loaded && clicked && video)  {
      if (video) {
        video.volume = 0.2
        video.play()
      }
    }
  }

  return (
    <Grid container spacing={2} direction="column" >
      <Grid item className={styles.videoVR}>
        <Scene ref={sceneEl}  embedded  loading-screen="dotsColor: red; backgroundColor: black">
          <a-assets>
            <video ref={videoEl} id="vrVideo" src={videoUrl} loop={false} playsInline crossOrigin="anonymous"   />
            <img id="buttonImg" src="https://cdn.glitch.com/a46c3f68-2f15-429d-af36-27cb89cd1d60%2Fic_play_circle_filled_black_36dp_2x.png?1518043219946"/>
          </a-assets>
          {/*<Entity primitive="a-image" id="playButton"  position="0 0 -7"></Entity>*/}
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
