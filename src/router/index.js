import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));

const Hooks = lazy(() => import('@/pages/Hooks'));

const Edit = lazy(() => import('@/pages/Edit'));

const GoodsList = lazy(() => import('@/pages/List/goodsList'));

const Demo = lazy(() => import('@/pages/Demo'));

const LifeCycle = lazy(() => import('@/pages/LifeCycle/parent'));

const Context = lazy(() => import('@/pages/Context'));

const SetState = lazy(() => import('@/pages/SetState'));

const EffectHooks = lazy(() => import('@/pages/EffectHooks'));

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
    path: '/lifeCycle',
    name: 'LifeCycle',
    component: LifeCycle,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
  },
  {
    path: '/setState',
    name: 'SetState',
    component: SetState,
  },
  {
    path: '/effectHooks',
    name: 'EffectHooks',
    component: EffectHooks,
  },
];
