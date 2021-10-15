/**
 * @file index.ts
 * @description 状态管理入口文件，使用redux系列
 * @reference https://redux.js.org/introduction/getting-started
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers';

export const store: any = createStore(
  rootReducer,
  // 在 React Native Debugger中开启Redux调试
  // 需要进行如下配置：
  // https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// redux 持久化存储
// https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
export const persistor = persistStore(store);
