import { test, expect } from "../fixtures.api";
import { APIRequestContext, request as newContext } from "@playwright/test";
import { ArticleController } from "../Controllers/ArticleController";
import { UserController } from "../Controllers/UserController";
import { faker } from "@faker-js/faker";

test("login via api - user should be logged", async ({
  page,
  request,
  token,
}) => {
  /* 
    1. нового юзера
    2. під цим юзером створити артікл
    3. авторизуватись під оленою
    4. додати артікл з кроку 2 у фейворіт
    5. перевірити що він додався
  */

  const userController = new UserController(request);

  // 1 create user
  const userData = {
    email: faker.internet.email(),
    password: "123456",
    username: faker.internet.username(),
  };

  const userToken = await userController.createUser({
    user: userData,
  });

  // create context with token
  const apiContext: APIRequestContext = await newContext.newContext({
    extraHTTPHeaders: {
      authorization: "Token " + userToken,
    },
  });
  console.log(userToken);
  await page.goto(`/articles`);

  // контроллер під новоствореним користувачем
  const articleController = new ArticleController(apiContext);

  const title = faker.book.title();
  const body = {
    article: {
      title: title,
      description: "test",
      body: "test",
      tagList: [],
      category: "general",
      visibility: "public",
      allowComments: true,
      cover: "",
    },
  };

  const { article } = await articleController.createArticle(body);
  const slug = article.slug;
  console.log(slug);

  // Force navigation home or to any page on your app domain to set origin context
  await page.goto(`/articles`);

  // Inject Olena's dynamic fixture token directly into the browser session
  await page.evaluate((olenaToken) => {
    localStorage.setItem("qa-dojo.token", olenaToken);
    localStorage.setItem("qa-dojo-senpai", "cool");
  }, token);

  // Navigate to the article URL (you will now load the page authenticated as Olena!)
  await page.goto(`/articles/article/${slug}`);
  await page.getByTestId("article-favorite-button").click();
  await page.getByTestId("nav-profile").click();
  await page.getByTestId("profile-tab-favorited").click();

  // Verify Olena successfully favorited the random user's article
  const articleList = page.getByTestId("article-list");
  await expect(articleList).toBeVisible();
  await expect(articleList).toContainText(title);
});
