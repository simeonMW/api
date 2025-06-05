let categories = ["all"];
let categoryClick = null;

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    const productImage = document.getElementById("productImage");
    const modal = document.getElementById("productModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const closeModal = document.getElementById("closeModal");

    const allProducts = data;

    function renderProducts(productsToRender) {
      productImage.innerHTML = "";
      productsToRender.forEach((product) => {
        productImage.innerHTML += `
                    <div id="imgContainer" data-id="${product.id}">
                        <img src="${product.image}" alt="${
          product.description
        }" id="pImage">
                        <h3>${product.title}</h3>
                        <h3 class="price">$${product.price.toFixed(2)}</h3>
                        <img src="Favorite_fill.svg" alt="fav" id="favCon">
                        <button class="toCart">Add to cart</button>
                        <button class="viewDets" id="viewDets">View details</button>
                    </div>
                `;
        if (!categories.includes(product.category)) {
          categories.push(product.category);
        }
      });

      attachAddToCartListeners();
      attachViewDetailsListeners(productsToRender);
    }

    renderProducts(allProducts);

    // Cart logic
    const checkout = document.querySelector(".cart");
    let counter = 0;
    let checkoutDataB = [];
    const markerNum = document.getElementById("markerNum");

    function updateCartMarker() {
      markerNum.innerText = counter;
    }

    function attachAddToCartListeners() {
      const toCartButtons = document.querySelectorAll(".toCart");
      toCartButtons.forEach((btn) => {
        btn.onclick = (event) => {
          const container = event.target.closest("#imgContainer");
          const title = container.querySelector("h3").innerText;
          const image = container.querySelector("#pImage").src;
          const price = container
            .querySelector(".price")
            .innerText.replace("$", "");
          counter++;
          updateCartMarker();
          checkoutDataB.push({
            name: title,
            image,
            price: parseFloat(price),
          });
          console.log("Added to cart:", checkoutDataB);
        };
      });
    }

    checkout.addEventListener("click", () => {
      productImage.innerHTML = "";
      checkoutDataB.forEach((item, idx) => {
        productImage.innerHTML += `
                    <div class="checkoutContainer" data-index="${idx}">
                        <button class="itemDelete"><h3>X</h3></button>
                        <img src="${
                          item.image
                        }" alt="product image" class="checkoutImage">
                        <h2 class="checkoutTitle">${item.name}</h2>
                        <h2 class="checkoutPrice">$${item.price.toFixed(2)}</h2>
                    </div>
                `;
      });

      let total = checkoutDataB.reduce(
        (sum, item) => sum + Number(item.price),
        0
      );
      productImage.innerHTML += `
                <div class="checkoutTotal" style="margin-top:20px; font-weight:bold; font-size:1.2em;">
                    <h2 class="total">Total:</h2>
                    <h2 class="figures">$${total.toFixed(2)}</h2>
                </div>
            `;

      productImage.style.cssText = "height: 400px; display: block;";

      document.querySelectorAll(".itemDelete").forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          checkoutDataB.splice(idx, 1);
          counter = Math.max(0, counter - 1);
          updateCartMarker();
          checkout.click(); // Refresh checkout view
        });
      });
    });

    // View Details functionality
    function attachViewDetailsListeners(productsList) {
      document.querySelectorAll(".viewDets").forEach((btn, idx) => {
        btn.onclick = (event) => {
          const container = event.target.closest("#imgContainer");
          const productId = container.dataset.id;
          const product = productsList.find((p) => p.id == productId);
          if (product) {
            modalImage.src = product.image;
            modalTitle.textContent = product.title;
            modalDescription.textContent = product.description;
            modalPrice.textContent = product.price.toFixed(2);
            modal.style.display = "flex";
          }
        };
      });
    }

    closeModal.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    // Filter dropdown logic
    const filterBtn = document.getElementById("filterBtn");
    const filterDropdown = document.getElementById("filterDropdown");
    const filterContainer = document.querySelector(".filter-container");

    filterBtn.addEventListener("click", () => {
      filterContainer.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (!filterContainer.contains(event.target)) {
        filterContainer.classList.remove("active");
      }
    });

    filterDropdown.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const min = parseFloat(event.target.dataset.filterMin);
        const max = parseFloat(event.target.dataset.filterMax);
        const filtered = allProducts.filter(
          (p) => p.price >= min && p.price <= max
        );
        renderProducts(filtered);
        filterContainer.classList.remove("active");
      });
    });

    // Category dropdown logic
    const categoryBTN = document.getElementById("categoryBtn");
    const categoryDropdown = document.getElementById("categoryDropdown");
    const categoryContainer = document.querySelector(".category-container");

    categoryClick = (event) => {
      let _value = event.target.value;
      let indx = 0;
      for (let ctg of categories) {
        const firstWord = ctg.trim().split(" ")[0];
        if (firstWord === _value || ctg === _value) {
          indx = categories.indexOf(ctg);
          break;
        }
      }

      const filtered = allProducts.filter(
        (product) =>
          product.category === categories[indx] || categories[indx] === "all"
      );
      renderProducts(filtered);
      categoryContainer.classList.remove("active");
    };

    categoryDropdown.innerHTML = "";
    categories.forEach((ctgry) => {
      categoryDropdown.innerHTML += `<input type='button' value="${ctgry}" onclick='categoryClick(event)'>`;
    });

    categoryBTN.addEventListener("click", () => {
      categoryContainer.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      if (!categoryContainer.contains(event.target)) {
        categoryContainer.classList.remove("active");
      }
    });
  })
  .catch((error) => console.error("Error fetching products:", error));
