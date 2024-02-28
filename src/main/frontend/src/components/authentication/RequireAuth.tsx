import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
/*
component to protect routes according to roles 
 */
type RoleProps = {
    allowedRoles: string[];
}
const RequireAuth = ({ allowedRoles }:RoleProps) => {
    const { auth } = useAuthContext();
    const location = useLocation();

    return (
        auth?.user?.authorities?.find((role:Role) => allowedRoles?.includes(role.authority))
            ? <Outlet />/* render the component if role exists in the authenticated user */
            : auth?.user
            /* if user exists but its roles are not allowed send to unaouthorized */
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                /* if there is no authenticated user, send to the login page */
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;