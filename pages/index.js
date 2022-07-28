import React, { useState } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'

function MapPage({ allSpotsData }) {
  const [center, setCenter] = useState([41.979401, 2.821426]);
  const [mapZoom, setMapZoom] = useState(9);
  const [bounds, setBounds] = useState([[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]);

  return (
    <Layout>
      <Map center={center} zoom={mapZoom} markers={allSpotsData.spots} maxBounds={bounds} />
    </Layout>
  )
}

export async function getStaticProps() {
  const allSpotsData = getSortedSpotsData()
  return {
    props: {
      allSpotsData
    }
  }
}

export default MapPage
