import { GithubClient, IGithubClient } from "$/Api/GithubClient";
import React, { PropsWithChildren } from "react";

export interface ServiceProviderProps {
  githubClient: IGithubClient;
}

export const defaultServices: ServiceProviderProps = {
  githubClient: new GithubClient(),
};

const ServiceContext =
  React.createContext<ServiceProviderProps>(defaultServices);

export const ServiceContextProvider: React.FC<
  ServiceProviderProps & PropsWithChildren
> = (props) => {
  const { children, ...propsWithoutChildren } = props;
  return (
    <ServiceContext.Provider value={propsWithoutChildren}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => React.useContext(ServiceContext);
