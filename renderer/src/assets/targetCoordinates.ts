/**
 * Maps background_asset + target_object → { x, y } as canvas percentages (0–100).
 *
 * Geometry derivation:
 *   All SVGs render with objectFit:contain inside a 1280×720 canvas.
 *   Each SVG is height-constrained (canvas aspect 1.778 > all svg aspects).
 *   canvas_x = offset_x + svgX * scale   →   x% = canvas_x / 1280 * 100
 *   canvas_y = svgY * scale              →   y% = canvas_y / 720  * 100
 *
 *   headphones   (500×420): scale=1.714, offset_x=211.4
 *   smartphone   (400×500): scale=1.44,  offset_x=352
 *   router       (400×300): scale=2.4,   offset_x=160
 *   smart_speaker(400×400): scale=1.8,   offset_x=280
 *   generic_device(500×500):scale=1.44,  offset_x=280
 */

export interface Coord {
  x: number  // 0–100, percent of canvas width
  y: number  // 0–100, percent of canvas height
}

type AssetMap = Record<string, Coord>

export const targetCoordinates: Record<string, AssetMap> = {
  headphones_svg: {
    ear_cup_left:   { x: 28.3, y: 71.4 },
    ear_cup_right:  { x: 71.7, y: 71.4 },
    power_button:   { x: 21.6, y: 69.0 },
    volume_wheel:   { x: 78.4, y: 69.0 },
    charging_port:  { x: 28.3, y: 87.1 },
  },

  smartphone_svg: {
    screen:         { x: 50.0, y: 50.0 },
    power_button:   { x: 60.6, y: 40.0 },
    volume_up:      { x: 39.4, y: 36.2 },
    volume_down:    { x: 39.4, y: 48.2 },
    home_button:    { x: 50.0, y: 91.0 },
    bluetooth_icon: { x: 42.7, y: 20.2 },
    charging_port:  { x: 50.0, y: 94.6 },
    front_camera:   { x: 52.8, y: 15.0 },
  },

  router_svg: {
    power_button:    { x: 30.3, y: 54.3 },
    wifi_led:        { x: 41.6, y: 56.7 },
    ethernet_ports:  { x: 57.2, y: 53.3 },
    reset_button:    { x: 69.7, y: 54.3 },
    power_port:      { x: 73.4, y: 54.3 },
  },

  smart_speaker_svg: {
    top_button:   { x: 50.0, y: 38.0 },
    status_ring:  { x: 50.0, y: 38.8 },
    power_port:   { x: 50.0, y: 84.3 },
  },

  generic_device: {
    power_button:     { x: 64.2, y: 26.0 },
    screen:           { x: 50.0, y: 34.0 },
    led:              { x: 61.8, y: 20.0 },
    volume_up:        { x: 32.5, y: 31.6 },
    volume_down:      { x: 32.5, y: 41.6 },
    reset_button:     { x: 32.5, y: 50.8 },
    primary_button:   { x: 44.4, y: 64.0 },
    secondary_button: { x: 52.3, y: 64.0 },
    tertiary_button:  { x: 59.0, y: 64.0 },
    charging_port:    { x: 50.0, y: 84.8 },
    port:             { x: 38.5, y: 85.0 },
    slot:             { x: 61.5, y: 85.0 },
  },
}

/** Returns the canvas coordinate for a given asset + target, defaulting to center. */
export function getCoord(backgroundAsset: string, targetObject: string): Coord {
  return targetCoordinates[backgroundAsset]?.[targetObject] ?? { x: 50, y: 50 }
}
