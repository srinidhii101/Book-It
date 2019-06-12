const withCSS = require('@zeit/next-css')
// next.config.js
module.exports = {
  target: 'serverless'
},
module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
})
