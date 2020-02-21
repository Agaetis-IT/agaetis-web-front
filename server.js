const express = require('express')
const next = require('next')
const axios = require('axios')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6a0158862f5fa3',
    pass: 'b588a2aea7450f',
  },
})

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
    /*
      /:slug : existing ideas url are /:postname, we have to respect this pattern 
    */

    server.get('/robots.txt', (req, res) => {
      res.sendFile(path.join(__dirname, '/', 'robots.txt'))
    })

    server.get('/favicon.ico', (req, res) => {
      res.sendFile(path.join(__dirname, '/', 'symbole-agaetis-p164-rgb.png'))
    })

    server.get('/google80ae36db41235209.html', (req, res) => {
      res.sendFile(path.join(__dirname, '/', 'google80ae36db41235209.html'))
    })

    server.get(/sitemap[a-zA-Z-0-9\/\-_]*.xml/, async (req, res) => {
      const { data } = await axios.get(`${process.env.NEXT_APP_BASE_URL}${req.url}`)
      res.set('Content-Type', 'text/xml')
      res.send(data.replace(new RegExp(process.env.NEXT_APP_BASE_URL, 'g'), process.env.NEXT_APP_SITE_URL))
    })

    server.get('/:slug', (req, res) => {
      const queryParams = Object.assign({}, req.params, req.query)
      if (
        ['solutions', 'ideas', 'agaetis', 'jobs', 'white-papers', 'contact', 'cookies', 'personal-data'].includes(
          queryParams.slug
        )
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

    server.post('/send', (req, res) => {
      const message = {
        from: req.body.mail,
        to: 'benoit.munoz@agaetis.fr',
        subject: 'Un projet ?',
        content: escape(req.body.content),
      }

      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          message.from
        ) &&
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          message.to
        ) &&
        ['Un projet ?', 'Une candidature ?', 'Un cafe ?'].includes(message.subject) &&
        message.content.length > 0
      )
        transport.sendMail(message, function(err, info) {
          if (err) {
            console.log(err)
          } else {
            console.log(info)
          }
        })
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
