const https = require('https')
const app = require('../app')
const fs = require('fs')
const PORT = process.env.SECURE_PORT || 443

const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/visual-novel-api.crowfx.xyz/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/visual-novel-api.crowfx.xyz/privkey.pem')
}

const server = https.createServer(options, app)

server.listen(PORT, () => console.log('HTTPS server running on port ' + PORT))