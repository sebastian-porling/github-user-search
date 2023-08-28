import React from "react";
import "./App.css";
import {
  ServiceContextProvider,
  defaultServices,
} from "./Context/ServiceContext";
import { IGithubUser } from "./Model/GithubUser";
import { CurrentUserContextProvider } from "./Context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState<IGithubUser>();

  return (
    <ServiceContextProvider {...defaultServices}>
      <CurrentUserContextProvider
        currentUser={currentUser}
        changeCurrentUser={(user) => setCurrentUser(user)}
      >
        <div className="app" data-testid="app"></div>
      </CurrentUserContextProvider>
    </ServiceContextProvider>
  );
}

export default App;
