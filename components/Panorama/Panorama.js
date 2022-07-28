import * as React from 'react'
import Box from '@mui/material/Box'
import 'aframe'
import {Entity, Scene} from 'aframe-react'
import { Grid, Link } from '@mui/material'
import Button from '@mui/material/Button'

const Panorama = ({panorama, pumptrack, handlerBack}) => {
  if (pumptrack !== undefined) {

    const image = `${pumptrack.imagesPath}/${panorama.image}`

    return (
        <Grid container spacing={2} direction="column" >
          <Grid item>
            <Button variant="text" onClick={handlerBack}>Back</Button>
          </Grid>
          <Grid item width="800px"
                height="600px">
            <Scene embedded>
              <Entity primitive='a-sky' src={image} rotation="0 80 0"/>
            </Scene>
          </Grid>
        </Grid>
    )
  }
}

export default Panorama
