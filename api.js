
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then( data => {
    console.log(data);
  
    const checkout = document.querySelector('.cart');
    const marker_num = document.querySelector('.marker'); 
      let counter = 0;

    //new database for checkout section
    let checkoutDataB = [];

    checkout.addEventListener('click', () => {
        productImage.innerHTML = ""; // Clear previous content

        // Render all checkout items
        checkoutDataB.forEach((item, idx) => {
            productImage.innerHTML += `
                <div class="checkoutContainer" data-index="${idx}">
                    <button class="itemDelete"><h3>X</h3></button>
                    <img src="${item.image}" alt="product image" class="checkoutImage">
                    <h2 class="checkoutTitle">${item.name}</h2>
                    <h2 class="checkoutPrice">${item.price}</h2>
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
            btn.addEventListener('click', (e) => {
                // Remove the item from checkoutDataB
                checkoutDataB.splice(idx, 1);

                // Decrement the counter and update markerNum
                counter = Math.max(0, counter - 1); // Prevent negative values
                markerNum.innerText = counter;

                // Re-render the checkout items
                checkout.click();
            });
        });

        console.log(checkoutDataB);
    })



    // After all products are rendered, add event listeners:
  
    const markerNum = document.getElementById('markerNum');
    const toCartButtons = document.querySelectorAll('.toCart');

    toCartButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            counter++;
            markerNum.innerText = counter;

            // Add the correct product to checkoutDataB
            const product = data[idx];
            checkoutDataB.push({
                name: product.title,
                image: product.image,
                price: product.price
            });
        });
    });
 })
=======
let allProductsData = []; // Store all fetched products

    function displayProducts(productsToDisplay) {
        const productImage = document.getElementById('productImage');
        productImage.innerHTML = ''; // Clear current products

        if (productsToDisplay.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.style.textAlign = 'center';
            noProductsMessage.style.width = '100%';
            noProductsMessage.style.marginTop = '20px';
            noProductsMessage.innerHTML = '<p>No products found matching your filter.</p>';
            productImage.appendChild(noProductsMessage);
            return;
        }

        productsToDisplay.forEach((product, index) => {
            // Create a temporary div to parse the HTML string
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = `<div id="imgContainer">
                <img src=${product.image} alt=${product.description} id="pImage">
                <h3>${product.title}</h3>
                <h3 class="price">$${product.price.toFixed(2)}</h3>
                <img src="Favorite_fill.svg" alt="fav" id="favCon">
                <button id="toCart">Add to cart</button>
                <button id="viewDets">View details</button>
            </div>`;

            const productElement = tempDiv.firstElementChild; // Get the actual div element

            // Add the animation class
            // Use a slight delay based on index for a staggered effect
            productElement.style.animationDelay = `${index * 0.05}s`;
            productElement.classList.add('animated-product');

            productImage.appendChild(productElement); // Append the actual element
        });
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            allProductsData = data; // Store all products
            displayProducts(allProductsData); // Display all products initially

            const filterBtn = document.getElementById('filterBtn');
            const filterDropdown = document.getElementById('filterDropdown');
            const filterContainer = document.querySelector('.filter-container');

            // Toggle dropdown visibility
            filterBtn.addEventListener('click', () => {
                filterContainer.classList.toggle('active');
            });

            // Handle price filter selection
            filterDropdown.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const minPrice = parseFloat(event.target.dataset.filterMin);
                    const maxPrice = parseFloat(event.target.dataset.filterMax);

                    const filteredProducts = allProductsData.filter(product =>
                        product.price >= minPrice && product.price <= maxPrice
                    );

                    displayProducts(filteredProducts);
                    filterContainer.classList.remove('active');
                });
            });

            // Close dropdown if clicked outside
            document.addEventListener('click', (event) => {
                if (!filterContainer.contains(event.target)) {
                    filterContainer.classList.remove('active');
                }
            });
        })
        .catch(error => console.error('Error fetching products:', error));

