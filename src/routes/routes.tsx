

import AuthLayout from "@/layouts/authLayout/AuthLayout";
import FullLayout from "@/layouts/fullLayout/FullLayout";

import Home from "@/pages/private/home/Home";
import LoginRegister from "@/pages/public/loginRegister/LoginRegister";
import MyAppointments from "@/pages/private/myAppointments/MyAppointments";
import RequestAppointment from "@/pages/private/requestAppointment/RequestAppointment";
import NotFound from "@/pages/public/notFound/notFound";
import Landing from "@/pages/public/landing/Landing";

import PrivateRoute from "./validateRoutes/PrivateRoute";
import PublicRoute from "./validateRoutes/PublicRoute";
import { Navigate, useRoutes } from "react-router-dom";

const Routes = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to={"/landing"} />,
        },
        {
            element: (
                <PublicRoute>
                    <AuthLayout />
                </PublicRoute>
            ),
            children: [
                {
                    path: "/landing",
                    element: (
                        <Landing />
                    ),
                },
                {
                    path: "/login-register",
                    element: <LoginRegister />
                }
            ],
        },
        {
            element: (
                <PrivateRoute>
                    <FullLayout />
                </PrivateRoute>
            ),
            children: [
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/my-appointments",
                    element: <MyAppointments />
                },
                {
                    path: "/request-appointment",
                    element: <RequestAppointment />
                }
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);
    return routes;
};

export default Routes;
