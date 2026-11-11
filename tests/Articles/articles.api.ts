import { APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";

export const BASE_URL = "http://104.168.59.50";

export type TestUser = {
  username: string;
  email: string;
  password: string;
  token: string;
  image: string;
};

export async function registerUser(
  request: APIRequestContext,
): Promise<TestUser> {
  const username = `user-${faker.string.alphanumeric(8)}`;
  const email = `${username}@test.com`;
  const password = "test123";
  const customImage = "https://unsplash.com";

  // Step 1: Register the base user credentials
  const registerResponse = await request.post(`${BASE_URL}/api/users`, {
    data: { user: { username, email, password } },
    failOnStatusCode: true,
  });
  const registerBody = await registerResponse.json();
  const token = registerBody.user.token;

  // Step 2: Send a PUT request to save the avatar
  const updateResponse = await request.put(`${BASE_URL}/api/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      user: {
        image: customImage,
      },
    },
    failOnStatusCode: true,
  });

  const updateBody = await updateResponse.json();

  return {
    username,
    email,
    password,
    token,
    image: updateBody.user.image,
  };
}
