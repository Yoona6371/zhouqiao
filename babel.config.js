module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // 支持es7装饰器语法
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
};
