import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// 本地化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

// 语法高亮
import 'prismjs/themes/prism.css';

import App from '@/App';
import Store from './store';

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
