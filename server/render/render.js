import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { matchRoutes } from 'react-router-config';
import { matchPath } from 'react-router-dom';
import App from '@/App';
import { layout } from './layout';
import router from '../../src/router/index';
import Store from '../../src/store/index';

/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray
 * @param {*} url
 */
const getMatch = (routesArray, url) => {
  return routesArray.some(router =>
    matchPath(url, {
      path: router.path,
      exact: router.exact,
    })
  );
};

const store = new Store();
console.log(111111111111);
/**
 * 渲染服务端路由
 */
module.exports.render = async (ctx, next) => {
  const branch = matchRoutes(router, ctx.req.url);
  const promises = branch.map(({ route }) => {
    const { fetch } = route.component;
    return fetch instanceof Function ? fetch(store) : Promise.resolve(null);
  });
  await Promise.all(promises).catch(err => {
    console.log(err);
  });
  const isMatch = getMatch(router, ctx.req.url);

  if (!isMatch) {
    await next();
  } else {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const initState = store.getState();
    const body = layout(html, initState);
    ctx.body = body;
  }
};
