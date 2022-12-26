import * as React from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid, Skeleton } from '@mui/material'
import styles from './Panorama.module.css'
import { useEffect, useRef, useState } from 'react'

const Panorama = ({panorama}) => {
  const [loaded, setLoaded] = useState(false)
  const sceneEl = useRef(null)

  useEffect(() => {
    setLoaded(false)
  }, [panorama])

  useEffect(() => {
    let scene = sceneEl.current
    scene.el.style.display = 'none'

    if (scene) {
      scene.el.addEventListener('loaded', () => {
        scene.el.style.display = 'block'
        setLoaded(true)
      })
    }
  }, [])

  const image = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_PANORAMAS}/${panorama.image}`

  return (
    <Grid container spacing={0} direction="column" >
      <Grid item className={styles.panorama}>
        { loaded ? '' : <Skeleton variant="rectangular" width={600} height={400} animation="wave" />}
        <Scene ref={sceneEl} embedded>
          <a-assets>
            <img src={image} id="panorama" />
          </a-assets>
          <Entity primitive='a-sky' src="#panorama" rotation={panorama.rotation}/>
        </Scene>
      </Grid>
    </Grid>
  )
}

export default Panorama
