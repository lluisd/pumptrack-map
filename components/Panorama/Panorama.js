import * as React from 'react'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid, Link } from '@mui/material'

const Panorama = ({panorama, pumptrack}) => {
  if (panorama && pumptrack) {

    const image = `/images/pumptrack/${pumptrack.id}/${panorama.image}`

    return (
        <Grid container spacing={2} direction="column" >
          <Grid item width="800px"
                height="600px">
            <Scene embedded>
              <Entity primitive='a-sky' src={image} rotation={panorama.rotation}/>
            </Scene>
          </Grid>
        </Grid>
    )
  }
}

export default Panorama
