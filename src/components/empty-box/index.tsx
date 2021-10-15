/**
 * @file index.tsx
 * @description 空内容展示容器组件
 * @prop {String} description 描述文字，默认为 暂无数据
 * @prop {Any} source 图片源地址，可以为相对路径，也可以是网络路径
 */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface emptyBoxPropTypes {
  description?: string;
  style?: object;
  source: any;
}

const EmptyBox: React.FC<emptyBoxPropTypes> = ({ description, source, style }) => (
  <View style={[style, styles.container]}>
    <Image source={source} style={styles.image} />
    <Text style={styles.description}>{description}</Text>
  </View>
);

EmptyBox.defaultProps = {
  description: '暂无数据',
  style: {},
  source: require('@/assets/images/pic_empty.png'),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 16,
    marginTop: 15,
    color: '#999',
  },
});

export default EmptyBox;
