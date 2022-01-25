import React, { Component } from 'react';
import { Tabs } from 'antd';
import history from '@/utils/history';
import ErrorBoundary from '@/components/ErrorBoundary';
import Routers from './routers';
import '@/App.less';

const { TabPane } = Tabs;

@ErrorBoundary
class App extends Component {
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
          <TabPane tab="useEffect和useLayoutEffect区别" key="effectHooks" />
        </Tabs>
        <Routers history={history} />
      </div>
    );
  }
}

export default App;
