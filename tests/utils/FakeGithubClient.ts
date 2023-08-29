import { IGithubClient } from "$/Api/GithubClient";
import { IGithubUser } from "$/Model/GithubUser";

export class FakeGithubClient implements IGithubClient {
  public returnGetUserByUsername: IGithubUser | undefined = undefined;

  getUserByUsername(username: string): Promise<IGithubUser> {
    if (this.returnGetUserByUsername) {
      return Promise.resolve(this.returnGetUserByUsername);
    }

    return Promise.reject({ message: "user not found" });
  }
}
