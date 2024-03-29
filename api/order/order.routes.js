import express from 'express'
import { requireAuth,requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/log.middleware.js'

import { addOrder, getOrders, deleteOrder } from './order.controller.js'
const router = express.Router()

router.get('/', requireAuth, getOrders)
router.post('/', log, requireAuth, addOrder)
router.delete('/:id', requireAdmin, deleteOrder)

export const orderRoutes = router