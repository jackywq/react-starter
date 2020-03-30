import { lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/Home'));

const About = lazy(() =>
  import(/* webpackChunkName: "About" */ '@/pages/About')
);

const Edit = lazy(() => import(/* webpackChunkName: "Edit" */ '@/pages/Edit'));

const GoodsList = lazy(() =>
  import(/* webpackChunkName: "List" */ '@/pages/List/goodsList')
);

const Demo = lazy(() => import(/* webpackChunkName: "Demo" */ '@/pages/Demo'));

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
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
