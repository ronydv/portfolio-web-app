import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
/*
Component to protect routes or components according to roles.
    if this component is used only within a <Route> without any children
    it will render the <Outlet>. Otherwise this will render children
    components in case this is not being used in within a <Route>
 */
type RestrictedProps = {
    to: string[];
    children?: React.ReactNode;
}
const Restricted = ({ to:allowedRoles, children }:RestrictedProps) => {
    const { auth } = useAuthContext();
    const location = useLocation();

    /* render <Outlet/> if there is no children and it's used within a <Route> */
    if(children === undefined || children === null){
        return (
            auth?.user?.authorities?.find((role:Role) => allowedRoles?.includes(role.authority))
                ? <Outlet />/* render the component if role exists in the authenticated user */
                : auth?.user
                /* if user exists but its roles are not allowed send to unaouthorized */
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    /* if there is no authenticated user, send to the login page */
                    : <Navigate to="/login" state={{ from: location }} replace />
        );
    }else return (
        <>{/* render the children component if this is not used within a <Route> */}
        { auth.user?.authorities?.find((role:Role) => allowedRoles?.includes(role.authority))
                && children }
        </>
    );
}

export default Restricted;









/* type RoleProps = {
    allowedRoles: string[];
}
const Restricted = ({ allowedRoles }:RoleProps) => {
    const { auth } = useAuthContext();
    const location = useLocation();

    return (
        auth?.user?.authorities?.find((role:Role) => allowedRoles?.includes(role.authority))
            ? <Outlet />/* render the component if role exists in the authenticated user 
            : auth?.user
            /* if user exists but its roles are not allowed send to unaouthorized 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                /* if there is no authenticated user, send to the login page 
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default Restricted; */