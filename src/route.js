import {lazy} from 'react'
const LoginPage = lazy(() => import('./login'))
const todoList = lazy(() => import('./todoList'))

const routes = [
    {
        path: '/',
        element: <LoginPage/>
    },
    {
        path: '/home',
        element: <todoList/>
    }
]

export default routes;