# agaetis-web-front

The front-end of the Agaetis website.

## Table of contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Technologies

Project created with:

- React 17
- NextJS 10.2
- Typescript 4.2.4
- TailwindCSS 2.1

## Installation

We use the package manager [yarn](https://yarnpkg.com/lang/en/docs/install/)

```bash
git clone https://github.com/Agaetis-IT/agaetis-web-front
cd agaetis-web-front
yarn install
```

## Usage

```bash
yarn dev
```

Then visit http://localhost:5000

You need an accessible Wordpress for the website to work, whose url needs to be added in a `.env` file (on root directory) with `NEXT_PUBLIC_BASE_URL`.

You can find below an example of `.env` file:

```
NEXT_PUBLIC_BASE_URL=<URL to Wordpress>
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:5000
NEXT_MAIL_ADDRESS=<Mail address for the website>
NEXT_MAIL_DEST=<Mail to send contact mails to>
NEXT_GMAIL_CLIENT_ID=<GMail client ID>
NEXT_GMAIL_CLIENT_SECRET=<GMail client secret key>
NEXT_GMAIL_REFRESH_TOKEN=<GMail client refresh token>
NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY=<Analytics key>
NEXT_PUBLIC_RECAPTCHA_KEY=<ReCaptcha key>
NEXT_RECAPTCHA_SECRET=<ReCaptcha secret key>
NEXT_PUBLIC_CONTACT_SALT=<Contact salt key>
```

You'll find this example in `.env-sample`.

## Change Mail settings

To follow the steps below, you have to create a gmail account (or have one already)

1. Visit https://console.developers.google.com/
2. Create a new project by clicking "Select a project" and "New Project"
3. Edit Project's name and create
4. Go to "Credentials" (Identifiants)
5. Create Credentials by clicking the button on top and select ID Client OAuth
6. Choose Web App as Application type
7. Add site url and https://developers.google.com/oauthplayground as authorized redirect URI
8. A Modal should appear then copy Client ID and Client Secret and paste them in the .env NEXT_GMAIL_CLIENT_ID & NEXT_GMAIL_CLIENT_SECRET
9. Visit https://developers.google.com/oauthplayground
10. Change the settings by clicking the setting button ont top right
11. Check "use your own OAuth credentials and provide your clientID and clientSecret
12. In the Step1 list find Gmail API v1 and select https://mail.google.com, gmail.insert, readonly and send
13. Click 'Authorize API'
14. Go to Step 2 and exchange authorization code for tokens
15. Copy Refresh Token and paste it in the .env NEXT_GMAIL_REFRESH_TOKEN veriable
16. Add your email address to the .env NEXT_MAIL_ADDRESS

It should be correctly working, if not clap your hands and i'll try to solve the problem and update the README.

## Change Captcha settings

To create reCAPTCHA keys, you need a google Account

1. Visit https://www.google.com/recaptcha/admin/create
2. Add a project name
3. Choose the reCAPTCHA version 2
4. As the domain, use your site base url (without http and /), if you are running the site in local, add 127.0.0.1
5. Add the mail of the admin
6. Accept the terms of use and click send
7. Copy the public key in .env as NEXT_PUBLIC_RECAPTCHA_KEY

Now, you should be able to access statistics about your captcha in this same page
