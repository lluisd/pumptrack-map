import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet'
import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import FilterControl from '../Controls/FilterControl/FilterControl'
import LanguageSelector from '../Controls/LanguageSelector/LanguageSelector'
import icon from '../../public/images/icon.svg'
import veloIcon from '../../public/images/icon-velo.svg'
import { Menu } from '../Menu'

const Map = ({center, zoom, markers, maxBounds, onClick}) => {
  const [markersList, setMarkersList] = useState(markers)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [map, setMap] = useState(null);
  const groupRef = useRef()

  const filterByHasVideo = (option) => {
    let filteredMarkers = markers
    if (option !== 'all') {
      filteredMarkers = markers.filter(m => !!m.video)
    }
    setMarkersList(filteredMarkers)
  }

  const setIcon = (marker) => {
    setSelectedMarker(marker)
  }

  useEffect(() => {
    if (!map) return
    map.fitBounds(groupRef.current.getBounds())
  }, [map])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{height: "100vh", width: "100wh"}}
      className={styles.map}
      zoomControl={false}
      whenReady={(map) => {setMap(map.target)}}
      >
      <div className="leaflet-top leaflet-left">
        <div className="leaflet-control">
          <Menu/>
        </div>
        <div className={`leaflet-control ${styles.control}`}>
          <FilterControl handleFilterChange={filterByHasVideo}/>
        </div>
      </div>

      <div className="leaflet-top leaflet-right">
        <div className={`leaflet-control ${styles.control}`}>
          <LanguageSelector />
        </div>
      </div>

      <TileLayer
        attribution='ap tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <FeatureGroup ref={groupRef}>
        {markersList.map((marker) => {
          return  (
            <Marker
              key={marker.id}
              position={marker.coordinates}
              icon={getIcon(marker, selectedMarker)}
              eventHandlers={{
                click: () => {onClick(marker); setIcon(marker)}
              }}
              opacity={getOpacity(marker)}>
              <Tooltip
                direction="bottom"
                offset={[0, 10]}
                opacity={1}
                permanent
                className={styles.tooltip}>
                {marker.id}
              </Tooltip>
            </Marker>
          )
        })}
      </FeatureGroup>
    </MapContainer>
  )
}

function getIcon(marker, selectedMarker) {
  let iconFile = icon
  let iconSize = [40, 40]
  let className = styles['map-icon']

  switch (marker.brand) {
    case 'velosolutions':
      iconFile = veloIcon
  }

  if (selectedMarker && marker.id === selectedMarker.id) {
    className = styles['map-icon-selected']
    iconSize = [50, 50]
  }

  return L.icon({
    iconUrl: iconFile.src,
    iconSize: iconSize,
    className: className
  })
}


function getOpacity(marker) {
  let opacity = 1
  if (marker.status === 'construction') {
    opacity = 0.6
  }

  return opacity
}
export default Map
