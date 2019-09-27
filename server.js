const express = require('express')
const next = require('next')
const axios = require('axios')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/:slug', (req, res) => {
      const queryParams = Object.assign({}, req.params, req.query)
      if (['solutions', 'ideas', 'agaetis', 'jobs', 'job', 'white-paper', 'contact'].includes(queryParams.slug))
        return handle(req, res)

      app.render(req, res, '/idea', queryParams)
    })

    server.get('/jobs/:slug', (req, res) => {
      const queryParams = Object.assign({}, req.params, req.query)
      app.render(req, res, '/job', queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
