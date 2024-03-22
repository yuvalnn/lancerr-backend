import { loggerService } from '../../services/logger.service.js'
import { userService } from '../user/user.service.js'
import { bugService } from '../bug/bug.service.js'
import { authService } from '../auth/auth.service.js'
import { msgService } from './msg.service.js'

export async function getMsgs(req, res) {
    try {        
        console.log('yo', req.query)
        const msgs = await msgService.query(req.query)
        res.send(msgs)
    } catch (err) {
        loggerService.error('Cannot get msgs', err)
        res.status(400).send({ err: 'Failed to get msgs' })
    }
}

export async function deleteMsg(req, res) {
    try {
        const deletedCount = await msgService.remove(req.params.id, req.loggedinUser)
        res.send({ msg: 'Deleted successfully', deletedCount })
    } catch (err) {
        loggerService.error('Failed to delete msg', err)
        res.status(400).send({ err })
    }
}


export async function addMsg(req, res) {

    var { loggedinUser } = req

    try {
        var msg = req.body
        msg.byUserId = loggedinUser._id
        msg = await msgService.add(msg)

        // ** */ prepare the updated msg for sending out**
        console.log(msg)
        msg.aboutBug = await bugService.getById(msg.aboutBugId)
        msg.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete msg.aboutBugId
        delete msg.byUserId
        delete msg.aboutBug.creator
        delete msg.aboutBug.description
        delete msg.aboutBug.lables
        delete msg.aboutBug.createdAt

        delete msg.byUser.imgUrl
        delete msg.byUser.score

        res.send(msg)

    } catch (err) {
        loggerService.error('Failed to add msg', err)
        res.status(400).send({ err: 'Failed to add msg' })
    }
}