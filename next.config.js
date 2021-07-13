module.exports = {
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr'
  },
  async redirects() {
    return [
      {
        source: '/ideas',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: 'https://agaetis.welcomekit.co/',
        permanent: true,
      },
      {
        source: '/(\\d{4})/(\\d{2})/(\\d{2})/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/jobs/:slug',
        destination: 'https://agaetis.welcomekit.co/',
        permanent: true,
      },
      {
        source: '/landingpages/:slug',
        destination: '/landingpage/:slug',
        permanent: true,
      },
      {
        source: '/white-papers/:slug',
        destination: '/white-paper/:slug',
        permanent: true,
      },
      {
        source: '/tags/:slug',
        destination: '/blog/tag/:slug',
        permanent: true,
      },
      {
        source: '/:slug((?!.*(?:_next|images|icons|ideas|tags|offer|landingpage|white-paper|author|offers|solutions|blog|agaetis|white-papers|contact|jobs|cookies|personal-data|mentions-legales|google80ae36db41235209\.html|robots\.txt|favicon\.ico)).*)',
        destination: '/blogpost/:slug',
        permanent: true,
      },
    ]
  }
}