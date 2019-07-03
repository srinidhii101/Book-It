const withCSS = require('@zeit/next-css')
require('dotenv').config()
const webpack = require('webpack')

// next.config.js
module.exports = {
  target: 'serverless'
},
module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
})
