import Home from '@/views/Home'
import Ido from '@/views/Ido'
import Root from '@/views/Root'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Root>
        <Home />
      </Root>
    )
  },
  {
    path: '/ido/:id',
    element: (
      <Root>
        <Ido />
      </Root>
    )
  }
])

export default router
