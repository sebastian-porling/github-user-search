import { useCurrentUserContext } from "$/Context/CurrentUserContext";
import React from "react";
import "./GithubUserViewer.css";
import { FollowersIcon } from "$/Icons/FollowersIcon";
import { ReposIcon } from "$/Icons/ReposIcon";

function GithubUserViewer() {
  const { currentUser } = useCurrentUserContext();

  if (!currentUser) {
    return;
  }

  return (
    <div className="github-user-viewer" data-testid="github-user-viewer">
      <div className="github-user-viewer__header">
        <div className="github-user-viewer__user-info">
          <p data-testid="username">{currentUser.username}</p>
          <h1 data-testid="name">{currentUser.name}</h1>
        </div>
        <img src={currentUser.avatarUrl} data-testid="avatar-url" />
      </div>
      <div className="github-user-viewer__body">
        <div className="count-wrapper">
          <span className="count-pill">
            <span data-testid="followers-count">
              {currentUser.followersCount}
            </span>
            <FollowersIcon />
          </span>

          <span className="count-pill">
            <span data-testid="repositories-count">
              {currentUser.repositoriesCount}
            </span>
            <ReposIcon />
          </span>
        </div>
        <p data-testid="bio">{currentUser.bio}</p>
      </div>
    </div>
  );
}

export { GithubUserViewer };
