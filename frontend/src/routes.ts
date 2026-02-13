import { createBrowserRouter } from "react-router";
import Root from "@/pages/home";
import Portal from "@/pages/portal";
import AuthPage from "@/pages/auth";
import AdminDashboard from "@/pages/dashboard";

export const router = createBrowserRouter([{
    path: "",
    children: [
        {
            path: "/",
            Component: Root,
        },
        {
            path: "/auth",
            Component: AuthPage,

        },{
            path:"/portal",
            Component:Portal
        },{
            path:"/admin",
            Component:AdminDashboard
        }
    ]
}])