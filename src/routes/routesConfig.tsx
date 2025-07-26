import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PageNotFound from '../pages/PageNotFound.tsx/PageNotFound';
import About from '../pages/About/About';
const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
  { path: '*', Component: PageNotFound },
]);

export default router;
