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

const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(
  process.env.NEXT_APP_GMAIL_CLIENT_ID,
  process.env.NEXT_APP_GMAIL_CLIENT_SECRET,
  'http://localhost:3000/'
)

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.profile',
]

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

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
      oAuth2Client.setCredentials({
        refresh_token: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
      })

      const accessToken = oAuth2Client.getAccessToken()
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.NEXT_APP_MAIL_ADDRESS,
          clientId: process.env.NEXT_APP_GMAIL_CLIENT_ID,
          clientSecret: process.env.NEXT_APP_GMAIL_CLIENT_SECRET,
          refreshToken: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
          accessToken: accessToken,
          expires: Date.now() + 3600,
        },
      })

      const message = {
        from: process.env.NEXT_APP_MAIL_ADDRESS,
        to: process.env.NEXT_APP_MAIL_ADDRESS,
        subject: req.body.object,
        html: req.body.content,
      }
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (
        regEx.test(message.from) &&
        regEx.test(message.to) &&
        ['Un projet ?', 'Une candidature ?', 'Un cafe ?'].includes(message.subject) &&
        message.html.length > 0
      ) {
        transporter.sendMail(message, function(err, info) {
          if (err) {
            res.status(500)
            res.send()
          } else {
            res.status(200)
            res.send()
          }
        })
      } else {
        res.status(400)
        res.send()
      }
    })

    server.post('/send/white-paper', (req, res) => {
      oAuth2Client.setCredentials({
        refresh_token: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
      })

      const accessToken = oAuth2Client.getAccessToken()
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.NEXT_APP_MAIL_ADDRESS,
          clientId: process.env.NEXT_APP_GMAIL_CLIENT_ID,
          clientSecret: process.env.NEXT_APP_GMAIL_CLIENT_SECRET,
          refreshToken: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
          accessToken: accessToken,
          expires: Date.now() + 3600,
        },
      })
      const message = {
        from: process.env.NEXT_APP_MAIL_ADDRESS,
        to: req.body.mail,
        subject: req.body.object,
        html: req.body.content,
        attachments: [
          {
            filename: req.body.file.split('/').slice(-1)[0],
            path: req.body.file,
          },
        ],
      }

      const base_url = req.body.file
        .split('/')
        .slice(0, 3)
        .join('/')

      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (
        regEx.test(message.from) &&
        regEx.test(message.to) &&
        message.html.length > 0 &&
        message.attachments[0].filename &&
        message.attachments[0].path &&
        base_url === process.env.NEXT_APP_BASE_URL
      ) {
        transporter.sendMail(message, function(err, info) {
          if (err) {
            res.status(500)
            res.send()
          } else {
            res.status(200)
            res.send()
          }
        })
      } else {
        res.status(400)
        res.send()
      }
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
