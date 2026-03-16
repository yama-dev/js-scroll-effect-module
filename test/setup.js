require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ],
  extensions: ['.js'],
  ignore: [
    (filename) => {
      if (filename.includes('node_modules/@yama-dev/js-dom')) {
        return false;
      }

      return filename.includes('node_modules');
    }
  ]
});
