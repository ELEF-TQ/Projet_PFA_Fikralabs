import React, { createContext, useState, ReactNode, FC } from "react";

interface ContextType {
    isCollapsed: boolean;
    toggleSidebarcollapse: () => void;
}

const initialValue: ContextType = {
    isCollapsed: false,
    toggleSidebarcollapse: () => {}
};

const SidebarContext = createContext<ContextType>(initialValue);

interface Props {
    children: ReactNode;
}

const SidebarProvider: FC<Props> = ({ children }) => {
    const [isCollapsed, setCollapse] = useState<boolean>(false);

    const toggleSidebarcollapse = () => {
        setCollapse((prevState) => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
            {children}
        </SidebarContext.Provider>
    );
};

export { SidebarContext, SidebarProvider };
