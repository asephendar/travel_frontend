export async function fetchUsers() {
    try {
        const response = await fetch('http://127.0.0.1:5000/users', {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        return data.users;
    } catch (error) {
        throw error;
    }
}

let currentPage = 1;
const rowsPerPage = 4;

export function displayUsers(users) {
    const usersContainer = document.getElementById('userTableBody');
    usersContainer.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach((user, index) => {
        const userRow = document.createElement('tr');

        userRow.innerHTML = `
            <td class="text-center">${start + index + 1}</td>
            <td class="text-center">${user.username}</td>
            <td class="text-center">${user.full_name}</td>
            <td class="text-center">${user.email}</td>
            <td class="text-center">${user.phone_number}</td>
            <td class="text-center">${user.address}</td>
            <td class="text-center">${user.role}</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm edit-usersAdmin-btn" data-bs-toggle="modal" data-bs-target="#editUsersModal" data-user-id="${user.id_user}"><i class="bi bi-pencil-square"></i> Edit</button>
                <button class="btn btn-danger btn-sm delete-usersAdmin-btn" data-user-id="${user.id_user}"><i class="bi bi-trash-fill"></i> Delete</button>
            </td>
        `;

        usersContainer.appendChild(userRow);
    });

    displayPagination(users);
}

function displayPagination(users) {
    const paginationControls = document.getElementById('paginationControlsUsers');
    paginationControls.innerHTML = '';

    const pageCount = Math.ceil(users.length / rowsPerPage);

    // Previous button
    const prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    if (currentPage === 1) prevPageItem.classList.add('disabled');
    prevPageItem.innerHTML = '<a class="page-link" href="#">Previous</a>';
    prevPageItem.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayUsers(users);
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
            displayUsers(users);
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
            displayUsers(users);
        }
    });
    paginationControls.appendChild(nextPageItem);
}

// Example usage
const users = [/* Your users data */];

document.addEventListener('DOMContentLoaded', () => {
    displayUsers(users);
});


// Add users
export async function addUsersAdmin(formData) {
    try {
        const response = await fetch('http://127.0.0.1:5000/add_admin', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        throw error;
    }
}

export async function fetchUsersAdminDetails(userId) {
    const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }
    return response.json();
}

export async function editUsersAdmin(userId, userData) {
    const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: userData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const users = await fetchUsers();
    displayUsers(users);
    editUsersSuccessAlert.textContent = 'User edited successfully';
    editUsersSuccessAlert.classList.remove('d-none');
}

export async function deleteUsersAdmin(userId) {
    const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }

    const data = await response.json();
    return data.message;
}