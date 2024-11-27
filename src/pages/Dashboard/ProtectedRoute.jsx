import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAuth } from "../../middleware";

const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCheckSession = async () => {
        const checkSession = await checkAuth()
        if (checkSession.data.status_code == 200){
            setSession(true)   
            setLoading(false)
        } else {
            setSession(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        handleCheckSession()
    }, []);

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (session) {
        return children;
    } else{
        return <Navigate to="/blog-login" />;
    }

};

export default ProtectedRoute;
