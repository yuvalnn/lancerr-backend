import http from 'http'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { loggerService } from './services/logger.service.js'

const app = express()
const server = http.createServer(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
 const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true
    
}
app.use(cors(corsOptions))
}


// app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// Routes
import { gigRoutes } from './api/gig/gig.routes.js'
import { orderRoutes } from './api/order/order.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { setupSocketAPI } from './services/socket.service.js'


app.use('/api/gig', gigRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

setupSocketAPI(server)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 3031
server.listen(PORT, () => {
    loggerService.info('Up and running on port', PORT)
})