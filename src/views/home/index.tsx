/**
 * @file index.tsx
 * @description 路由导航使用示例
 */
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getDictListApi } from '../../api/common';

const HomeScreen: React.FC<ComponentProp> = ({ navigation }) => {
  useEffect(() => {
    getDictListApi();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            id: Math.round(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Baidu webview"
        onPress={() => navigation.navigate('WebView', { url: 'https://www.baidu.com' })}
      />
    </View>
  );
};

export default HomeScreen;
