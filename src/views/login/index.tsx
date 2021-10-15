/**
 * @file index.tsx
 * @description 登陆页面
 */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commomStyle from '../../styles';

const LoginScreen: React.FC<ComponentProp> = ({ navigation }) => {
  /**
   * @description 点击登陆处理函数
   */
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={commomStyle.alignCenterAll}>
      <Text>登陆页面</Text>
      <Text onPress={handleLogin} style={styles.loginButton}>
        登陆
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: '#409eff',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
  },
});

export default LoginScreen;
