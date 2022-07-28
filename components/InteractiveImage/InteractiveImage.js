import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import styles from './InteractiveImage.module.css';
import { ImageMap } from '@qiuz/react-image-map';
import { useState } from 'react'
import Panorama from '../Panorama/index'


export default function InteractiveImage({pumptrackId, data}) {
  const [panorama, setPanorama] = useState(null);

  const pumptrack = data.find(item => item.id === pumptrackId)
  if (pumptrack !== undefined) {
    const img = `${pumptrack.imagesPath}/${pumptrack.image}`

    const mapArea = pumptrack.maps.map(map => {
      return {
        width: map.width,
        height: map.height,
        left: map.left,
        top: map.top,
        style: { background: 'rgba(255, 0, 0, 0.5)' },
        render: (area, index) => (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 0, 0.5)'
            }}
          >
            X
          </span>
        )
      }
    })

    const onMapClick = (area, index) => {
      setPanorama(pumptrack.maps[index])
    }

    const removePanorama = () => {
      setPanorama(null)
    }

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
        {panorama ?
          <Panorama panorama={panorama} pumptrack={pumptrack} handlerBack={removePanorama}/>
          :
          <ImageMap
            className={styles['interactiveImage-image']}
            src={img}
            map={mapArea}
            onMapClick={onMapClick}
          />
        }
      </Box>
    )
  }
}
