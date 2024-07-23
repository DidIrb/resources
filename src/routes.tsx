import { useAuth } from "@/context/auth.context";
import { AuthLayout } from "@/layouts/auth.layout";
import { Profile } from "@/pages/admin/profile";
import { Signin } from "@/pages/auth/signin";
import PageNotFound from "@/pages/page.not.found";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/admin.layout";
import { Dashboard } from "./pages/admin/dashboard";
import { LandingPage } from "./pages/landing.page";
import { RouteType } from "./types/data.types";
import { Home } from "./pages/home";
export const loginRoute = import.meta.env.VITE_ADMIN_LOGIN_URL

const renderRoutes = (routes: RouteType[]) => {
  return routes.map(({ path, element, children = [] }) => (
    <Route key={path} path={path} element={element}>
      {children.length > 0 && <Route>{renderRoutes(children)}</Route>}
    </Route>
  ));
};

const Router = () => {
  const {  session } = useAuth();
  const routes: RouteType[] = [

    { path: "/", element: <LandingPage /> },
    { path: "/home", element: <Home /> },

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
      element: session ? ( <AdminLayout /> ) : ( <Navigate to="/home" /> ),
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/profile", element: <Profile /> }
      ],
    },
    
    { path: "*", element: <PageNotFound /> },
  ];

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default Router;
