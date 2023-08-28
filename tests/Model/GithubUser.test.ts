import { GithubUser } from "$/Model/GithubUser";

describe("GithubUser", () => {
  describe("When created through constructor", () => {
    describe("with no user data", () => {
      it("should not have any properties", () => {
        const user = new GithubUser();
        expect(extractGithubUser(user)).toEqual([
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ]);
      });
    });
    describe("with user data", () => {
      it("should have all properties", () => {
        const user = new GithubUser({
          username: "john-doe",
          name: "John Doe",
          avatarUrl: "https://url.com",
          bio: "Lorem Ipsum",
          followersCount: 10,
          repositoriesCount: 20,
        });
        expect(extractGithubUser(user)).toEqual([
          "john-doe",
          "John Doe",
          "https://url.com",
          "Lorem Ipsum",
          10,
          20,
        ]);
      });
    });
  });

  describe("When created through fromJS", () => {
    describe("with no data", () => {
      it("should not have any properties", () => {
        const user = GithubUser.fromJS();
        expect(extractGithubUser(user)).toEqual(standardProperties);
      });
    });

    describe("with incomplete data", () => {
      it("should have properties with standard values", () => {
        const user = GithubUser.fromJS({ foo: "Bar" });
        expect(extractGithubUser(user)).toEqual(standardProperties);
      });
    });

    describe("with complete data", () => {
      it("should have applied all properties", () => {
        const user = GithubUser.fromJS({
          login: "john-doe",
          name: "John Doe",
          avatar_url: "https://url.com",
          bio: "test bio",
          followers: 13,
          public_repos: 37,
        });

        expect(extractGithubUser(user)).toEqual([
          "john-doe",
          "John Doe",
          "https://url.com",
          "test bio",
          13,
          37,
        ]);
      });
    });
  });
});

function extractGithubUser(user: GithubUser) {
  return [
    user.username,
    user.name,
    user.avatarUrl,
    user.bio,
    user.followersCount,
    user.repositoriesCount,
  ];
}

const standardProperties = ["", "", "", "", 0, 0];
