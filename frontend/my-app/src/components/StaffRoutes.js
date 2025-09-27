import { Navigate } from 'react-router-dom';
const StaffRoutes = ({ children }) => {

    const token = localStorage.getItem("token");
    const isCustomer = localStorage.getItem("isCustomer") === "true";

    if (!token || isCustomer) {
        return <Navigate to="/login" replace />;
    }
    return <div>{children}</div>
}

export default StaffRoutes
