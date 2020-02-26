# agaetis-web-front

The front-end of the Agaetis website.

## Table of contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Technologies

Project created with:

- React: 16.8.6
- NextJS: 8.1.0
- Typescript: 3.4.3
- TailwindCSS: 0.7.4

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

Then visit http://localhost:3000

## Change Mail settings

To follow the steps below, you have to create a gmail account (or have one already)

1. Visit https://console.developers.google.com/
2. Create a new project by clicking "Select a project" and "New Project"
3. Edit Project's name and create
4. Go to "Credentials" (Identifiants)
5. Create Credentials by clicking the button on top and select ID Client OAuth
6. Choose Web App as Application type
7. Add site url and https://developers.google.com/oauthplayground as authorized redirect URI
8. A Modal should appear then copy Client ID and Client Secret and paste them in the .env NEXT_APP_GMAIL_CLIENT_ID & NEXT_APP_GMAIL_CLIENT_SECRET
9. Visit https://developers.google.com/oauthplayground
10. Change the settings by clicking the setting button ont top right
11. Check "use your own OAuth credentials and provide your clientID and clientSecret
12. In the Step1 list find Gmail API v1 and select https://mail.google.com, gmail.insert, readonly and send
13. Click 'Authorize API'
14. Go to Step 2 and exchange authorization code for tokens
15. Copy Refresh Token and paste it in the .env NEXT_APP_GMAIL_REFRESH_TOKEN veriable
16. Add your email address to the .env NEXT_APP_MAIL_ADDRESS

It should be correctly working, if not clap your hands and i'll try to solve the problem and update the README.
