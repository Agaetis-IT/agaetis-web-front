const routes = (module.exports = require('next-routes')())

routes
  .add('ideas', '/ideas')
  .add('agaetis', '/agaetis')
  .add('post', '/:slug', 'idea')
