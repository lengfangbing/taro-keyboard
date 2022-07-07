import Taro from '@tarojs/taro';
import { Component } from "react";
import "./app.less";
import 'taro-ui/dist/style/index.scss'
import UserInfoProvider from './common/components/user-info-provider';
import React from 'react';
class App extends Component {
  componentDidMount() {
    Taro.cloud.init();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <UserInfoProvider>
        {this.props.children}
      </UserInfoProvider>
    );
  }
}

export default App;
