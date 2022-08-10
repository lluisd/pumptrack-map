import {useRef, useEffect} from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid } from '@mui/material'

const VideoVR = ({videoVR}) => {
  const videoEl = useRef(null)
  useEffect(() => {
    let video = videoEl.current
    if (video) {
      video.volume = 0.2
      video.play()
      return function() {
        video.pause()
      }
    }
  }, [])

  if (videoVR) {
    const videoUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/${process.env.NEXT_PUBLIC_VR_VIDEOS}/${videoVR[process.env.NEXT_PUBLIC_VIDEO_SIZE]}`

    return (
      <Grid container spacing={2} direction="column" >
        <Grid item width="800px"
              height="600px">
          <Scene embedded>
            <a-assets>
              <video ref={videoEl} id="vrVideo" src={videoUrl} loop={false} playsInline crossOrigin="anonymous"  autoPlay={true}  />
            </a-assets>
            <Entity id="video" primitive="a-videosphere" src="#vrVideo" play-on-click rotation="0 -85 0"/>
          </Scene>
        </Grid>
      </Grid>
    )
  }
}

export default VideoVR
