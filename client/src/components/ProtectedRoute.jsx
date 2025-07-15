import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, token } = useAppContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export const UserRoute = ({ children }) => {
    const { user, token } = useAppContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user?.role === 'admin') {
        return <Navigate to="/admin" />;
    }

    return children;
};