import { useCurrentUserContext } from "$/Context/CurrentUserContext";
import { useServiceContext } from "$/Context/ServiceContext";
import React, { FormEventHandler } from "react";
import "./SearchBar.css";
import GithubIcon from "$/Icons/github-mark.png";

function SearchBar() {
  const { githubClient } = useServiceContext();
  const [currentUsername, setCurrentUsername] = React.useState("");
  const currentUsernameIsEmpty = currentUsername.length === 0;
  const { changeCurrentUser } = useCurrentUserContext();

  const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const username = event.currentTarget.value;
    if (!username) return;
    setCurrentUsername(username);
  };

  const handleSubmit = React.useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      try {
        const newUser = await githubClient.getUserByUsername(currentUsername);
        changeCurrentUser(newUser);
        console.log(newUser);
      } catch (error) {}
    },
    [currentUsername]
  );

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <img
          src={GithubIcon}
          className="search-bar__icon"
          data-testid="github-icon"
        />
        <input
          type="text"
          data-testid="search-bar-input"
          onChange={handleChangeUsername}
          className="search-bar__input"
          placeholder="enter username"
        />
        <button
          type="submit"
          className="search-bar__button"
          data-testid="search-bar-submit"
          disabled={currentUsernameIsEmpty}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export { SearchBar };
