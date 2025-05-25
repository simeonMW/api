
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then( data => {
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

