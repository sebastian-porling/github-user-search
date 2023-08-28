import { GithubUser, IGithubUser } from "$/Model/GithubUser";
import React, { PropsWithChildren } from "react";

export interface CurrentUserProviderProps {
  currentUser: IGithubUser | undefined;
  changeCurrentUser: (user: IGithubUser | undefined) => void;
}

export const defaultCurrentUserContext: CurrentUserProviderProps = {
  currentUser: new GithubUser(),
  changeCurrentUser(_user) {
    /* NOOP */
  },
};

const CurrentUserContext = React.createContext<CurrentUserProviderProps>(
  defaultCurrentUserContext
);

export const CurrentUserContextProvider: React.FC<
  CurrentUserProviderProps & PropsWithChildren
> = (props) => {
  const { children, ...propsWithoutChildren } = props;
  return (
    <CurrentUserContext.Provider value={propsWithoutChildren}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => React.useContext(CurrentUserContext);
