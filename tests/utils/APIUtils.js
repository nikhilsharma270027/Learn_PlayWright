import { test, expect, request } from "@playwright/test";
class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  async getToken() {
    const response = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {
      data: this.loginPayload,
    });
    // console.log("Response", response);

    // expect(response.status()).toBe(200);
    await expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();
    // console.log(responseJson);
    const authToken = responseJson.token;
    let token = authToken;
    // console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    // Order Api call to get the order details
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderPayload,
      headers: {
        Authorization: response.token,
        "Content-Type": "application/json",
      },
    });

    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    // console.log("Order ID:", orderId);
    response.orderId = orderId;

    return response;
  }
}

export default APIUtils;