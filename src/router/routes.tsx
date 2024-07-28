// src/Router.tsx (or your routing file)

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';
import { AuthLayout } from '@/layouts/auth.layout';
import { Layout } from '@/layouts/admin.layout';
import { Dashboard } from '@/pages/admin/dashboard';
import { Settings } from '@/pages/admin/settings';
import { Users } from '@/pages/admin/users';
import { Home } from '@/pages/home';
import { Slug } from '@/pages/common/[Slug]';
import PageNotFound from '@/pages/404';
import { RouteType } from '../types/data.types';
import { Signin } from '@/pages/auth/signin';
import { Start } from '@/pages/start';
import config from '@/config/config';

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
     {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Start /> },
        { path: "/home", element: <Home /> },
        { path: "/q/:slug", element: <Slug /> },
      ],
    },

    // AUTHENTICATION
    {
      path: '/',
      element: !session ? <AuthLayout /> : <Navigate to="/home" />,
      children: [{ path:  `${config.loginRoute}`, element: <Signin /> }],
    },

    // ADMIN & SUPER ADMIN LAYOUT
    {
      path: '/',
      element: session ? <Layout /> : <Navigate to="/home" />,
      children: [
        { path: '/dashboard', element:  isSuperAdmin || isAdmin ?  <Dashboard /> : <Navigate to="/home" /> },
        // { path: '/dashboard/:slug', element: <Slug /> },
        { path: '/users', element: isSuperAdmin ? <Users /> : <Navigate to="/home" /> },
        { path: '/settings', element:  <Settings /> }
      ],
    },

    { path: '*', element: <PageNotFound /> },
  ];

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default Router;

   