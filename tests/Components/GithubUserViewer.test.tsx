import { GithubUserViewer } from "$/Components/GithubUserViewer";
import { CurrentUserContextProvider } from "$/Context/CurrentUserContext";
import { GithubUser, IGithubUser } from "$/Model/GithubUser";
import React from "react";
import { BaseTestCase } from "../utils/BaseTestCase";

describe("GithubUserViewer", () => {
  let testCase: GithubUserViewerTestCase;

  describe("Given no user", () => {
    beforeEach(() => {
      testCase = new GithubUserViewerTestCase();
    });

    it("should not find the github user viewer in dom", () => {
      expect(() => testCase.githubUserViewerWrapper).toThrow(
        /No element found/
      );
    });
  });

  describe("Given a user", () => {
    let user: IGithubUser;
    beforeEach(() => {
      user = new GithubUser({
        username: "john-doe",
        name: "John Doe",
        avatarUrl: "https://avatars.githubusercontent.com/u/3594984?v=4",
        bio: "Lorem Ipsum",
        followersCount: 13,
        repositoriesCount: 37,
      });

      testCase = new GithubUserViewerTestCase(user);
    });

    it("should have the github user viewer visible", () => {
      expect(testCase.githubUserViewerWrapper).toBeDefined();
    });

    it("should have all the elements in the viewer", () => {
      expect(testCase.summary).toEqual(extractGithubUser(user));
    });
  });
});

class GithubUserViewerTestCase extends BaseTestCase {
  constructor(currentUser?: IGithubUser) {
    super();
    super.doRender(
      <CurrentUserContextProvider
        currentUser={currentUser}
        changeCurrentUser={(_) => {
          /* NOP */
        }}
      >
        <GithubUserViewer />
      </CurrentUserContextProvider>
    );
  }

  get githubUserViewerWrapper() {
    return this.container.getByTestId("github-user-viewer");
  }

  get username() {
    return this.container.getByTestId("username").textContent;
  }

  get name() {
    return this.container.getByTestId("name").textContent;
  }

  get avatarUrl() {
    return this.container.getByTestId("avatar-url").getAttribute("src");
  }

  get bio() {
    return this.container.getByTestId("bio").textContent;
  }

  get followersCount() {
    return Number(this.container.getByTestId("followers-count").textContent);
  }

  get repositoriesCount() {
    return Number(this.container.getByTestId("repositories-count").textContent);
  }

  get summary() {
    return [
      this.username,
      this.name,
      this.avatarUrl,
      this.bio,
      this.followersCount,
      this.repositoriesCount,
    ];
  }
}

function extractGithubUser(user: IGithubUser) {
  return [
    user.username,
    user.name,
    user.avatarUrl,
    user.bio,
    user.followersCount,
    user.repositoriesCount,
  ];
}
