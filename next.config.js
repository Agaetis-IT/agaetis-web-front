const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withPurgeCSS = require('next-purgecss')
const withImages = require('next-images')

module.exports = withCSS(withTypescript(withPurgeCSS(withImages())))
