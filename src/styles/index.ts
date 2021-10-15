/**
 * @file index.ts
 * @description 公共样式定义文件
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  app: {
    flex: 1,
  },
  alignCenterAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabbarIcon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
});
