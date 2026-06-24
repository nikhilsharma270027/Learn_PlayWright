export class APIUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }
  async getToken() {
    const response = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {
      data: loginPayload,
    });
    console.log("Response", response);

    // expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();
    // console.log(responseJson);
    const authToken = responseJson.token;
    token = authToken;
    console.log(token);
    return token;
  }

  async createOrder(token) {
    // Order Api call to get the order details
    const orderResponse = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderPayload,
      headers: {
        Authorization: this.getToken(),
        "Content-Type": "application/json",
      },
    });

    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    console.log("Order ID:", orderId);
    return orderId;
  }
}
