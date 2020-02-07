const express = require('express')
const next = require('next')
const axios = require('axios')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app
  .prepare()
  .then(() => {
    const server = express()

    /*
      /:slug : existing ideas url are /:postname, we have to respect this pattern 
    */

    server.get('/robots.txt', (req, res) => {
      res.sendFile(path.join(__dirname, '/', 'robots.txt'))
    })

    server.get('/:slug', (req, res) => {
      const queryParams = Object.assign({}, req.params, req.query)
      if (
        [
          'solutions',
          'ideas',
          'agaetis',
          'jobs',
          'white-papers',
          'contact',
          'cookies',
          'personal-data',
          'sitemap.xml',
        ].includes(queryParams.slug)
      ) {
        return handle(req, res)
      }

      app.render(req, res, '/idea', { ...req.params, ...req.query })
    })

    server.get('/jobs/:slug', (req, res) => {
      app.render(req, res, '/job', { ...req.params, ...req.query })
    })

    server.get('/white-papers/:slug', (req, res) => {
      app.render(req, res, '/white-paper', { ...req.params, ...req.query })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
