// Define the function to calculate the sum , callback function for reducer

export function getSum(selectedProducts) {
    return selectedProducts.reduce(sumAll, 0)
}

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