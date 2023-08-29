import React from "react";
import { BaseTestCase } from "../utils/BaseTestCase";
import { ServiceContextProvider } from "$/Context/ServiceContext";
import { CurrentUserContextProvider } from "$/Context/CurrentUserContext";
import { GithubUser, IGithubUser } from "$/Model/GithubUser";
import { FakeGithubClient } from "../utils/FakeGithubClient";
import { SearchBar } from "$/Components/SearchBar";
import GithubIcon from "$/Icons/github-mark.png";

describe("SearchBar", () => {
  let testCase: SearchBarTestCase;
  describe("Given no current user", () => {
    beforeEach(() => {
      testCase = new SearchBarTestCase();
    });

    describe("When rendering", () => {
      it("should have a search bar", () => {
        expect(testCase.searchBar).toBeDefined();
      });

      it("should have a placeholder", () => {
        expect(testCase.searchBar.getAttribute("placeholder")).toEqual(
          "enter username"
        );
      });

      it("should have a github icon", () => {
        expect(testCase.icon.getAttribute("src")).toEqual(GithubIcon);
      });

      it("should have a submit button", () => {
        expect(testCase.submitButton.textContent).toBe("submit");
      });

      it("should be a disabled submit button", () => {
        expect(testCase.submitButton.isDisabled()).toBe(true);
      });

      it("should not be any error text visible", () => {
        expect(() => testCase.errorText).toThrow();
      });

      it("should not have any error class on input", () => {
        expect(testCase.searchBar.classList).not.toContain("has-error");
      });
    });

    describe("When entering a username", () => {
      beforeEach(() => {
        testCase.searchBar.changeIt("foo-bar");
      });

      it("should have changed the value", () => {
        expect(testCase.searchBar.getValue()).toBe("foo-bar");
      });

      it("should have enabled the submit button", () => {
        expect(testCase.submitButton.isDisabled()).toBe(false);
      });

      describe("When submitting with an existing user", () => {
        beforeEach(() => {
          testCase.fakeGithubClient.returnGetUserByUsername = new GithubUser({
            username: "foo-bar",
            name: "Foo Bar",
            bio: "",
            avatarUrl: "",
            followersCount: 0,
            repositoriesCount: 0,
          });
        });

        it("should not be any error text visible", () => {
          expect(() => testCase.errorText).toThrow();
        });

        it("should not have any error class on input", () => {
          expect(testCase.searchBar.classList).not.toContain("has-error");
        });

        describe("through pressing enter", () => {
          beforeEach(async () => {
            testCase.changeCurrentUserSpy.mockClear();
            await testCase.searchBar.pressEnter();
          });
          it("have called the change current user mock", () => {
            expect(testCase.changeCurrentUserSpy).toHaveBeenCalled();
          });
        });

        describe("through pressing submit", () => {
          beforeEach(async () => {
            testCase.changeCurrentUserSpy.mockClear();
            await testCase.submitButton.clickIt();
          });
          it("have called the change current user mock", () => {
            expect(testCase.changeCurrentUserSpy).toHaveBeenCalled();
          });
        });
      });

      describe("When submitting with a user that doesn't exist", () => {
        beforeEach(async () => {
          testCase.fakeGithubClient.returnGetUserByUsername = undefined;
          await testCase.searchBar.pressEnter();
        });

        it("should have a error text visible", () => {
          expect(testCase.errorText.textContent).toBe("user not found");
        });

        it("should have error class on input", () => {
          expect(testCase.searchBar.classList).toContain("has-error");
        });
      });
    });
  });
});

class SearchBarTestCase extends BaseTestCase {
  public readonly changeCurrentUserSpy = jest.fn();
  public readonly fakeGithubClient = new FakeGithubClient();
  constructor(currentUser?: IGithubUser) {
    super();
    super.doRender(
      <ServiceContextProvider githubClient={this.fakeGithubClient}>
        <CurrentUserContextProvider
          currentUser={currentUser}
          changeCurrentUser={this.changeCurrentUserSpy}
        >
          <SearchBar />
        </CurrentUserContextProvider>
      </ServiceContextProvider>
    );
  }

  get searchBar() {
    return this.container.getByTestId("search-bar-input");
  }

  get icon() {
    return this.container.getByTestId("github-icon");
  }

  get submitButton() {
    return this.container.getByTestId("search-bar-submit");
  }

  get errorText() {
    return this.container.getByTestId("error-text");
  }
}
