//This is created only for testing

function createItem (i,n,c,p) {

    let box = document.createElement('div');
    box.classList.add('inner_box');


    box.innerHTML = 
    `
        <div class="single image">
            <img src="${i}" >
        </div>
        
        <div class="single">
            <p>${n}</p>
            <p>${c}</p>
            <p>${p}</p>
        </div>
    
    `;

    return box;
};


//testing experiment
function displayOrders() {
    fetch('/getOrders')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(orders => {
            

            if (orders.length === 0) {
                return;
            }

            orders.forEach((order) => {
                let product_image, product_name, color, price;
                product_image = order.image;
                product_name = order.product;
                color = order.color;
                price = order.total;

                let Item  = createItem(product_image, product_name, color, price);
                
                records.appendChild(Item);
            });
        })
        .catch(error => {
            console.error("Error fetching orders:", error);
            const cartContainer = document.getElementById('cart-items');
            cartContainer.innerHTML = "<p>Error loading cart.</p>";
    });
}



let records = document.querySelector('.cart_records');
let notification = 0;

const cart = document.querySelector('.cart');
let counter = parseInt(cart.dataset.counter, 10);

cart.addEventListener('click', () => {
    let css = window.getComputedStyle(records);
    let display = css.getPropertyValue('display');

    display === 'none' ? records.style.display = 'block' : records.style.display = 'none';
    

    notification = 0;
    cart.dataset.counter = notification;

    //remove the cart notification
    if(notification === 0) {
        cart.classList.remove('notify');
    }
    
});

let prod_name = "";

//Part for getting the clicked button content title
const Button = document
    .querySelectorAll("#order")
    .forEach((e, i) => {
        e.addEventListener("click", () => {
            let single = document.querySelectorAll(
                "#prod-container .single .desc h3"
            );

            prod_name = single[i].innerText;
        });
});

//testing experiment
window.addEventListener('load', displayOrders);

// function addToCart() {
    
//     let product_image, product_name, color, price;
    
//     product_image = document.querySelector('#add-image img').src;
//     product_name = prod_name;
//     color = document.querySelector('#choosen_color').innerText;
//     price = document.querySelector('#sum').innerText;

//     let Item  = createItem(product_image, product_name, color, price);
    
//     console.log(Item);
    

//     //add products to cart

//     records.appendChild(Item);
    

//     //add the cart notification
//     cart.classList.add('notify');

//     notification++;
//     cart.dataset.counter = notification;
    
// };