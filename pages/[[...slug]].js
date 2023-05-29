import React, { useState, useDebugValue, useEffect } from 'react'
import { getSortedSpotsData } from '../lib/spots'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'
import { SpotCard } from '../components/SpotCard'
import Box from '@mui/material/Box'
import styles from "../styles/Home.module.css"
import Fade from '@mui/material/Fade'
import { getImagePlaceholders } from '../lib/placeholders'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

let fadingSpotTimeout = undefined

function MapPage({ allSpotsData, blurImages }) {
  const router = useRouter()
  const slug = router.query.slug || []
  const center = [41.979401, 2.821426]
  const mapZoom = 10
  const bounds = [[42.27917879724292, 2.254910573201578],[41.62981728626594, 3.2354221997777097]]
  const [pumptrack, setPumptrack] = useState(null)
  const [markerSelected, setMarkerSelected] = useState(false)

  useEffect(() => {
    if (slug.length === 1) {
      const pumptrackIdFromQuery = slug[0]
      const requestedSpot = allSpotsData.spots.find(spot => spot.id === pumptrackIdFromQuery)
      if (requestedSpot) {
        handleSelectedPumptrack(requestedSpot)
      }
    }
  }, [])

  const handleSelectedPumptrack = (selectedPumptrack) => {
    router.push(`/${selectedPumptrack.id}`, `/${selectedPumptrack.id}`, { shallow: true })
    setMarkerSelected(true)
    if (typeof fadingSpotTimeout === 'number') {
      clearTimeout(fadingSpotTimeout)
    }
    setPumptrack(selectedPumptrack)
  }

  const modalHandleClose = () => {
    setMarkerSelected(false)
    fadingSpotTimeout = setTimeout(() => {
      fadingSpotTimeout = undefined
      setPumptrack(null)
    }, 0)
  }

  return (
    <>
      <Head>
        {pumptrack && <title>{pumptrack.name} | Pumptracks Girona</title>}
        {!pumptrack && <title>Pumptracks Girona</title>}
        <meta name="description" content="Mapa de los pumptracks de la provincia de Girona con fotos y videos en primera persona" key="desc" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      <Layout>
        <Map center={center} zoom={mapZoom} markers={allSpotsData.spots.filter(s => s.province === 'girona')} maxBounds={bounds} onClick={handleSelectedPumptrack} />
        <Fade in={markerSelected} timeout={{appear: 1000, enter: 1000, exit: 0}} >
          <Box className={styles.contentbox} >
            {pumptrack && <SpotCard spot={pumptrack} blurImages={blurImages} handlerOnClose={modalHandleClose}/>}
          </Box>
        </Fade>
      </Layout>
    </>
  )
}

export async function getStaticProps(params) {
  const isHomePage = !!!params.slug

  if (isHomePage) {
    const allSpotsData = await getSortedSpotsData()
    const blurImages = await getImagePlaceholders(allSpotsData)

    return {
      props: {
        allSpotsData,
        blurImages,
        ...(await serverSideTranslations(params.locale, [
          'common',
        ])),
      }
    }
  }
}

export async function getStaticPaths() {
  const allSpotsData = await getSortedSpotsData()

  const paths = allSpotsData.spots.flatMap((spot) => ([
    { params: { slug: [spot.id] }},
    { params: { slug: [spot.id] }, locale: 'en' }
  ]))


  return {
    paths: paths.concat({ params: { slug: false }}),
    fallback: 'blocking'
  }
}

export default MapPage
