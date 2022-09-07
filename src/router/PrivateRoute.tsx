import { RouteObject, useRoutes } from 'react-router-dom'
import { routes } from './config'
import { Suspense } from 'react';

const f = (): RouteObject[] => routes.map(route => ({
  ...route,
  element: (
    <Suspense fallback={<p>Loading...</p>}>
      <route.element />
    </Suspense>
  )
}))

const PrivateRouter = () => useRoutes(f())

export default PrivateRouter
