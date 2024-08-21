export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProducts = () => {
    return fetch(`${this.serverAddress}products/`);
  };
}
