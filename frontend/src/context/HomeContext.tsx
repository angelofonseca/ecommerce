import React, { createContext, useContext, useState } from "react";

interface HomeContextProps {
  refreshHome: boolean;
  setRefreshHome: (value: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const HomeContext = createContext<HomeContextProps | undefined>(undefined);

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [refreshHome, setRefreshHome] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <HomeContext.Provider
      value={{
        refreshHome,
        setRefreshHome,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
