import fs from 'fs'
import path from 'path'

const spotsDirectory = path.join(process.cwd(), 'spots')

export function getSortedSpotsData() {
  const rawdata  = fs.readFileSync(spotsDirectory + '/spots.json', 'utf8')
  let spots = JSON.parse(rawdata)
  return {
    spots
  }
}
