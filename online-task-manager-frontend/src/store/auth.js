import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [serverToken, setServerToken] = useState("");
    const [user, setUser] = useState("")
    //function to stored the token in local storage
    const storeTokenLocally = (serverToken) => {
        setServerToken(serverToken)
        return localStorage.setItem("token", serverToken);
    };

    const userAuthentication = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch("http://localhost:5000/currentInfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                console.log(user);
            } else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [serverToken]);


    return (
        <AuthContext.Provider value={{ storeTokenLocally, userAuthentication, user, serverToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};