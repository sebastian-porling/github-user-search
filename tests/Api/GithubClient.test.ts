import { IGithubClient, GithubClient } from "$/Api/GithubClient";
import { GithubUser } from "$/Model/GithubUser";

describe("GithubClient", () => {
  const githubClient = new GithubClient();
  let unmockedFetch = global.fetch;

  describe("When getting a valid user", () => {
    beforeAll(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              login: "sebastian-porling",
              name: "Sebastian Porling",
              bio: "test",
              avatar_url: "https://avatars.githubusercontent.com/u/3594984?v=4",
              followers: 20,
              public_repos: 20,
            }),
        })
      ) as jest.Mock;
    });

    afterAll(() => {
      global.fetch = unmockedFetch;
    });

    it("should have created a user", () => {
      expect(
        githubClient.getUserByUsername("sebastian-porling")
      ).resolves.toEqual(
        new GithubUser({
          username: "sebastian-porling",
          name: "Sebastian Porling",
          bio: "test",
          avatarUrl: "https://avatars.githubusercontent.com/u/3594984?v=4",
          followersCount: 20,
          repositoriesCount: 20,
        })
      );
    });
  });

  describe("When getting a user that doesn't exist", () => {
    beforeAll(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 404,
        })
      ) as jest.Mock;
    });

    afterAll(() => {
      global.fetch = unmockedFetch;
    });

    it("should have thrown an error", () => {
      expect(githubClient.getUserByUsername("foo-bar")).rejects.toThrow(
        /Username: foo-bar not found/
      );
    });
  });

  describe("When other status is received", () => {
    beforeAll(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 500,
        })
      ) as jest.Mock;
    });

    afterAll(() => {
      global.fetch = unmockedFetch;
    });

    it("should have thrown an error", () => {
      expect(githubClient.getUserByUsername("foo-bar")).rejects.toThrow(
        /Unexpected status: 500/
      );
    });
  });
});
