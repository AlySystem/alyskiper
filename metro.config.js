module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'json', 'png', 'jpeg', 'jpg']
  }
}
