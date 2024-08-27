export class ProductsAPI {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }
  getProducts = async () => {
    const getResponse = await fetch(`${this.serverAddress}products/`);
    const productsArray = await getResponse.json();
    return { data: productsArray, responseStatus: getResponse.status };
  };

  patchProduct = async (dataToPost, id) => {
    const patchResponse = await fetch(`${this.serverAddress}products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const editedProductData = await patchResponse.json();
    return { data: editedProductData, responseStatus: patchResponse.status };
  };

  deleteProduct = async (id) => {
    const deleteResponse = await fetch(`${this.serverAddress}products/${id}`, {
      method: "DELETE",
    });
    return { data: null, responseStatus: deleteResponse.status };
  };

  postNewProduct = async (dataToPost) => {
    const postResponse = await fetch(`${this.serverAddress}products/`, {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const postedProductData = await postResponse.json();
    return { data: postedProductData, responseStatus: postResponse.status };
  };
  handleResponse(response) {
    if (response === 400) {
      return "Error, provide valid data.";
    } else if (response === 404) {
      return "Server error.";
    }
  }
}
