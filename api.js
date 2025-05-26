
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then( data => {
    console.log(data);

    const productImage = document.getElementById('productImage');  
    
    data.forEach( product => {
        productImage.innerHTML += `<div id="imgContainer">
        <img src=${product.image} alt=${product.description} id="pImage">
        <h3>${product.title}</h3>
        <h3 class="price">${product.price}</h3>
        <img src="Favorite_fill.svg" alt="fav" id="favCon">
        <button class="toCart">Add to cart</button>
        <button id="viewDets">View details</button>
        </div>`;
    });
  
    const checkout = document.querySelector('.cart');
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

