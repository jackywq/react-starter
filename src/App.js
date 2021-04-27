import React, { Component } from 'react';
import { Tabs } from 'antd';
import { createBrowserHistory } from 'history';
import Routers from './routers';
import '@/App.less';

const history = createBrowserHistory();
const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    activeKey: 'home',
  };

  componentDidMount() {
    const { pathname } = window.location;
    this.setState({
      activeKey: pathname.slice(1),
    });
  }

  handleTabsChange = activeKey => {
    this.setState({ activeKey });
    history.push(`/${activeKey}`);
  };

  render() {
    const { activeKey } = this.state;
    return (
      <div>
        <Tabs activeKey={activeKey} onChange={this.handleTabsChange}>
          <TabPane tab="首页" key="home" />
          <TabPane tab="hooks" key="hooks" />
          <TabPane tab="列表" key="list" />
          <TabPane tab="上下文" key="context" />
          <TabPane tab="lifecycle" key="lifecycle" />
          <TabPane tab="setState同异步" key="setState" />
        </Tabs>
        <Routers history={history} />
      </div>
    );
  }
}
