import { z } from 'zod';

const SceneSchema = z.object({
    scene_id:           z.number().int().positive(),
    duration_seconds:   z.number().int().min(3).max(30),
    description:        z.string().max(200),
    animation_type:     z.enum(['highlight_pulse', 'arrow_point', 'slide_in_label', 'progress_bar', 
        'zoom_in', 'button_press', 'connection_line', 'checkmark']),
    target_object:      z.string().max(80),
    label_text:         z.string().max(40),
    background_asset:   z.string().max(80),
})

export const ScriptSchema = z.object({
    title:              z.string().max(80),
    product_category:   z.string(),
    duration_seconds:   z.number().int().min(10).max(120),
    narration:          z.string().min(20),
    scenes:             z.array(SceneSchema).min(1).max(12),
}).refine(
    s => s.scenes.reduce((sum, sc) => sum + sc.duration_seconds, 0) === s.duration_seconds,
    { message: 'Sum of scene durations must equal duration_seconds' }
)


