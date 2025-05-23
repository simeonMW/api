let allProductsData = []; // Store all fetched products

    function displayProducts(productsToDisplay) {
        const productImage = document.getElementById('productImage');
        productImage.innerHTML = ''; // Clear current products

        productsToDisplay.forEach(product => {
            productImage.innerHTML += `<div id="imgContainer">
                <img src=${product.image} alt=${product.description} id="pImage">
                <h3>${product.title}</h3>
                <h3 class="price">$${product.price.toFixed(2)}</h3>
                <img src="Favorite_fill.svg" alt="fav" id="favCon">
                <button id="toCart">Add to cart</button>
                <button id="viewDets">View details</button>
            </div>`;
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

            // Handle filter selection
            filterDropdown.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const category = event.target.dataset.category;
                    let filteredProducts = [];

                    if (category === 'all') {
                        filteredProducts = allProductsData;
                    } else {
                        filteredProducts = allProductsData.filter(product => product.category === category);
                    }
                    displayProducts(filteredProducts);
                    filterContainer.classList.remove('active'); // Hide dropdown after selection
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