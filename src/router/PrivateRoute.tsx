import { RouteObject, useRoutes } from 'react-router-dom'
import { routes } from './config'
import { Suspense } from 'react'
import Loading from '../pages/loading/Loading'

const f = (): RouteObject[] => routes.map(route => ({
  ...route,
  element: (
    <Suspense fallback={Loading()}>
      <route.element />
    </Suspense>
  )
}))

const PrivateRouter = () => useRoutes(f())

export default PrivateRouter
