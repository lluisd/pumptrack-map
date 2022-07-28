import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import styles from './InteractiveImage.module.css';
import { ImageMap } from '@qiuz/react-image-map';

export default function InteractiveImage({pumptrackId, data}) {
  const pumptrack = data.find(item => item.id === pumptrackId)
  if (pumptrack !== undefined) {
    const img = pumptrack.image

    const mapArea = pumptrack.maps.map(map => {
      return {
        width: map.width,
        height: map.height,
        left: map.left,
        top: map.top,
        style: { background: 'rgba(255, 0, 0, 0.5)' },
        onMouseOver: () => console.log('map onMouseOver'),
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
      const tip = `click map${index + 1}`;
      console.log(tip, area);
      alert(tip);
    }

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
        <ImageMap
          className={styles['interactiveImage-image']}
          src={img}
          map={mapArea}
          onMapClick={onMapClick}
        />
      </Box>
    )
  }
}
