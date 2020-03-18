// tslint:disable: no-var-requires
const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
const { google } = require('googleapis')
const sha = require('js-sha256')
const next = require('next')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()
const port = process.env.PORT || 80
const sha256 = sha.sha256

const oAuth2Client = new google.auth.OAuth2(
  process.env.NEXT_APP_GMAIL_CLIENT_ID,
  process.env.NEXT_APP_GMAIL_CLIENT_SECRET,
  'http://localhost:3000/'
)

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const verifyCaptcha = async (token: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${
    process.env.NEXT_APP_RECAPTCHA_SECRET
  }&response=${token}`
  const { data } = await axios.get(url)
  return data.success
}

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    // tslint:disable-next-line: variable-name
    server.get('/robots.txt', (_req: any, res: any) => {
      res.sendFile(path.join(__dirname, '/', 'robots.txt'))
    })

    // tslint:disable-next-line: variable-name
    server.get('/favicon.ico', (_req: any, res: any) => {
      res.sendFile(path.join(__dirname, '/', 'symbole-agaetis-p164-rgb.png'))
    })

    // tslint:disable-next-line: variable-name
    server.get('/google80ae36db41235209.html', (_req: any, res: any) => {
      res.sendFile(path.join(__dirname, '/', 'google80ae36db41235209.html'))
    })

    server.get(/sitemap[a-zA-Z-0-9\/\-_]*.xml/, async (req: any, res: any) => {
      const { data } = await axios.get(`${process.env.NEXT_APP_BASE_URL}${req.url}`)
      res.set('Content-Type', 'text/xml')
      res.send(data.replace(new RegExp(process.env.NEXT_APP_BASE_URL!, 'g'), process.env.NEXT_APP_SITE_URL))
    })

    /*
      /:slug : existing ideas url are /:postname, we have to respect this pattern 
    */
    server.get('/:slug', (req: any, res: any) => {
      const queryParams = { ...req.params, ...req.query }
      if (
        ['solutions', 'ideas', 'agaetis', 'jobs', 'white-papers', 'contact', 'cookies', 'personal-data'].includes(
          queryParams.slug
        )
      ) {
        return handle(req, res)
      }

      return app.render(req, res, '/idea', { ...req.params, ...req.query })
    })

    server.get('/jobs/:slug', (req: any, res: any) => {
      app.render(req, res, '/job', { ...req.params, ...req.query })
    })

    server.get('/white-papers/:slug', (req: any, res: any) => {
      app.render(req, res, '/white-paper', { ...req.params, ...req.query })
    })

    server.post('/send', async (req: any, res: any) => {
      oAuth2Client.setCredentials({
        refresh_token: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
      })

      const accessToken = oAuth2Client.getAccessToken()
      /* eslint:disable */

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: String(process.env.NEXT_APP_MAIL_ADDRESS),
          clientId: String(process.env.NEXT_APP_GMAIL_CLIENT_ID),
          clientSecret: String(process.env.NEXT_APP_GMAIL_CLIENT_SECRET),
          refreshToken: String(process.env.NEXT_APP_GMAIL_REFRESH_TOKEN),
          accessToken: String(accessToken),
          expires: Date.now() + 3600,
        },
      })
      /* eslint:enable */

      const message = {
        from: process.env.NEXT_APP_MAIL_ADDRESS,
        to: process.env.NEXT_APP_MAIL_ADDRESS,
        subject: req.body.object,
        html: req.body.content,
      }

      const key = Buffer.from(
        req.body.name +
          req.body.object +
          process.env.NEXT_APP_CONTACT_SALT +
          req.body.mail +
          req.body.content +
          req.body.date +
          req.body.token,
        'base64'
      )

      if (
        req.body.hash === sha256(key) &&
        verifyCaptcha(req.body.token) &&
        mailRegex.test(message.from!) &&
        mailRegex.test(message.to!) &&
        ['Un projet ?', 'Une candidature ?', 'Un cafe ?'].includes(message.subject) &&
        message.html.length > 0
      ) {
        transporter.sendMail(message, (err: any) => {
          if (err) {
            res.status(500).send()
          } else {
            res.status(200).send()
          }
        })
      } else {
        res.status(400).send()
      }
    })

    server.post('/send/white-paper', (req: any, res: any) => {
      oAuth2Client.setCredentials({
        refresh_token: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
      })

      const captcha = verifyCaptcha(req.body.token)

      const accessToken = oAuth2Client.getAccessToken()

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: String(process.env.NEXT_APP_MAIL_ADDRESS),
          clientId: String(process.env.NEXT_APP_GMAIL_CLIENT_ID),
          clientSecret: String(process.env.NEXT_APP_GMAIL_CLIENT_SECRET),
          refreshToken: String(process.env.NEXT_APP_GMAIL_REFRESH_TOKEN),
          accessToken: String(accessToken),
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

      const key = Buffer.from(
        req.body.name +
          req.body.object +
          process.env.NEXT_APP_CONTACT_SALT +
          req.body.mail +
          req.body.content +
          req.body.file +
          req.body.date +
          req.body.token,
        'base64'
      )

      const baseUrl = req.body.file
        .split('/')
        .slice(0, 3)
        .join('/')

      if (
        req.body.hash === sha256(key) &&
        captcha &&
        mailRegex.test(message.from!) &&
        mailRegex.test(message.to) &&
        message.html.length > 0 &&
        message.attachments[0].filename &&
        message.attachments[0].path &&
        baseUrl === process.env.NEXT_APP_BASE_URL
      ) {
        transporter.sendMail(message, (err: any) => {
          if (err) {
            res.status(500).send()
          } else {
            res.status(200).send()
          }
        })
      } else {
        res.status(400).send()
      }
    })

    server.get('*', (req: any, res: any) => {
      return handle(req, res)
    })

    /*server.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log('> Ready on http://localhost:' + port)
    })*/

    http.createServer(server).listen(80)

    https
      .createServer(
        {
          key: fs.readFileSync('./key.pem'),
          cert: fs.readFileSync('./cert.pem'),
          passphrase: process.env.NEXT_APP_SSL_PASSPHRASE,
        },
        server
      )
      .listen(443)
  })
  .catch((ex: any) => {
    // tslint:disable-next-line: no-console
    console.error(ex.stack)
    process.exit(1)
  })
