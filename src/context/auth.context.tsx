import api from "@/lib/api";
import { SigninFormData } from "@/types/forms.types";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
    session: any;
    signin: (data: SigninFormData) => Promise<any>;
    signout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [session, setSession] = useState<any | null>(null);

    const signin = async (data: SigninFormData) => {
        try {
            const response = await api.post(`/auth/signin`, data);
            setSession(response.data.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const signout = async () => {
        try {
            const response = await api.post(`/auth/signout`);
            setSession(null);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ session, signin, signout }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
