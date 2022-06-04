import React, { ReactNode, useContext } from "react";
import RootStore from "./Index";

let store: RootStore;
const StoreContext = React.createContext<RootStore | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {

    const root = store ?? new RootStore();

    return <StoreContext.Provider value={root} > {children} </StoreContext.Provider>;
};

/* Hook to use store in any functional component */
export const useStore = () => {
    const context = useContext(StoreContext)
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider")
    }

    return context
}