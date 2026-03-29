import { Router, Request, Response } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { uploadToR2 } from '../lib/r2'
import { supabase } from '../lib/supabase'
import { runJob } from '../orchestrator'
import { requireAuth, AuthenticatedRequest } from '../middleware/auth'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
})

// POST /api/jobs — accept image, compress, upload to R2, create job
router.post('/', requireAuth, upload.single('image'), async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId

  // Validate file present
  if (!req.file) {
    res.status(400).json({ error: 'No image provided' })
    return
  }

  // Validate MIME type
  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(req.file.mimetype)) {
    res.status(400).json({ error: 'Invalid file type. Only JPEG and PNG are accepted.' })
    return
  }

  const manualContext = typeof req.body.manual_context === 'string' ? req.body.manual_context : ''
  const jobId = uuidv4()

  // Compress with Sharp
  const compressed = await sharp(req.file.buffer)
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toBuffer()

  // Upload to R2
  const key = `jobs/${jobId}/input.jpg`
  const inputImageUrl = await uploadToR2(key, compressed, 'image/jpeg')

  // Insert job row
  const { error } = await supabase.from('jobs').insert({
    id: jobId,
    user_id: userId,
    status: 'pending',
    input_image_url: inputImageUrl,
    manual_context: manualContext || null,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    res.status(500).json({ error: 'Failed to create job' })
    return
  }

  // Return job ID immediately
  res.status(202).json({ jobId })

  // Run pipeline fire-and-forget
  runJob(jobId, inputImageUrl, manualContext)
})

// GET /api/jobs/:id — poll job status (public — job IDs are unguessable UUIDs)
router.get('/:id', async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error || !data) {
    res.status(404).json({ error: 'Job not found' })
    return
  }

  res.json(data)
})

export default router
