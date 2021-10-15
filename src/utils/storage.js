/**
 * @file storage.js
 * @description 本地缓存控制文件
 * @reference https://github.com/react-native-async-storage/async-storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description 设置缓存项
 * @param {String} key 缓存属性名
 * @param {Any} value 缓存属性值
 * @reference https://react-native-async-storage.github.io/async-storage/docs/api#setitem
 */
export const setStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description 获取缓存项
 * @param {String} key 缓存属性名
 * @reference https://react-native-async-storage.github.io/async-storage/docs/api#getitem
 */
export const getStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description 移除缓存项
 * @param {String} key 缓存属性名
 * @reference https://react-native-async-storage.github.io/async-storage/docs/api#removeitem
 */
export const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description 清空缓存
 * @reference https://react-native-async-storage.github.io/async-storage/docs/api#clear
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};
