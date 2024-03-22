import express from 'express'
import { requireAuth,requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/log.middleware.js'

import { addMsg, getMsgs, deleteMsg } from './msg.controller.js'
const router = express.Router()

router.get('/', getMsgs)
router.post('/', log, requireAuth, addMsg)
router.delete('/:id', requireAdmin, deleteMsg)

export const msgRoutes = router