import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Landing from "pages/Landing";
import Signin from "pages/Signin";
import Reserve from "pages/Reserve";
import Profile from "pages/Profile";
import DashboardTwentyFive from "pages/DashboardTwentyFive";
import Employee from "pages/Employee";
import DashboardTwenty from "pages/DashboardTwenty";
import DashboardFour from "pages/DashboardFour";
import Dashboard from "pages/Dashboard";
import Signinup from "pages/Signinup";
import DashboardTwentyOne from "pages/DashboardTwentyOne";
import DashboardTwentyThree from "pages/DashboardTwentyThree";
import EmployeeOne from "pages/EmployeeOne";
import Admin from "pages/Admin";
import DashboardTwentySix from "pages/DashboardTwentySix";
import Resetpassword from "pages/Resetpassword";
import DashboardTwentyFour from "pages/DashboardTwentyFour";
import Resetcode from "pages/Resetcode";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "dhiwise-dashboard", element: <Home /> },
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Landing /> },
    { path: "signin", element: <Signin /> },
    { path: "reserve", element: <Reserve /> },
    { path: "profile", element: <Profile /> },
    { path: "dashboardtwentyfive", element: <DashboardTwentyFive /> },
    { path: "employee", element: <Employee /> },
    { path: "dashboardtwenty", element: <DashboardTwenty /> },
    { path: "dashboardfour", element: <DashboardFour /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "signinup", element: <Signinup /> },
    { path: "dashboardtwentyone", element: <DashboardTwentyOne /> },
    { path: "dashboardtwentythree", element: <DashboardTwentyThree /> },
    { path: "employeeone", element: <EmployeeOne /> },
    { path: "admin", element: <Admin /> },
    { path: "dashboardtwentysix", element: <DashboardTwentySix /> },
    { path: "resetpassword", element: <Resetpassword /> },
    { path: "dashboardtwentyfour", element: <DashboardTwentyFour /> },
    { path: "resetcode", element: <Resetcode /> },
  ]);

  return element;
};

export default ProjectRoutes;