const contenedorCheckout = document.querySelector("section.contenedorCheckout")
const productosElegidos = JSON.parse(localStorage.getItem("productosElegidos"))
const carritoCantidad = document.querySelector("span.carritoCantidad")
const spanTotal = document.querySelector(".spanTotal");

function calcularTotal() {
    let total = 0;

    productosElegidos.forEach((product) => {
        total += product.price;
    });

    return total;
}

function actualizarTotal() {
    const total = calcularTotal();
    spanTotal.textContent = total; // Display the total in the UI
}

calcularTotal()
actualizarTotal()

if (productosElegidos && productosElegidos.length > 0) {
    // Loop through the selected products and create elements to display them
    if (productosElegidos && productosElegidos.length > 0) {
        productosElegidos.forEach((product) => {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card", "mb-3");

            const cardRow = document.createElement("div");
            cardRow.classList.add("row", "g-0");

            const imageCol = document.createElement("div");
            imageCol.classList.add("col-md-4");

            const productImage = document.createElement("img");
            productImage.src = product.imageUrl;
            productImage.alt = product.product;
            productImage.classList.add("img-fluid", "rounded-start");

            const contentCol = document.createElement("div");
            contentCol.classList.add("col-md-8");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const productName = document.createElement("h5");
            productName.classList.add("card-title");
            productName.textContent = product.product;

            const productDescription = document.createElement("p");
            productDescription.classList.add("card-text");
            productDescription.textContent = product.description;

            const productPrice = document.createElement("p");
            productPrice.classList.add("card-text");
            productPrice.textContent = `Price: $${product.price}`;

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger", "delete-button");
            deleteButton.textContent = "Delete Item";

            // Add a click event listener to the delete button
            deleteButton.addEventListener("click", () => {
                // Remove the item from productosElegidos array
                const index = productosElegidos.indexOf(product);
                if (index !== -1) {
                    productosElegidos.splice(index, 1);
                }

                // Update the local storage and remove the card 
                localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
                cardContainer.remove();

                // Update the cart quantity
                carritoCantidad.textContent = productosElegidos.length;
            });

            cardBody.appendChild(productName);
            cardBody.appendChild(productDescription);
            cardBody.appendChild(productPrice);

            contentCol.appendChild(cardBody);
            cardBody.appendChild(deleteButton);
            imageCol.appendChild(productImage);

            cardRow.appendChild(imageCol);
            cardRow.appendChild(contentCol);

            cardContainer.appendChild(cardRow);
            contenedorCheckout.appendChild(cardContainer);
        });

        carritoCantidad.textContent = productosElegidos.length;
        actualizarTotal();

        contenedorCheckout.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-button")) {
                const productIndex = productosElegidos.findIndex(
                    (product) => product.product === event.target.dataset.product
                );
    
                if (productIndex !== -1) {
                    productosElegidos.splice(productIndex, 1);
                    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
                    event.target.closest(".card").remove();
                    carritoCantidad.textContent = productosElegidos.length;
                    actualizarTotal(); // Update the total after an item is deleted
                }
            }
        });

    } else {
        // In case when there are no selected products
        const noProductsMessage = document.createElement("p");
        noProductsMessage.textContent = "Your cart is empty.";
        contenedorCheckout.appendChild(noProductsMessage);
    }
}


const buttonCompletePurchase = document.getElementById("buttonCompletePurchase");
buttonCompletePurchase.addEventListener("click", () => {
    const total = calcularTotal();
    Swal.fire({
        title: 'Confirm Purchase',
        text: 'Do you want to continue?',
        imageUrl: 'https://img.freepik.com/premium-vector/girl-holding-shopping-bag-kawaii-illustration_342801-6.jpg?w=826',
        imageAlt: 'Custom Image',
        html: `Total Amount: $${total}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
    })
        .then((result) => {
            if (result.isConfirmed) {
                // confirmation of the purchase here
                // You can redirect the user to a thank you page 
                Swal.fire({
                    title: 'Purchase Confirmed',
                    text: 'Thank you for your purchase!',
                    icon: 'success'
                });

                // Clear the cart after the purchase 
                localStorage.removeItem("productosElegidos");
                contenedorCheckout.innerHTML = ''; 
                carritoCantidad.textContent = '0'; 
                spanTotal.textContent = '0'; 
            } else if (result.isDismissed) {
                Swal.fire({
                    title: 'Purchase Cancelled',
                    text: 'Your purchase has been cancelled',
                    icon: 'error'
                });
            }
        });
});
        
    



completePurchase()