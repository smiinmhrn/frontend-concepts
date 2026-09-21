const button = document.querySelector("#loadProducts");
const productsContainer = document.querySelector("#products");

button.addEventListener("click", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/999999",
  );

  const data = await response.json();

  console.log(data);
  console.log(typeof data);

  productsContainer.innerHTML = "";

  data.forEach((product) => {
    const item = document.createElement("div");

    item.textContent = product.title;

    productsContainer.appendChild(item);
  });
});
