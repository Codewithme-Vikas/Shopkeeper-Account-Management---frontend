
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

export const customFilter = (field,value)=>{
    return (item)=>{
        return item[field] === value;
    }
}


// use for the get to know the amount of the product
export const productAmount = (product) => {
    // Check if both height and width properties exist
    if (product.height && product.width) {
        // Calculate and add the total area to the accumulator
        return (product.height * product.width * product.quantity * product.price);
    } else {
        // If height or width is missing, calculate total based on quantity and price only
        return (product.quantity * product.price);
    }
};

// ************************ Send Message **************************
export const sendWhatshappMsg = (saleData) => {
    const { customer, note, orderPrice, createdAt, products, discount, advance } = saleData;

    function generateMsg() {
        // Create a message template
        let msg = `Hi ${customer.name},\n\n`;
        msg += `Thank you for your order. Here are the details:\n\n`;

        // Loop through each product and add its details to the message
        products.forEach((product, index) => {
            msg += `Product ${index + 1}:\n`;
            msg += `- Name: ${product.productName}\n`;
            msg += `- Quantity: ${product.quantity}\n`;
            msg += `- Rate : ${product.price} ₹\n`;
            if (product.width && product.height) {
                msg += `- Height: ${product.height}, Width: ${product.width}\n`;
                msg += `- Area: ${product.height * product.width}\n`; // Assuming 'height' and 'width' are available for each product
            }
            msg += `- Price: ${productAmount(product)} ₹\n`;
        });

        // Add additional details like total price, order date, and note
        
        msg+= `\n`;

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

        // Add any other relevant details or closing remarks to the message

        // You can now use the 'msg' variable wherever you need the message

        return msg;
    }

    const text = encodeURIComponent( generateMsg() );

    // send msg by link
    window.open(`https://wa.me/${customer.phone}?text=${text}`, '_blank')
};
