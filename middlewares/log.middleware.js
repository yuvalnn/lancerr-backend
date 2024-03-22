import { loggerService } from "../services/logger.service.js"

export function log(req, res, next) {
	var { bugId } = req.params
	loggerService.info(`The following bug was deleted: ${bugId}`)

	// res.json('Hi')
	next()
}