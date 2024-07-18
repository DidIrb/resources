import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    session: any;
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

    // TODO: Add auth logic here
    return (
        <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
