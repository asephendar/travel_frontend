export async function fetchOrders(id_user) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/order_schedules?id_user=${id_user}`, {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        
        return data.orders;
    } catch (error) {
        throw error;
    }
}

let currentPage = 1;
const rowsPerPage = 3;

export function displayOrders(orders) {
    const ordersContainer = document.getElementById('ordersTableBody');
    ordersContainer.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedOrders = orders.slice(start, end);

    paginatedOrders.forEach((order, index) => {
        const availabilityText = order.order.status_payment ? "Yes" : "No";
        const orderRow = document.createElement('tr');
        orderRow.innerHTML = `
            <td class="text-center">${start + index + 1}</td>
            <td><img src="${order.schedule.image}" alt="Car Image" style="max-width: 150px;"></td>
            <td class="text-center">${order.schedule.name}</td>
            <td class="text-center">${order.schedule.from_location}</td>
            <td class="text-center">${order.schedule.to_location}</td>
            <td class="text-center">${order.schedule.date_trip}</td>
            <td class="text-center">${order.schedule.departure_time} - ${order.schedule.arrival_time}</td>
            <td class="text-center">${order.order.number_participants}</td>
            <td class="text-center">${order.order.date}</td>
            <td class="text-center">${order.order.payment_gateway}</td>
            <td class="text-center"><span class="badge bg-primary">${order.order.status_order}</span></td>
            <td class="text-center"><span class="badge bg-success">${availabilityText}</span></td>
            <td class="text-center">${order.order.total_amount}</td>
        `;

        ordersContainer.appendChild(orderRow);
    });

    displayPagination(orders);
}

function displayPagination(orders) {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    const pageCount = Math.ceil(orders.length / rowsPerPage);

    // Previous button
    const prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    if (currentPage === 1) prevPageItem.classList.add('disabled');
    prevPageItem.innerHTML = '<a class="page-link" href="#">Previous</a>';
    prevPageItem.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayOrders(orders);
        }
    });
    paginationControls.appendChild(prevPageItem);

    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) pageItem.classList.add('active');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = i;
            displayOrders(orders);
        });
        paginationControls.appendChild(pageItem);
    }

    // Next button
    const nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    if (currentPage === pageCount) nextPageItem.classList.add('disabled');
    nextPageItem.innerHTML = '<a class="page-link" href="#">Next</a>';
    nextPageItem.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < pageCount) {
            currentPage++;
            displayOrders(orders);
        }
    });
    paginationControls.appendChild(nextPageItem);
}

// Example usage
const orders = [/* Your orders data */];

document.addEventListener('DOMContentLoaded', () => {
    displayOrders(orders);
});


// Add Orders
export async function addOrders(orderData) {
    try {
        const response = await fetch('http://127.0.0.1:5000/orders', {
            method: 'POST',
            body: orderData, 
            credentials: 'include'
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to add order');
        }

        return responseData;
    } catch (error) {
        throw error;
    }
}

export async function fetchOrdersDetails(orderId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }

        const data = await response.json();

        return data.order;
    } catch (error) {
        throw error;                                                                           
    }
}

export async function editOrders(orderId, formData) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to edit order');
        }
        
        const orders = await fetchOrders();
        displayOrders(orders);
        editOrdersSuccessAlert.textContent = 'Order edited successfully';
        editOrdersSuccessAlert.classList.remove('d-none');

        return data.message;
    } catch (error) {
        throw error;
    }
}

export async function deleteOrders(orderId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete order');
        }

        const orders = await fetchOrders();
        displayOrders(orders);

        return data.message;
    } catch (error) {
        throw error;
    }
}