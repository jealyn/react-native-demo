/**
 * @file index.tsx
 * @description webview承载页面 使用方式 navigation.navigate('WebView', { url: '跳转地址' })
 */
import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, StyleSheet } from 'react-native';

const WebViewContainer: React.FC<ComponentProp> = ({ navigation, route }) => {
  const params: any = route?.params;
  // 初始化时清除标题
  useEffect(() => navigation.setOptions({ title: '' }), [navigation]);

  return (
    <WebView
      source={{ uri: params?.url || '' }}
      renderLoading={() => <ActivityIndicator style={styles.ActivityIndicatorStyle} />}
      startInLoadingState={true}
      onNavigationStateChange={({ title }) => navigation.setOptions({ title })}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default WebViewContainer;
