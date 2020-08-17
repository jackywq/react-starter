import React, { Component } from 'react';
import { Tabs } from 'antd';
import { createBrowserHistory } from 'history';
import Routers from './routers';
import '@/App.less';

const history = createBrowserHistory();
const { TabPane } = Tabs;

export default class App extends Component {
  handleTabsChange = val => {
    history.push(`/${val}`);
  };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="home" onChange={this.handleTabsChange}>
          <TabPane tab="首页" key="home" />
          <TabPane tab="关于" key="about" />
          <TabPane tab="列表" key="list" />
          <TabPane tab="上下文" key="context" />
        </Tabs>
        <Routers history={history} />
      </div>
    );
  }
}
