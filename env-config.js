const { parsed: dotEnvResult } = require('dotenv').config()
module.exports = {
  'process.env.BACKEND_URL': dotEnvResult.BASE_URL,
}
