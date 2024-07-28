import { useAuth } from "@/context/auth.context";
import { AuthLayout } from "@/layouts/auth.layout";
import { Signin } from "@/pages/auth/signin";
import PageNotFound from "@/pages/404";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/admin.layout";
import { Dashboard } from "./pages/admin/dashboard";
import { Settings } from "./pages/admin/settings";
import { Users } from "./pages/admin/users";
import { Home } from "./pages/home";
import { LandingPage } from "./pages/landing.page";
import { RouteType } from "./types/data.types";
import { Slug } from "./pages/common/[Slug]";


const renderRoutes = (routes: RouteType[]) => {
  return routes.map(({ path, element, children = [] }) => (
    <Route key={path} path={path} element={element}>
      {children.length > 0 && <Route>{renderRoutes(children)}</Route>}
    </Route>
  ));
};

const Router = () => {
  const { session } = useAuth();
  const routes: RouteType[] = [

    { path: "/", element: <LandingPage /> },
    { path: "/home", element: <Home /> },
    { path: "/home/:slug", element: <Slug /> },

    // AUTHENTICATION
    {
      path: "/",
      element: !session ? <AuthLayout /> : <Navigate to="/home" />,
      children: [
        { path: `signin`, element: <Signin /> },
      ],
    },

    // ADMIN LAYOUT
    {
      path: "/",
      element: session ? (<AdminLayout />) : (<Navigate to="/home" />),
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/dashboard/:slug", element: <Slug /> },
        { path: "/settings", element: <Settings /> },
        { path: "/users", element: <Users /> }
      ],
    },

    { path: "*", element: <PageNotFound /> },
  ];

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default Router;
