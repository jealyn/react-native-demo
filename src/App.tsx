/**
 * @file App.tsx
 * @description 入口文件
 */
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import Router from './router';

const App: React.FC = () => {
  return (
    // Redux 包裹容器
    <Provider store={store}>
      {/* Redux持久化 包裹容器 */}
      <PersistGate loading={null} persistor={persistor}>
        {/* SafeArea组件 包裹容器 */}
        <SafeAreaProvider>
          {/* 路由及组件注册 */}
          <Router />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
