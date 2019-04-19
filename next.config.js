const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withPurgeCSS = require('next-purgecss')
module.exports = withCSS(withTypescript(withPurgeCSS()))
