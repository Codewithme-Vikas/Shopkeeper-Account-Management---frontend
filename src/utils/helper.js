
// Define the function to calculate the sum 
export function getSum(selectedProducts) {
    return selectedProducts.reduce(sumAll, 0)
}

// callback function for reducer
function sumAll(total, product) {
    // Check if both height and width properties exist
    if (product.height && product.width) {
        // Calculate and add the total area to the accumulator
        return total + (product.height * product.width * product.quantity * product.price);
    } else {
        // If height or width is missing, calculate total based on quantity and price only
        return total + (product.quantity * product.price);
    }
};


// Date formeter
export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-In", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
};


export const customSort = (field) => {
    return (a, b) => {
        if (a[field] < b[field]) {
            return -1;
        }
        if (a[field] > b[field]) {
            return 1;
        }
        return 0;
    }
};

export const customFilter = (field, value) => {
    return (item) => {
        return item[field] === value;
    }
}


// use for the get to know the total area of the product
export const productTotalArea = (height, width, quantity) => {

    let area = height * width * quantity;
    if (area <= 0) {
        return "__"
    }
    return area.toFixed(2);
};


// use for the get to know the amount of the product
export const productAmount = (product) => {
    // Check if both height and width properties exist
    let amount = 0;
    if (product.height && product.width) {
        // Calculate and add the total area to the accumulator
        amount = (product.height * product.width * product.quantity * product.price);
    } else {
        // If height or width is missing, calculate total based on quantity and price only
        amount = (product.quantity * product.price);
    }

    return Math.round(amount);
};

// ************************ Send Message **************************
export const sendWhatshappMsg = (saleData) => {
    const { customer, note, orderPrice, createdAt, products, discount, advance, type } = saleData;

    function generateMsg() {
        // Create a message template
        let msg = `Hi ${customer.name},\n\n`;

        if (type === 'Sell') {
            msg += `Thank you for your order. Here are the details:\n\n`;
        } else {
            msg += `Thank you for our order conformation. Here are the details:\n\n`;
        }

        // Loop through each product and add its details to the message
        products.forEach((product, index) => {
            msg += `Product ${index + 1}:\n`;
            msg += `- Name: ${product.productName}\n`;
            msg += `- Quantity: ${product.quantity}\n`;
            msg += `- Rate : ${product.price} ₹\n`;
            if (product.width && product.height) {
                msg += `- Height: ${product.height}, Width: ${product.width}\n`;
                msg += `- Total Area: ${product.height * product.width * product.quantity}\n`;
            }
            msg += `- Price: ${productAmount(product)} ₹\n`;
        });

        // Add additional details like total price, order date, and note

        msg += `\n`;

        if (discount) {
            msg += `Discount: ${discount} ₹\n`;
        }

        msg += `Total Price: ${orderPrice} ₹\n`;
        msg += `Order Date: ${formattedDate(createdAt)}\n`;

        if (advance) {
            msg += `Advance: ${advance} ₹\n`;
        }
        if (note) {
            msg += `Note: ${note}\n`;
        }

        msg += '\n\nBest Wishes from Ritik Adversting.\n'

        // Add any other relevant details or closing remarks to the message

        // You can now use the 'msg' variable wherever you need the message

        return msg;
    }

    const text = encodeURIComponent(generateMsg());

    // send msg by link
    window.open(`https://wa.me/${customer.phone}?text=${text}`, '_blank')
};


// ************************ Print the Lists from the cutomer view page **************
export const printList = (title, ref) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print ${title} List</title>
                <style>
                    /* Add your print styles here */
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        border: 1px solid #718096; /* Tailwind color slate-500 */
                        border-radius: 0.375rem; /* Tailwind rounded equivalent */
                    }

                    .table th, .table td {
                        border: 1px solid #718096; /* Tailwind color slate-500 */
                        padding: 0.5rem; /* Tailwind p-2 equivalent */
                        text-align: left; /* Tailwind text-start equivalent */
                    }

                    .table th {
                        font-weight: bold;
                    }

                    .table tr:last-child td {
                        padding-top: 0.75rem; /* Tailwind py-3 equivalent */
                        padding-bottom: 0.75rem; /* Tailwind py-3 equivalent */
                        font-size: 1.125rem; /* Tailwind text-md equivalent */
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <h1>${title} List</h1>
                ${ref.current.innerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
};

// ******************** filter out base on the date range *********************
export const filterDataOnDate = (startDate, endDate, data)=>{
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // So that match with only Date, not bases on morning, evening, midnight
    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    return data.filter(ele => {
        const eleDate = new Date(ele.createdAt);
        eleDate.setHours(0,0,0,0);
        return (!start || eleDate >= start) && (!end || eleDate <= end );
    })
};