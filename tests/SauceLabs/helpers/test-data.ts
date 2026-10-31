const { LOGIN, PASSWORD } = process.env;
const user = {
  loginData: { login: LOGIN!, password: PASSWORD! },
  firstName: "QA-test",
  lastName: "Tester",
  zipCode: "10001",
};

const products = [
  { id: 1, name: "Sauce Labs Backpack", price: "$29.99" },
  { id: 2, name: "Sauce Labs Bike Light", price: "$9.99" },
  { id: 3, name: "Sauce Labs Bolt T-Shirt", price: "$15.99" },
  { id: 4, name: "Sauce Labs Fleece Jacket", price: "$49.99" },
  { id: 5, name: "Sauce Labs Onesie", price: "$7.99" },
  { id: 6, name: "Test.allTheThings() T-Shirt (Red)", price: "$15.99" },
];

export { user, products };
