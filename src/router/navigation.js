/**
 * @file rootNavigation.js
 * @description 在普通js文件中使用路由对象，进行跳转
 * @reference https://reactnavigation.org/docs/navigating-without-navigation-prop
 */
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  // 通过isReady方法，判断导航组件是否初始化，
  // 初始化后再进行跳转，否则会报错
  // https://reactnavigation.org/docs/navigating-without-navigation-prop#handling-initialization
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
