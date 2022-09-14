import { ComponentType, lazy, LazyExoticComponent } from 'react'

export interface IRoute {
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
  props?: any
}

const defaultOptions = {
  caseSensitive: false,
  authRequired: false,
}

export const routes: IRoute[] = [
  {
    path: '*',
    element: lazy(() => import('../pages/not-found/NotFound'))
  },
  {
    path: '/',
    element: lazy(() => import('../pages/home/Home'))
  },
  {
    path: '/chat-room',
    element: lazy(() => import('../pages/chat-room/ChatRoom'))
  }
].map(route => ({ ...defaultOptions, ...route }))
