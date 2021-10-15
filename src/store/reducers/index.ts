/**
 * @file index.ts
 * @description redux reducers 入口文件，整合 Reducers
 * @reference https://redux.js.org/api/combinereducers
 */
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import common from './common';

export default combineReducers({
  // redux 持久化存储 在RN中使用AsyncStorage作为存储容器，获取本地存储中值的方式为：
  // AsyncStorage.getItem(`persist:${key}`)
  // 可只对部分redux数据进行存储
  // https://github.com/rt2zz/redux-persist#basic-usage
  common: persistReducer({ key: 'common', storage: AsyncStorage }, common),
});
