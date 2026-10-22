/* ==========================================
   KHAN SAHAB TRADERS
   Complete JavaScript
========================================== */

const WHATSAPP_NUMBER = "923313583376";

const SHIRT_PRICE = 795;

/* ==========================================
   KHAN SAHAB TRADERS
   PRODUCT IMAGES & PRODUCTS
========================================== */


/* PRODUCT IMAGES — ORIGINAL IMGBB LINKS */

const shirtImageOne =
    "https://i.ibb.co/cd61bXz/Screenshot-2026-10-19-224634.png";

const shirtImageTwo =
    "https://i.ibb.co/S4rwqLpZ/Screenshot-2026-10-19-224656.png";


/* ==========================================
   PRODUCTS
========================================== */

const products = [

    {
        id: 1,

        name: "Check Shirt Collection - Picture 1",

        category: "CHECK SHIRT COLLECTION",

        price: 795,

        image: shirtImageOne,

        description: "Choose your favourite shirt colour.",

        sizes: ["18", "20", "22", "24"],

        colors: [
            "Green Check",
            "Red Check",
            "Blue Check",
            "Black Check",
            "Brown Check",
            "Grey Check"
        ]
    },

    {
        id: 2,

        name: "Check Shirt Collection - Picture 2",

        category: "CHECK SHIRT COLLECTION",

        price: 795,

        image: shirtImageTwo,

        description: "Choose your favourite shirt colour.",

        sizes: ["18", "20", "22", "24"],

        colors: [
            "Green Check",
            "Red Check",
            "Blue Check",
            "Black Check",
            "Brown Check",
            "Grey Check"
        ]
    }

];

/* ==========================================
   CURRENT ORDER
========================================== */

let currentOrder = null;


/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {

    return "Rs. " + Number(price).toLocaleString("en-PK");

}


/* ==========================================
   SAFE HTML TEXT
========================================== */

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (char) {

        const entities = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        };

        return entities[char];

    });

}


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function renderProducts() {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = products.map(function (product) {

        const sizeOptions = product.sizes.map(function (size) {

            return `
                <option value="${size}">
                    ${size}
                </option>
            `;

        }).join("");


        const colorOptions = product.colors.map(function (color) {

            return `
                <option value="${escapeHTML(color)}">
                    ${escapeHTML(color)}
                </option>
            `;

        }).join("");


        return `

            <article class="product-card">

                <div class="product-image-wrap">

                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                    >

                    <span class="product-label">
                        ORIGINAL COLLECTION
                    </span>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${escapeHTML(product.category)}
                    </span>

                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>

                    <p class="product-description">
                        ${escapeHTML(product.description)}
                    </p>

                    <div class="product-price">

                        ${formatPrice(product.price)}

                        <small>/ shirt</small>

                    </div>


                    <div class="product-options">

                        <div class="option-group">

                            <label for="size-${product.id}">
                                SELECT SIZE
                            </label>

                            <select id="size-${product.id}">
                                ${sizeOptions}
                            </select>

                        </div>


                        <div class="option-group">

                            <label for="color-${product.id}">
                                SELECT COLOUR
                            </label>

                            <select id="color-${product.id}">
                                ${colorOptions}
                            </select>

                        </div>


                        <div class="option-group">

                            <label for="qty-${product.id}">
                                QUANTITY
                            </label>

                            <div class="quantity-control">

                                <button
                                    type="button"
                                    data-qty-change="-1"
                                    data-product-id="${product.id}"
                                >
                                    −
                                </button>

                                <input
                                    id="qty-${product.id}"
                                    type="number"
                                    value="1"
                                    min="1"
                                    max="99"
                                >

                                <button
                                    type="button"
                                    data-qty-change="1"
                                    data-product-id="${product.id}"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="order-now-button"
                        data-order-product="${product.id}"
                    >
                        ORDER NOW →
                    </button>

                </div>

            </article>

        `;

    }).join("");

}


/* ==========================================
   QUANTITY PLUS / MINUS
========================================== */

function changeQuantity(productId, change) {

    const input = document.getElementById("qty-" + productId);

    if (!input) return;

    let quantity = parseInt(input.value, 10);

    if (!Number.isFinite(quantity)) {

        quantity = 1;

    }

    quantity = Math.max(1, Math.min(99, quantity + change));

    input.value = quantity;

}


/* ==========================================
   SELECT PRODUCT
========================================== */

