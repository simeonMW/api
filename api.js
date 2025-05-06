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
        <img src=${product.image} alt=${product.description}>
        <h3>${product.title}</h3>
        <h3 class="price">${product.price}</h3>
        </div>`;

    })

    mens.addEventListener('click', () => {
      productImage.innerHTML = '';
      data.forEach((data) =>{
        if(data.category === "men's clothing"){
          productImage.innerHTML += `<div id="imgContainer">
          <img src=${data.image} alt=${data.description}>
          <h3>${data.title}</h3>
          <h3 class="price">${data.price}</h3>
          </div>`;
        }
      })

      jewels.addEventListener('click', () => {
        productImage.innerHTML = '';
        data.forEach((data) =>{
          if(data.category === "jewelery"){
            productImage.innerHTML += `<div id="imgContainer">
            <img src=${data.image} alt=${data.description}>
            <h3>${data.title}</h3>
            <h3 class="price">${data.price}</h3>
            </div>`;
          }
        })
    
      })
 
      all.addEventListener('click', () => {
        productImage.innerHTML = '';
        data.forEach((data) =>{
            productImage.innerHTML += `<div id="imgContainer">
            <img src=${data.image} alt=${data.description}>
            <h3>${data.title}</h3>
            <h3 class="price">${data.price}</h3>
            </div>`;
        })
    
      })

      gadgets.addEventListener('click', () => {
        productImage.innerHTML = '';
        data.forEach((data) =>{
          if(data.category === "electronics"){
            productImage.innerHTML += `<div id="imgContainer">
            <img src=${data.image} alt=${data.description}>
            <h3>${data.title}</h3>
            <h3 class="price">${data.price}</h3>
            </div>`;
          }
        })
    
      })

      womens.addEventListener('click', () => {
        productImage.innerHTML = '';
        data.forEach((data) =>{
          if(data.category === "women's clothing"){
            productImage.innerHTML += `<div id="imgContainer">
            <img src=${data.image} alt=${data.description}>
            <h3>${data.title}</h3>
            <h3 class="price">${data.price}</h3>
            </div>`;
          }
        })
    
      })
   })
 })