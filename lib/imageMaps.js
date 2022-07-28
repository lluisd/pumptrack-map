import fs from 'fs'
import path from 'path'

const spotsDirectory = path.join(process.cwd(), 'spots')

export function getImageMaps() {
  const rawdata  = fs.readFileSync(spotsDirectory + '/image_maps.json', 'utf8')
  let data = JSON.parse(rawdata)
  return {
    data
  }
}
