import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import routes from "../../routes";

const PrivateRoutes = () => {
  const [isClear, setIsClear] = useState<boolean>(false);
  const location = useLocation();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (location.pathname === "/") {
      setIsClear(true);
    } else {
      setIsClear(false);
    }
  }, [location.pathname]);

  if (token && !isClear) {
    return <Outlet />;
  } else if (token && isClear) {
    return <Navigate to={routes.users} />;
  } else if (!token) {
    return <Navigate to={"/auth"} />;
  }
};

export default PrivateRoutes;
