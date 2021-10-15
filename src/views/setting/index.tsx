/**
 * @file index.tsx
 * @description redux使用示例
 */
import React from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { decrementAction, incrementAction } from '../../store/actions/common';
import { getStorage } from '../../utils/storage';

const SettingsScreen: React.FC<ComponentProp> = () => {
  const num = useSelector((state: StoreState) => state.common.num);
  const dispatch = useDispatch();
  getStorage('persist:common').then(res => {
    console.log(res, 'res');
  });
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <Text>{num}</Text>
      <Button title="+" onPress={() => dispatch(incrementAction())} />
      <Button title="-" onPress={() => dispatch(decrementAction())} />
    </SafeAreaView>
  );
};

export default SettingsScreen;
