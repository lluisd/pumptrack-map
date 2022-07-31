import {useRef, useEffect} from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid } from '@mui/material'

const VideoVR = ({videoVR, pumptrack}) => {
  if (videoVR && pumptrack) {
    const videoUrl = `/images/pumptrack/${pumptrack.id}/${pumptrack.video.high}`
    const videoEl = useRef(null)

    useEffect(() => {
      let video = videoEl.current
      video.volume = 0.2
      video.play()
      return function() {
        video.pause()
      }
    }, [])

    return (
      <Grid container spacing={2} direction="column" >
        <Grid item width="800px"
              height="600px">
          <Scene embedded>
            <a-assets>
              <video ref={videoEl} id="vrVideo" src={videoUrl} loop={false} playsInline  />
            </a-assets>
            <Entity id="video" primitive="a-videosphere" src="#vrVideo" play-on-click rotation="0 -85 0"/>
          </Scene>
        </Grid>
      </Grid>
    )
  }
}

export default VideoVR
