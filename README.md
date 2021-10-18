# react-native-demo

该项目是使用 React Native 技术栈开发的一个 demo，并集成了路由控制、开发规范、状态管理、网络请求等功能，可作为后续 RN 项目开发的基础架子。

# 环境安装

以 macOS 开发 IOS 应用为例，讲述环境的搭建。

## Node & Watchman

首先检查一下 Node 版本，确保 Node 主版本>=12，否则需升级，前往[Node 官网](https://nodejs.org/en/download/)下载最新版本。

Watchman 是 Facebook 推出的监听文件变化的工具，（macOS 上）必须安装此工具，否则会报错，项目不能运行。可使用 Homebrew 安装。

```bash
brew install watchman
```

不过国外网络访问受限，大概率是安装不成功的，推荐直接下载安装包。前往[Watchman Release](https://github.com/facebook/watchman/releases)下载形如`watchman-vYYYY.MM.DD.00-macos.zip`的安装包。下载好解压后，在解压文件夹，执行以下代码，即可安装配置成功。

```bash
sudo mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman
sudo cp bin/* /usr/local/bin
sudo cp lib/* /usr/local/lib
sudo chmod 755 /usr/local/bin/watchman
sudo chmod 2777 /usr/local/var/run/watchman
```

> [点击此处](https://facebook.github.io/watchman/docs/install.html)可查看官方安装说明

## Xcode & CocoaPods

Xcode 用于开发和打包 IOS 应用，其也内置了 IOS 模拟器，以方便开发调试，必须安装。在 AppStore 搜索"Xcode"安装即可。（PS：应用较大，12G+，需耐心等待下载～）

下载后，再安装模拟器，安装路径 `Xcode -> Preferences... -> Components`，选择一个 iOS 版本进行下载即可。

CocoaPods 是使用 Ruby 开发的用于 IOS APP 的软件包管理工具，类似于 NPM，也必须安装，可通过 sudo 进行安装。

```bash
sudo gem install cocoapods
```

> 安装 CocoaPods 时尽量开启代理，并且切换为全局模式，对 git 也需进行设置代理。安装过程中可能会时断时续，一般重试几次即可安装完成。安装过程中遇到问题，可访问[CocoaPods 官网](https://cocoapods.org/)查看解决方案。

```bash
git config --global http.proxy 'socks5://127.0.0.1:your-port'

git config --global https.proxy 'socks5://127.0.0.1:your-port'
```

# 拉取并运行项目

## 克隆项目

```bash
git clone https://github.com/jealyn/react-native-demo.git
```

## 安装依赖

```
yarn
npx pod-install
```

## 运行服务

```
yarn start
```

## 启动安卓/ios 调试

```
yarn ios # ios调试

yarn android # 安卓调试
```

# 开发调试

React Native Debugger 是开发 ReactNative 时的调试工具，其是基于官方远程调试器开发的一款独立的应用，内置了 React DevTools、Redux DevTools,可用来调试组件、状态、网络请求等。

## 安装步骤

macOS 用户可直接使用 Homebrew 安装

```bash
brew install --cask react-native-debugger
```

其它平台用户可前往[Releases](https://github.com/jhen0409/react-native-debugger/releases)页面下载适合系统的安装包。

## 调试 http 请求

注意，该调试器默认并不能调试 http 请求，需要修改配置。

打开下载好的软件，点击 Debugger -> Open Config File，打开配置文件，将其中的`defaultNetworkInspect`修改为`true`，再重新启动即可，配置永久有效。

## 调试 Redux

要调试 Redux，需额外安装 [Redux DevTools Extension](https://www.npmjs.com/package/redux-devtools-extension)，并进行配置。

```bash
yarn add redux-devtools-extension -D
```

配置如下所示：

```js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(/* your middleware */)
    // other store enhancers if any
  )
);
```

# 项目使用说明

## 开发规范说明

本项目配置了`eslint` 、`prettier`用于进行代码的静态检测和格式化，使用`commitlint`、`husky`、`lint-staged`等用于 git commit 时执行代码校验和 commit message 校验。

若要修改 eslint 配置，可编辑项目根目录下的`.eslintrc.js`和`.eslintignore`文件。若要修改 prettier 配置，则更改项目根目录下的`.prettierrc.js`和`.prettierignore`文件。若要修改 Git 提交时的 message 校验，请编辑项目根目录下的`.commitlintrc.js`文件。

下面讲一下 husky 的配置。

```bash
npx husky-init && yarn
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
npx husky set .husky/pre-commit "npx --no-install lint-staged"
```

在 `package.json` 中，对 lint-staged 进行了如下配置，可根据项目需要进行修改

```json
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "src/**/*.{js,jsx,ts,tsx,json}": "prettier --write"
  }
}
```

## 路由导航使用说明

本项目使用的 React Navigation 进行导航。导航相关代码位于 src/router 文件夹下。包含了两种使用路由方式，一种是堆栈式路由（NativeStackNavigator），一种是底部标签式菜单（BottomTabNavigator）。在组件中使用导航的方式也相当简单，使用 navigition prop 即可：

```jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => (
  <View>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    <Button title="Go back" onPress={() => navigation.goBack()} />
    <Button title="Navigate with params" onPress={() => navigation.navigate('Detail', { id: 1 })} />
  </View>
);
```

在普通的 js 文件中，也可使用导航功能。

```js
import * as navigation from '../../router/navigation';

navigation.navigate('Login');
```

更多用法可访问[React Navigation Docs](https://reactnavigation.org/docs/getting-started)查看。

## 状态管理使用说明

本项目使用 Redux 及相关插件来实现状态管理功能。相关代码位于 src/router 文件夹下。

本项目中引入了 Redux 持久化存储功能，可将需要的 store 数据持久化存储至 AsyncStorage 中。

在组件中使用的方式也很简单，以函数式组件为例：

```jsx
/**
 * @file index.tsx
 * @description redux使用示例
 */
import React from 'react';
import { Text, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrementAction, incrementAction } from '../../store/actions/common';

export default () => {
  const num = useSelector(=> state.common.num);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>{num}</Text>
      <Button title="+" onPress={() => dispatch(incrementAction()} />
      <Button title="-" onPress={() => dispatch(decrementAction())} />
    </View>
  );
}

```

完整 API 和用法可访问[React Redux 官网](https://react-redux.js.org/)查看。

## http 请求

该项目的 http 请求使用 axios 库实现，代码位于 src/utils/request.js，实现了 http 请求和响应的拦截。

接口请求位于 src/api 文件夹下，仿照 common.ts 文件编写 api 请求即可。

```ts
import request from '@/utils/request';

export const getSomeListApi = () => request.get('/api/somelist');
```

## 启动屏设置

将启动屏图片放置在 assets 文件夹下，并重命名为 bootsplash_original.png。然后在终端中执行如下代码：

```bash
yarn react-native generate-bootsplash assets/bootsplash_original.png --assets-path=assets --logo-width=375
```

此时就生成了启动屏图片，然后重新启动 app 即可看到效果

```bash
yarn ios # 启动ios
yarn android # 启动安卓
```

启动屏插件使用的是 react-native-bootsplash，可[点击此处](https://github.com/zoontek/react-native-bootsplash)查看详细用法。

# 项目结构

```bash

│  .gitignore
│  package.json
│  README.md
│
├─node_modules # 三方依赖文件
│
├─ios # ios文件夹
│
├─android # android文件夹
│
└─src
    │  App.js  # 入口文件
    ├─api  # 接口文件夹
    ├─assets  # 静态文件，如图片，视频等
    ├─components  # 公用组件，抽取出来存放此文件夹
    ├─views  # 页面容器
    ├─styles  # 公共样式
    ├─router  # 路由
    ├─store  # 状态管理
    └─utils  # 常用工具文件夹
```

# 项目规范

## 请求接口的方法命名规范

对于 api 请求方法，统一按照模块分类，一个模块为一个独立的文件，统一存放在 src/api 目录下，接口命名以 xxxApi 的方式

- 获取列表数据的 get 方法，使用 get...ListApi 的模式命名， 如 getBusinessListApi
- 获取详情数据的 get 方法，使用 get...DetailApi 的模式命名，如 getBusinessDetailApi
- 添加数据的 post 方法，使用 add...Api 的模式命名，如 addBusinessApi
- 修改数据的 put 方法，使用 modify...Api 的模式命名，如 modifyBusinessApi
- 删除数据的 delete 方法，使用 delete...Api 的模式命名，如 deleteBusinessApi

## 开发流程规范

项目配置了代码编写规范和 git 提交规范。

代码编写规范包含`eslint` 、`prettier`，用于进行代码的静态检测和格式。

git 提交规范使用`commitlint`、`husky`、`lint-staged`，其会在提交代码时对暂存区的代码进行 pre-commit 校验和 commit-msg 校验，检验失败则提交不成功，根据错误信息进行修改再次提交即可。
