fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then( data => {
    console.log(data);

    const productImage = document.getElementById('productImage');  
    const allProducts = document.getElementById('all');
    const mens = document.getElementById('mens');
    const jewels = document.getElementById('jewels');
    const gadgets = document.getElementById('gadgets');
    const womens = document.getElementById('womens');

    
    data.forEach( product => {
        productImage.innerHTML += `<div id="imgContainer">
        <img src=${product.image} alt=${product.description} id="pImage">
        <h3>${product.title}</h3>
        <h3 class="price">${product.price}</h3>
        <img src="Favorite_fill.svg" alt="fav" id="favCon">
        <button id="toCart">Add to cart</button>
        <button id="viewDets">View details</button>
        </div>`;

    })

   
    
 })
  