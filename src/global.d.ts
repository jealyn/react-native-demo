/**
 * @file global.d.ts
 * @description 全局ts类型定义
 */
declare interface ComponentProp {
  route?: import('@react-navigation/native').RouteProp<
    import('@react-navigation/native').ParamListBase
  >;
  navigation: import('@react-navigation/native').NavigationProp<
    import('@react-navigation/native').ParamListBase
  >;
}

declare interface StoreState {
  common: {
    num?: number;
  };
}
