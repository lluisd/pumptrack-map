import { MapContainer, Marker, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet'
import React from 'react'
import L from 'leaflet'
import { v4 as uuidv4 } from 'uuid'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { Menu } from '../Menu/index'
import FilterControl from '../Controls/FilterControl/FilterControl'

const Map = ({center, zoom, markers, maxBounds, onClick}) => {
  const [markersList, setMarkersList] = React.useState(markers)
  const [selectedMarker, setSelectedMarker] = React.useState(null)

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


  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{height: "100vh", width: "100wh"}} minZoom={9} maxBounds={maxBounds}
    className={styles.map} zoomControl={false}>
      <div className="leaflet-top leaflet-left">
        {/*<div className="leaflet-control">*/}
        {/*  <Menu/>*/}
        {/*</div>*/}
        <div className={`leaflet-control ${styles.control}`}>
          <FilterControl handleFilterChange={filterByHasVideo}/>
        </div>
      </div>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGx1aXNkIiwiYSI6ImNranVsYnl3dDAwMWsybmxqdnV0aW1hbGwifQ.4uRoLJFUR6nnFLng4hLkWQ"
      />
      <ZoomControl position="bottomright" />
      {markersList.map((marker) => {
        return  (
          <Marker key={uuidv4()} position={marker.coordinates} icon={getIcon(marker, selectedMarker)}
                  eventHandlers={{
                    click: () => {onClick(marker); setIcon(marker)}
                  }}>
            <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent className={styles.tooltip}>
              {marker.id}
            </Tooltip>
          </Marker>
        )
      })}

    </MapContainer>
  )
}

function getIcon(marker, selectedMarker) {
  let iconFile = 'icon.svg'
  let iconSize = [40, 40]
  let className = styles['map-icon']

  switch (marker.brand) {
    case 'velosolutions':
      iconFile = 'icon-velo.svg'
  }

  if (selectedMarker && marker.id === selectedMarker.id) {
    className = styles['map-icon-selected']
    iconSize = [50, 50]
  }

  return L.icon({
    iconUrl: `/images/${iconFile}`,
    iconSize: iconSize,
    className: className
  })
}

export default Map