function selectProduct(productId) {

    const product = products.find(function (item) {

        return item.id === productId;

    });

    if (!product) return;


    const quantityInput = document.getElementById("qty-" + productId);

    let quantity = parseInt(quantityInput.value, 10);

    if (!Number.isFinite(quantity)) {

        quantity = 1;

    }

    quantity = Math.max(1, Math.min(99, quantity));


    currentOrder = {

        productId: product.id,

        name: product.name,

        price: product.price,

        image: product.image,

        size: document.getElementById("size-" + productId).value,

        color: document.getElementById("color-" + productId).value,

        quantity: quantity

    };


    renderSelectedProduct();

    updateCheckoutTotal();


    document.getElementById("order").scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ==========================================
   ORDER SUMMARY
========================================== */

function renderSelectedProduct() {

    const box = document.getElementById("selectedProduct");

    if (!currentOrder) return;


    const subtotal = currentOrder.price * currentOrder.quantity;


    box.innerHTML = `

        <img
            class="selected-product-image"
            src="${currentOrder.image}"
            alt="${escapeHTML(currentOrder.name)}"
        >

        <h3>
            ${escapeHTML(currentOrder.name)}
        </h3>

        <p class="selected-price">
            ${formatPrice(currentOrder.price)} per shirt
        </p>

        <div class="selected-details">

            <p>
                <strong>Size:</strong>
                ${escapeHTML(currentOrder.size)}
            </p>

            <p>
                <strong>Colour:</strong>
                ${escapeHTML(currentOrder.color)}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${currentOrder.quantity}
            </p>

            <p>
                <strong>Subtotal:</strong>
                ${formatPrice(subtotal)}
            </p>

        </div>

        <button
            type="button"
            class="order-now-button"
            id="editSelectionButton"
        >
            UPDATE SIZE / COLOUR / QUANTITY
        </button>

    `;


    document.getElementById("editSelectionButton").addEventListener(
        "click",
        function () {

            const id = currentOrder.productId;

            currentOrder.size =
                document.getElementById("size-" + id).value;

            currentOrder.color =
                document.getElementById("color-" + id).value;


            let quantity = parseInt(
                document.getElementById("qty-" + id).value,
                10
            );

            if (!Number.isFinite(quantity)) {

                quantity = 1;

            }

            currentOrder.quantity = Math.max(
                1,
                Math.min(99, quantity)
            );


            renderSelectedProduct();

            updateCheckoutTotal();

        }
    );

}


/* ==========================================
   UPDATE TOTAL PRICE
========================================== */

function updateCheckoutTotal() {

    const totalElement = document.getElementById("checkoutTotal");

    if (!totalElement) return;


    if (!currentOrder) {

        totalElement.textContent = formatPrice(0);

        return;

    }


    const total = currentOrder.price * currentOrder.quantity;

    totalElement.textContent = formatPrice(total);

}


/* ==========================================
   PRODUCT BUTTON EVENTS
========================================== */

document.getElementById("productGrid").addEventListener(
    "click",
    function (event) {

        const quantityButton = event.target.closest("[data-qty-change]");


        if (quantityButton) {

            const productId = Number(
                quantityButton.dataset.productId
            );

            const change = Number(
                quantityButton.dataset.qtyChange
            );


            changeQuantity(productId, change);

            return;

        }


        const orderButton = event.target.closest("[data-order-product]");


        if (orderButton) {

            selectProduct(
                Number(orderButton.dataset.orderProduct)
            );

        }

    }
);


/* ==========================================
   CHECKOUT FORM
========================================== */

document.getElementById("orderForm").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!currentOrder) {

            alert("Please select a shirt first.");

            document.getElementById("collection").scrollIntoView({

                behavior: "smooth"

            });

            return;

        }


        const customerName =
            document.getElementById("customerName").value.trim();

        const customerPhone =
            document.getElementById("customerPhone").value.trim();

        const customerCity =
            document.getElementById("customerCity").value.trim();

        const customerAddress =
            document.getElementById("customerAddress").value.trim();


        if (
            !customerName ||
            !customerPhone ||
            !customerCity ||
            !customerAddress
        ) {

            alert("Please complete all delivery details.");

            return;

        }


        if (!/^03[0-9]{9}$/.test(customerPhone)) {

            alert("Please enter a valid Pakistani mobile number.");

            return;

        }


        const total = currentOrder.price * currentOrder.quantity;


        const message = [

            "KHAN SAHAB TRADERS",

            "NEW ORDER - CASH ON DELIVERY",

            "",

            "PRODUCT: " + currentOrder.name,

            "SIZE: " + currentOrder.size,

            "COLOUR: " + currentOrder.color,

            "QUANTITY: " + currentOrder.quantity,

            "PRICE PER SHIRT: " + formatPrice(currentOrder.price),

            "SUBTOTAL: " + formatPrice(total),

            "",

            "CUSTOMER DETAILS",

            "NAME: " + customerName,

            "MOBILE: " + customerPhone,

            "CITY: " + customerCity,

            "ADDRESS: " + customerAddress,

            "",

            "PAYMENT: CASH ON DELIVERY",

            "DELIVERY CHARGES: PLEASE CONFIRM",

            "",

            "Please confirm my order.",

            "Thank you - KHAN SAHAB TRADERS"

        ].join("\n");


        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/* ==========================================
   FOOTER YEAR
========================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ==========================================
   START WEBSITE
========================================== */

renderProducts();

updateCheckoutTotal();
