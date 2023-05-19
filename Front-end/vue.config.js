const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  /*publicPath: process.env.NODE_ENV === 'production'
  ? '/TShirt/'
  : ''
}*/
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'TShirt',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/TShirt/'
    : ''
})
