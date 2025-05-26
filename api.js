
  // Fetch products from the API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const productImage = document.getElementById('productImage');
            const allProducts = data; // Store all fetched products

            // Function to render products based on a given array
            function renderProducts(productsToRender) {
                productImage.innerHTML = ''; // Clear existing products
                productsToRender.forEach(product => {
                    productImage.innerHTML += `
                        <div id="imgContainer">
                            <img src=${product.image} alt=${product.description} id="pImage">
                            <h3>${product.title}</h3>
                            <h3 class="price">$${product.price.toFixed(2)}</h3>
                            <img src="Favorite_fill.svg" alt="fav" id="favCon">
                            <button class="toCart">Add to cart</button>
                            <button id="viewDets">View details</button>
                        </div>
                    `;
                });
                attachAddToCartListeners(); // Re-attach listeners after re-rendering
            }

            // Initial render of all products
            renderProducts(allProducts);

            // --- Dropdown Functionality ---
            const filterBtn = document.getElementById('filterBtn');
            const filterDropdown = document.getElementById('filterDropdown');
            const filterContainer = document.querySelector('.filter-container');

            filterBtn.addEventListener('click', () => {
                filterContainer.classList.toggle('active'); // Toggle the 'active' class
            });

            // Close the dropdown if a click occurs outside of it
            document.addEventListener('click', (event) => {
                if (!filterContainer.contains(event.target)) {
                    filterContainer.classList.remove('active');
                }
            });

            // Handle price range selection
            filterDropdown.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const minPrice = parseFloat(event.target.dataset.filterMin);
                    const maxPrice = parseFloat(event.target.dataset.filterMax);

                    const filteredProducts = allProducts.filter(product => {
                        return product.price >= minPrice && product.price <= maxPrice;
                    });

                    renderProducts(filteredProducts); // Render filtered products
                    filterContainer.classList.remove('active'); // Close dropdown after selection
                });
            });

            // --- Cart Functionality ---
            const checkout = document.querySelector('.cart');
            let counter = 0;
            let checkoutDataB = [];
            const markerNum = document.getElementById('markerNum');

            function updateCartMarker() {
                markerNum.innerText = counter;
            }

            function attachAddToCartListeners() {
                const toCartButtons = document.querySelectorAll('.toCart');
                toCartButtons.forEach((btn, idx) => {
                    // Remove existing listeners to prevent multiple counts on re-renders
                    btn.removeEventListener('click', handleAddToCart);
                    btn.addEventListener('click', handleAddToCart);
                });
            }

            function handleAddToCart(event) {
                // Find the parent imgContainer to get product details
                const imgContainer = event.target.closest('#imgContainer');
                const productTitle = imgContainer.querySelector('h3').innerText;
                const productImageSrc = imgContainer.querySelector('#pImage').src;
                const productPrice = imgContainer.querySelector('.price').innerText.replace('$', '');

                counter++;
                updateCartMarker();

                checkoutDataB.push({
                    name: productTitle,
                    image: productImageSrc,
                    price: parseFloat(productPrice)
                });
                console.log("Added to cart:", checkoutDataB);
            }

            checkout.addEventListener('click', () => {
                productImage.innerHTML = ""; // Clear previous content

                // Render all checkout items
                checkoutDataB.forEach((item, idx) => {
                    productImage.innerHTML += `
                        <div class="checkoutContainer" data-index="${idx}">
                            <button class="itemDelete"><h3>X</h3></button>
                            <img src="${item.image}" alt="product image" class="checkoutImage">
                            <h2 class="checkoutTitle">${item.name}</h2>
                            <h2 class="checkoutPrice">$${item.price.toFixed(2)}</h2>
                        </div>
                    `;
                });

                // Calculate and display total
                let total = checkoutDataB.reduce((sum, item) => sum + Number(item.price), 0);
                productImage.innerHTML += `
                    <div class="checkoutTotal" style="margin-top:20px; font-weight:bold; font-size:1.2em;">
                        <h2 class="total">Total:</h2>
                        <h2 class="figures">$${total.toFixed(2)}</h2>
                    </div>
                `;

                productImage.style.cssText = 'height: 400px; display: block;';

                // Add event listeners to all delete buttons
                document.querySelectorAll('.itemDelete').forEach((btn, idx) => {
                    btn.addEventListener('click', () => {
                        // Remove the item from checkoutDataB
                        checkoutDataB.splice(idx, 1);

                        // Decrement the counter and update markerNum
                        counter = Math.max(0, counter - 1); // Prevent negative values
                        updateCartMarker();

                        // Re-render the checkout items
                        checkout.click(); // Simulate a click on the cart to re-render
                    });
                });
            });

            // Initial attachment of add to cart listeners
            attachAddToCartListeners();
        })
        .catch(error => console.error('Error fetching products:', error));
