# Pumptracks map

A pumptrack map where you see check spots to see more information like a 360 view from different parts of the track and
also VR mode to have a live view.

## Configure it
You will need to configure the next environment variables:

```javascript
NEXT_PUBLIC_CDN_BASE_URL //base URL of your CDN
NEXT_PUBLIC_CDN_ROOT_DIR //root folder of your CDN
NEXT_PUBLIC_DATA //folder inside CDN that contains specific pumptracks json files and spots.json
NEXT_PUBLIC_IMAGES //folder inside CDN that contains pumptrack map images
NEXT_PUBLIC_VR_VIDEOS //folder inside CDN that contains 360 pumptrack videos
NEXT_PUBLIC_PANORAMAS //folder inside CDN that contains 360 pumptrack images

```

### Assets/CDN structure

```bash
├── spots (NEXT_PUBLIC_CDN_ROOT_DIR)
│   ├── 360videos (NEXT_PUBLIC_VR_VIDEOS)
│   │   ├── albons.mp4
│   │   ├── ...
│   │   └── cassa.mp4
│   ├── 360images (NEXT_PUBLIC_PANORAMAS)
│   │   ├── 360albons.jpg
│   │   ├── ...
│   │   └── 360cassa.jpg
│   ├── images (NEXT_PUBLIC_IMAGES)
│   │   ├── albons.jpg
│   │   ├── ...
│   │   └── cassa.jpg
│   └── data (NEXT_PUBLIC_DATA)
│       └── spots.json
```

## Assets
Assets used for data, images and 360videos (VR videos) can be found here:
https://github.com/lluisd/pumptrack-map-assets

## Demo
https://pumptracks.311312.xyz/

