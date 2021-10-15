/**
 * @file index.js
 * @description 应用程序入口文件
 */
import { AppRegistry, LogBox } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';

// 清除在真机或模拟器上的部分错误信息展示
// 仅开发环境生效，生产环境所有的错误信息都不会展示
// https://reactnative.dev/docs/debugging#logbox
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

AppRegistry.registerComponent(appName, () => App);
