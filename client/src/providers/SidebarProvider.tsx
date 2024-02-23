import  { createContext, useState, ReactNode, FC } from "react";

interface ContextType {
    isCollapsed: boolean;
    toggleSidebarcollapse: () => void;
}

const initialValue: ContextType = {
    isCollapsed: true,
    toggleSidebarcollapse: () => {}
};

const SidebarContext = createContext<ContextType>(initialValue);

interface Props {
    children: ReactNode;
}

const SidebarProvider: FC<Props> = ({ children }) => {
    const [isCollapsed, setCollapse] = useState<boolean>(true);

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
