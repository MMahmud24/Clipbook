import headphonesSvg from './headphones.svg'
import smartphoneSvg from './smartphone.svg'
import routerSvg from './router.svg'
import smartSpeakerSvg from './smart_speaker.svg'
import genericDeviceSvg from './generic_device.svg'

export const assetMap: Record<string, string> = {
  headphones_svg: headphonesSvg,
  smartphone_svg: smartphoneSvg,
  router_svg: routerSvg,
  smart_speaker_svg: smartSpeakerSvg,
  generic_device: genericDeviceSvg,
}

export function getAsset(key: string): string {
  return assetMap[key] ?? assetMap['generic_device']
}
