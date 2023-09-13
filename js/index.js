function saludar() {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome) {
        Swal.fire({
            position: 'top-center',
            title: 'Welcome to Serendipity',
            text: 'Here you will find special jewelry',
            imageUrl: 'https://i.pinimg.com/originals/34/0e/c6/340ec605abf9269f7582b0e42884e1e0.jpg',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom Image',
            showConfirmButton: false,
            timer: 2000,
        });

        // Set the flag in local storage to indicate that the welcome alert has been seen
        localStorage.setItem("hasSeenWelcome", "true");
    }
}

saludar();

const contenedor = document.getElementById("contenedor");

const divRow = document.createElement('div');
divRow.classList.add('row', 'w-100');

contenedor.appendChild(divRow);
let productosElegidos = [];

function llenarCarrito(products) {
    const botones = document.querySelectorAll('button.btn');
    const carritoCantidad = document.querySelector("span.carritoCantidad");

    for (let boton of botones) {
        boton.addEventListener('click', (e) => {
            Swal.fire({
                title: 'Added to the cart',
                text: 'Do you want to continue?',
                imageUrl: 'https://i.pinimg.com/originals/4e/be/81/4ebe8133d5faef826924b6cf2d444a5c.jpg',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom Image',
                showCancelButton: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    const productoElegido = productos.find((product) => product.code === parseInt(e.target.id));
                    productosElegidos.push(productoElegido);
                    console.table(productosElegidos);
                    carritoCantidad.textContent = productosElegidos.length;
                    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
                } else if (result.isDismissed) {
                    Swal.fire({
                        title: 'Item deleted',
                        icon: 'success',
                        text: 'Product removed from cart'
                    });
                }
            });
        });
    }
}

llenarCarrito();
// ... (Your existing code)

const datos = "js/products.json"

async function fetchProductData() {
    try {
        const response = await fetch(datos); // Assuming products.json is in the same directory as your HTML file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product data:', error);
        return []; // Return an empty array in case of an error
    }
}

async function loadProductData() {
    const products = await fetchProductData();
    
    if (products.length === 0) {
        // Handle the case where no products were fetched or an error occurred
        console.error('No products were fetched or an error occurred.');
        return;
    }
    
    const divRow = document.querySelector('.row.w-100');
    
    for (const product of products) {
        const divCard = document.createElement('div');
        divCard.classList.add('card', 'col-3');
        divCard.innerHTML = `
        <div class='card-body'>
        <img src="${product.imageUrl}" class='card-img-top' alt="${product.product}"/>
        <li>Product: ${product.product}</li>
        <li>Price: ${product.price}</li>
        <li>Description: ${product.description}</li>
        <li>Stock: ${product.stock}</li>
        <div class='card.footer'>
        <button class='btn btn-outline-dark w-100' id=${product.code}>Add cart</button>
        </div>
        `;
        divRow.appendChild(divCard);
    }
}

// Call the loadProductData function to fetch and render the products
loadProductData();
llenarCarrito();
























// let miContenedor = document.getElementById('contenedor')
// contenedor.addcart = (evt)=> {
//     evt.preventDefault()
//     let addcart = evt.target

//     console
// }





































































// Entrega II
// class Producto {
//     constructor(tittle, price, description, stock){
//         this.tittle = tittle
//         this.price = price
//         this.description = description
//         this.stock = stock
//     }
//     getPrecioConIVA() {
//         const iva = 0.21; 
//         const precioConIVA = this.price + (this.price * iva);
//         return precioConIVA;
//       }
// }

// const nuevoProducto = new Producto("Sakura", 2000, "aritos de plata 925", 100)

// const items = [
//     { tittle: "Collar Miku", price : 3000, description: "Collar de plata 925", stock: 100 },
//     { tittle: "Love ring", price: 2700 , description: "anillo de plata 925", stock: 100 },
//     { tittle: "Destiny bracelet", price : 4500 , description: "pulsera de plata 925", stock: 100 },
// ]


// items.push(nuevoProducto)
// items.forEach((item) => {
//     const producto = new Producto(item.tittle, item.price, item.description, item.stock);
//     console.log("El precio final del producto "+ item.tittle + " es $" + producto.getPrecioConIVA()); 
//   });

// let resultado = items.find((item) => item.tittle === ("Collar Miku"))
// let resultado1 = items.find((item) => item.tittle === ("Love ring"))
// let resultado2 = items.find((item) => item.tittle === ("Destiny bracelet") )

// console.table(items)

// console.log(resultado)
// console.log(resultado1)
// console.log(resultado2)





// let quantityProduct = Number(prompt ("Cantidad de productos a ingresar"))

// for (let index = 0; index < quantityProduct; index++) {
//     let tittle = prompt ("ingresar tittle: ")
//     let price = prompt ("ingresar price: ")
//     let description = prompt ("ingresar description: ")
//     let stock = prompt ("ingresar stock: ")


// }





// Entrega1
// // console.log("Hola usuario")

// function saludar() {
//     alert('Bienvenida a Serendipity!')
// }

// saludar()

// let edad = Number(prompt('Ingrese su edad:    '))
// console.log('Iniciar funcion: procesarCompra()')

// if(edad >= 16) {
//     alert('Es mayor de edad')

// } else{
//     alert('Es menor de Edad')
//     edad = Number(prompt('Ingrese su edad:    '))
// }

// function procesarCompra() {
//     let respuestaCompra = true
//     if (respuestaCompra) {
//         console.log("Tus productos son:")
//         do {
//             codigo = prompt("Ingresa el codigo del producto (stock collar 1, anillo 2, pulsera 3)") 
//             respuestaCompra = confirm("Desea agregar otro producto al carrito?")
//             sumarCarrito(codigo)
//         } while (respuestaCompra)
//     }
//     else {
//         console.log("EL total de tu compra es: $" + calcularTotal(precio1, precio2, precio3))
//         console.log("Gracias por tu compra!")
//         totalCompra(resultado);
//     }
// }

// let precio1 = 0
// let precio2 = 0
// let precio3 = 0
// let resultado = 0

// function sumarCarrito(codigo) {
//     if (codigo !== null)
//     switch (codigo.toLowerCase()) {
//         case "1":
//             precio1 = 3000
//             console.log("Item: Collar Miku:")
//             console.log("El valor del producto es de : $3000")
//             break
//         case "2":
//             precio2 = 2700
//             console.log("Item: Anillo love:")
//             console.log("El valor del producto es de : $2700")
//             break
//         case "3":
//             precio3 = 4500
//             console.log("Item: Pulsera desstiny:")
//             console.log("El valor del producto es de : $4500")
//             break
//         default:
//             console.error("Articulo inexistente.")
//             break
//     }
//     else{
//         console.log("finalizar compra")
        
//     }
//     mostrarResultado = precio1 + precio2 + precio3
// }



// function totalCompra(resultadoParam) {
//     console.log('el total es', resultadoParam)
// }

// function mostrarResultado(precio1, precio2, precio3) {
//     return precio1 + precio2 + precio3
// }

// calcularTotal(3000,2700,4500)
// procesarCompra()