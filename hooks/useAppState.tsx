import React from "react";

type AppState = {
  selectedFamilyId: number | undefined;
  flag: number;
};
const initState: AppState = {
  selectedFamilyId: undefined,
  flag: 1,
};

type AppStateProps = {
  setSelectedFamilyId: (familyId: number) => void;
} & AppState;
export const AppState = React.createContext<AppStateProps>({
  ...initState,
  setSelectedFamilyId: () => {},
});

type Props = {
  children: React.ReactNode;
};
export const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = React.useState<AppState>(initState);
  const setSelectedFamilyId = (selectedFamilyId: number) =>
    setState((state) => ({ ...state, selectedFamilyId }));

  return (
    <AppState.Provider value={{ ...state, setSelectedFamilyId }}>
      {children}
    </AppState.Provider>
  );
};

export const useAppState = () => React.useContext(AppState);
