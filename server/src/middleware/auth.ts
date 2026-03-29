import { Request, Response, NextFunction } from 'express'
import { supabase } from '../lib/supabase'

export interface AuthenticatedRequest extends Request {
  userId: string
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing authorization token' })
    return
  }

  const token = authHeader.slice(7)
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    res.status(401).json({ error: 'Invalid or expired token' })
    return
  }

  (req as AuthenticatedRequest).userId = data.user.id
  next()
}
