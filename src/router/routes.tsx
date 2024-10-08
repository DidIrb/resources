import config from '@/config/config';
import { useAuth } from '@/context/auth.context';
import { AuthLayout } from '@/layouts/auth.layout';
import { Layout } from '@/layouts/layout';
import PageNotFound from '@/pages/404';
import { Dashboard } from '@/pages/admin/dashboard';
import { Settings } from '@/pages/admin/settings';
import { Users } from '@/pages/admin/users';
import { Signin } from '@/pages/auth/signin';
import { SearchResults } from '@/pages/common/search';
import { Slug } from '@/pages/common/slug';
import { Home } from '@/pages/home';
import { Start } from '@/pages/start';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteType } from '../types/data.types';

const renderRoutes = (routes: RouteType[]) => {
  return routes.map(({ path, element, children = [] }) => (
    <Route key={path} path={path} element={element}>
      {children.length > 0 && <Route>{renderRoutes(children)}</Route>}
    </Route>
  ));
};

const Router = () => {
  const { session } = useAuth();
  const isAdmin = session?.role === 'admin';
  const isSuperAdmin = session?.role === 'super_admin';

  const routes: RouteType[] = [
    { path: "/", element: <Start /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/resource/:slug", element: <Slug /> },
        { path: "/search", element: <SearchResults /> },
      ],
    },

    // AUTHENTICATION
    {
      path: '/',
      element: !session ? <AuthLayout /> : <Navigate to="/home" />,
      children: [{ path: `${config.loginRoute}`, element: <Signin /> }],
    },

    // ADMIN & SUPER ADMIN LAYOUT
    {
      path: '/',
      element: session ? <Layout /> : <Navigate to="/home" />,
      children: [
        { 
          path: '/dashboard', 
          element: isSuperAdmin || isAdmin ? <Dashboard /> : <Navigate to="/home" /> 
        },
        { 
          path: '/users', 
          element: isSuperAdmin ? <Users /> : <Navigate to="/home" /> 
        },
        { path: '/settings', element: <Settings /> }
      ],
    },

    { path: '*', element: <PageNotFound /> },
  ];

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default Router;

