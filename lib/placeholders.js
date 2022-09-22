import { getPlaiceholder } from 'plaiceholder'

export async function getImagePlaceholders(spots) {
  const imgLocation = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${process.env.NEXT_PUBLIC_CDN_ROOT_DIR}/${process.env.NEXT_PUBLIC_IMAGES}`
  return await Promise.all(
    spots.spots.map(async (spot) => {
      const {
        base64
      } = await getPlaiceholder(`${imgLocation}/${spot.id}.jpg`);

      return {
        id: spot.id,
        alt: spot.name,
        title: "Photo from Unsplash",
        blurDataURL: base64,
      };
    })
  ).then((values) => values)
}
