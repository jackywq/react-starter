import { lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/Home'));

const Hooks = lazy(() =>
  import(/* webpackChunkName: "About" */ '@/pages/Hooks')
);

const Edit = lazy(() => import(/* webpackChunkName: "Edit" */ '@/pages/Edit'));

const GoodsList = lazy(() =>
  import(/* webpackChunkName: "List" */ '@/pages/List/goodsList')
);

const Demo = lazy(() => import(/* webpackChunkName: "Demo" */ '@/pages/Demo'));

const Context = lazy(() =>
  import(/* webpackChunkName: "Demo" */ '@/pages/Context')
);

export default [
  {
    path: '/context',
    name: 'Context',
    component: Context,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hooks',
    name: 'Hooks',
    component: Hooks,
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
  },
  {
    path: '/list',
    name: 'List',
    component: GoodsList,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
  },
];
