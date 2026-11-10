import { test as base, expect, request } from "@playwright/test";
import { registerUser, TestUser } from "./articles.api";
    
type MyFixtures = {
  login: void;
  token: string;
  registeredUser: TestUser & { image: string };
};

const test = base.extend<MyFixtures>({
  login: async ({ context, baseURL, token }, use) => {
    const localStorage = createLocalStorage(baseURL!, token);
    await context.setStorageState(localStorage);
    await use();
  },
  request: async ({ token }, use) => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Token ${token}`,
      },
    });
    await use(context);
  },
  token: async ({}, use) => {
    const context = await request.newContext();
    const response = await context.post(`/api/users/login`, {
      data: { user: { email: "olena@example.com", password: "password" } },
      failOnStatusCode: true,
    });
    const json = await response.json();
    const token = json.user.token;
    await use(token);
  },
  registeredUser: async ({ context, baseURL }, use) => {
    // Create an unauthenticated context isolated from your global login state
    const unauthContext = await request.newContext();
    const user = await registerUser(unauthContext);
    const image = user.image;
    const localStorage = createLocalStorage(baseURL!, user.token);
    await context.setStorageState(localStorage);

    await use({ ...user, image });

    // Optional: Clean up user via API after test if your backend supports it
    await unauthContext.dispose();
  },
});
function createLocalStorage(baseUrl: string, token: string) {
    return {
        cookies: [],
        origins: [{
            origin: new URL(baseUrl!).origin,
            localStorage: [{
                name: "qa-dojo.token",
                value: token
            }, {name: "qa-dojo-senpai", value: "cool"}]
        }]
    };
}

export { test, expect };