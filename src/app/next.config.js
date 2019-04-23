const path = require('path')
const withImages = require('next-images')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = withImages(
  withCss(withSass({
    distDir: '../../dist/functions/next',
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    inlineImageLimit: 1,
    webpack (config) {
      config.module.rules.forEach(rule => {
        if (String(rule.test) === String(/\.scss$/)) {
          rule.use.push({
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, './static/scss/_variables.scss'), path.resolve(__dirname, './static/scss/_mixins.scss')]
            }
          })
        }
      })
      return config
    }
  }))
)

// const path = require('path')
// const withImages = require('next-images')
// const withSass = require('@zeit/next-sass')
// const withCss = require('@zeit/next-css')

// function cssModulesOnSass(nextConfig = {}) {
//   return Object.assign({}, nextConfig, {
//     distDir: '../../dist/functions/next',
//     cssModules: true,
//     cssLoaderOptions: {
//       importLoaders: 1,
//       localIdentName: '[local]___[hash:base64:5]',
//     },
//     inlineImageLimit: 1,
//     webpack (config) {
//       config.module.rules.forEach(rule => {
//         if (String(rule.test) === String(/\.scss$/)) {
//           rule.use.push({
//             loader: 'sass-resources-loader',
//             options: {
//               resources: [path.resolve(__dirname, './static/scss/_variables.scss'), path.resolve(__dirname, './static/scss/_mixins.scss')]
//             }
//           })
//         }
//       })
//       return config
//     }
//   })
// }

// module.exports = withImages(withSass(cssModulesOnSass(withCss())))

// const path = require('path')
// const MergeFilesPlugin = require('merge-files-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const withImages = require('next-images')
// const withSass = require('@zeit/next-sass')
// const withCss = require('@zeit/next-css')
// const extract = new ExtractTextPlugin({ filename: 'static/style.css' })

// function baseConfig(nextConfig = {}) {
//   return Object.assign({}, nextConfig, {
//     distDir: '../../dist/functions/next',
//     cssModules: true,
//     extractCSSPlugin: extract,
//     cssLoaderOptions: {
//       importLoaders: 1,
//       localIdentName: '[local]___[hash:base64:5]',
//     },
//     inlineImageLimit: 1,
//     webpack(config, options) {
//       config.module.rules.forEach(rule => {
//         if (String(rule.test) === String(/\.scss$/)) {
//           rule.use.push({
//             loader: 'sass-resources-loader',
//             options: {
//               resources: [path.resolve(__dirname, './static/scss/_variables.scss'), path.resolve(__dirname, './static/scss/_mixins.scss')]
//             }
//           })
//         }
//       })
//       config.module.rules.push({
//         use: ExtractTextPlugin.extract({
//           use: 'css-loader'
//         }),
//         test: /\.css$/,
//         exclude: /node_modules/
//       })
//       const {isServer, dev} = options;
//       const { 
//           cssModules, 
//           cssLoaderOptions, 
//           postcssLoaderOptions, 
//           sassLoaderOptions = {},
//           lessLoaderOptions = {},
//         } = nextConfig
//       let extractCSSPlugin = nextConfig.extractCSSPlugin || options.extractCSSPlugin
//       if (!extractCSSPlugin) {
//         extractCSSPlugin = new ExtractTextPlugin({
//           filename: 'static/style.css'
//         })
//         // config.plugins.push(extractCSSPlugin)
//         options.extractCSSPlugin = extractCSSPlugin
//       }
//       //ref: https://github.com/zeit/next-plugins/issues/21
//       if (!isServer && !dev) {
//         config.plugins.push(extract)
//         // Override next-css configuration
//         options.extractCSSPlugin.filename = 'static/[name].css'
//         // Merge all CSS in one file
//         config.plugins.push(
//           new MergeFilesPlugin({
//             filename: 'static/style.css',
//             test: /\.css/,
//             deleteSourceFiles: true,
//           })
//         )
//       }
//       return config
//     }
//   })
// }

// module.exports = withImages(withCss(withSass(baseConfig())))


// const path = require('path')
// const withImages = require('next-images')
// const withSass = require('@zeit/next-sass')
// const withCss = require('@zeit/next-css')
// const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

// const commonsChunkConfig = (config, test = /\.css$/) => {
//   config.plugins = config.plugins.map(plugin => {
//     if (
//       plugin.constructor.name === 'CommonsChunkPlugin' &&
//       // disable filenameTemplate checks here because they never match
//       // (plugin.filenameTemplate === 'commons.js' ||
//       //     plugin.filenameTemplate === 'main.js')
//       // do check for minChunks though, because this has to (should?) exist
//       plugin.minChunks != null
//     ) {
//       const defaultMinChunks = plugin.minChunks
//       plugin.minChunks = (module, count) => {
//         if (module.resource && module.resource.match(test)) {
//           return true
//         }
//         return defaultMinChunks(module, count)
//       }
//     }
//     return plugin
//   })
//   return config
// }

// const baseConfig = {
//   distDir: '../../dist/functions/next',
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: '[local]___[hash:base64:5]',
//   },
//   inlineImageLimit: 1,
//   webpack (config, options) {
//     config.module.rules.forEach(rule => {
//       if (String(rule.test) === String(/\.scss$/)) {
//         rule.use.push({
//           loader: 'sass-resources-loader',
//           options: {
//             resources: [path.resolve(__dirname, './static/scss/_variables.scss'), path.resolve(__dirname, './static/scss/_mixins.scss')]
//           }
//         })
//       }
//     })
//     const {isServer, dev} = options;
//     if (!isServer && !dev) {
//       config = commonsChunkConfig(config, /\.(sass|scss|css)$/)
//     }
//     return config
//   }
// }

// module.exports = withImages(withSass(baseConfig))