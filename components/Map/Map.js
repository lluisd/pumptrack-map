import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import React from 'react'
import L from 'leaflet'
import { v4 as uuidv4 } from 'uuid'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { Menu } from '../Menu/index'
import FilterControl from '../Controls/FilterControl/FilterControl'
import { Fab } from '@mui/material'

const Map = ({center, zoom, markers, maxBounds, onClick}) => {
  const [markersList, setMarkersList] = React.useState(markers)

  const filterByBrand = (brand) => {
    let filteredMarkers = markers
    if (brand != 'all') {
      filteredMarkers = markers.filter(m => m.company === brand)
    }
    setMarkersList(filteredMarkers)
  }

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{height: "100vh", width: "100wh"}} minZoom={9} maxBounds={maxBounds}
    className={styles.map} zoomControl={false}>
      <div className="leaflet-top leaflet-left">
        <div className="leaflet-control">
          <Menu/>
        </div>
        <div className={`leaflet-control ${styles.control}`}>
          <FilterControl handleFilterChange={filterByBrand}/>
        </div>
      </div>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGx1aXNkIiwiYSI6ImNranVsYnl3dDAwMWsybmxqdnV0aW1hbGwifQ.4uRoLJFUR6nnFLng4hLkWQ"
      />
      <ZoomControl position="bottomright" />
      {markersList.map((marker) => {
        return  (
          <Marker key={uuidv4()} position={marker.coordinates} icon={getIcon(marker)}
                  eventHandlers={{
                    click: () => onClick(marker)
                  }}>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

function filterByBrand (brand) {

}

function getIcon(marker) {
  let iconFile = 'icon.svg'
  switch (marker.company) {
    case 'velosolutions':
      iconFile = 'icon-velo.svg'
  }

  return L.icon({
    iconUrl: `/images/${iconFile}`,
    iconSize: [40, 40],
    className: styles['map-icon']
  })
}

export default Map
