export async function populateOrderDetails(
  container,
  orderProducts,
  productsDatabase,
  errorMessageParagraph,
) {
  for (let i = 0; i < orderProducts.length; i++) {
    const productWrapper = document.createElement("div");
    productWrapper.classList.add("list-products-wrapper");
    const listParagraphName = document.createElement("p");
    listParagraphName.innerText = await findNameOfProductInDatabase(
      orderProducts[i].id,
      container,
      productsDatabase,
      errorMessageParagraph,
    );
    listParagraphName.classList.add("list-paragraph-name", "list-paragraph");
    productWrapper.append(listParagraphName);
    const listParagraphX = document.createElement("p");
    listParagraphX.innerText = "x";
    listParagraphX.classList.add("list-paragraph-x", "list-paragraph");
    productWrapper.append(listParagraphX);
    const listParagraphQuantity = document.createElement("p");
    listParagraphQuantity.innerText = orderProducts[i].quantity;
    listParagraphQuantity.classList.add(
      "list-paragraph-quantity",
      "list-paragraph",
    );
    productWrapper.append(listParagraphQuantity);
    container.append(productWrapper);
  }
}
async function findNameOfProductInDatabase(
  id,
  container,
  productsDatabase,
  errorMessageParagraph,
) {
  const productIndex = productsDatabase.findIndex(function (product) {
    return product.id === id;
  });
  if (productIndex !== -1) {
    return productsDatabase[productIndex].name;
  } else {
    const newEntryPromiseResult = await askServerForDeletedProduct(
      id,
      container,
      errorMessageParagraph,
    );
    return newEntryPromiseResult;
  }
}
async function askServerForDeletedProduct(
  id,
  container,
  productsAPI,
  errorMessageParagraph,
) {
  const fetchedDeletedProductData = await productsAPI.getDeletedProduct(id);
  if (fetchedDeletedProductData.status === 200) {
    const deletedProductResponse = await fetchedDeletedProductData.json();
    return deletedProductResponse.name;
  } else {
    productsAPI.handleResponse(
      fetchedDeletedProductData,
      errorMessageParagraph,
    );
  }
}
