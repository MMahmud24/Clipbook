export type AnimationType =
  | 'highlight_pulse'
  | 'arrow_point'
  | 'slide_in_label'
  | 'progress_bar'
  | 'zoom_in'
  | 'button_press'
  | 'connection_line'
  | 'checkmark'

export interface ScriptScene {
  scene_id: number
  duration_seconds: number
  description: string
  animation_type: AnimationType
  target_object: string
  label_text: string
  background_asset: string
}

export interface Script {
  title: string
  product_category: string
  duration_seconds: number
  narration: string
  scenes: ScriptScene[]
}
