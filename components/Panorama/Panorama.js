import * as React from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid, Link } from '@mui/material'
import styles from './Panorama.module.css'

const Panorama = ({panorama}) => {
  if (panorama) {

    const image = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_PANORAMAS}/${panorama.image}`

    return (
      <Grid container spacing={0} direction="column" >
        <Grid item className={styles.panorama}>
          <Scene embedded>
            <Entity primitive='a-sky' src={image} rotation={panorama.rotation}/>
          </Scene>
        </Grid>
      </Grid>
    )
  }
}

export default Panorama
