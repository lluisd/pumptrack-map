import fsPromises  from 'fs/promises'
import path from 'path'

export async function getSortedSpotsData() {
  let spots = []
  const url = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_DATA}/spots.json`
  if (process.env.NODE_ENV === 'development'){
    const spotsFile = path.join(process.cwd(), 'public', process.env.NEXT_PUBLIC_CDN_ROOT_DIR, process.env.NEXT_PUBLIC_DATA, 'spots.json')
    const rawdata  = await fsPromises.readFile(spotsFile, 'utf8')
    spots = JSON.parse(rawdata)
  } else {
    const res = await fetch(url)
    spots = await res.json()
  }

  return {
    spots
  }
}
