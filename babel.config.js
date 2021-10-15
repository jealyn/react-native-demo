module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // 相对路径别名插件
    // 将 ./src/ 重命名为 @/
    // https://github.com/entwicklerstube/babel-plugin-root-import
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src/',
        rootPathPrefix: '@/',
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        // 在生产环境下，移除console
        // https://www.npmjs.com/package/babel-plugin-transform-remove-console
        'transform-remove-console',
      ],
    },
  },
};
