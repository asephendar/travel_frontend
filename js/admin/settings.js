export async function fetchUsersAdmin() {
    try {
        const response = await fetch('http://127.0.0.1:5000/profile', {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        // console.log('Data fetched from API:', data); // Added logging
        // Wrap the single user object in an array if needed
        return data.users ? data.users : [data];
    } catch (error) {
        // console.error('Error fetching users:', error); // Added logging
        throw error;
    }
}


export function displayUsersAdmin(users) {
    // console.log('Users to display:', users); // Added logging
    const usersContainer = document.getElementById('userTableBodyAdmin');
    usersContainer.innerHTML = '';

    if (!Array.isArray(users)) {
        // console.error('Expected an array of users but got:', users); // Error handling for non-array input
        return;
    }

    users.forEach((user, index) => {
        const userRow = document.createElement('tr');

        userRow.innerHTML = `
            <!-- <td class="text-center">${index + 1}</td> -->
       
            <td class="text-center">${user.username}</td>
            <td class="text-center">${user.full_name}</td>
            <td class="text-center">${user.email}</td>
            <td class="text-center">${user.phone_number}</td>
            <td class="text-center">${user.address}</td>
            <td class="text-center">
                <!-- Action buttons (e.g., Edit, Delete) -->
                <button class="btn btn-warning btn-sm edit-usersAdminProfile-btn" data-bs-toggle="modal" data-bs-target="#editUsersModalProfile" data-user-id="${user.id_user}"><i class="bi bi-pencil-fill"></i> Edit</button>
                <!-- <button class="btn btn-danger btn-sm delete-usersAdmin-btn" data-user-id="${user.id_user}"><i class="bi bi-trash-fill"></i> Delete</button> -->
            </td>
        `;

        usersContainer.appendChild(userRow);
    });
}

export async function editUsersAdminProfile(userId, userData) {
    const response = await fetch(`http://127.0.0.1:5000/profile/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: userData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const users = await fetchUsersAdmin();
    displayUsersAdmin(users);
    editUsersProfileSuccessAlert.textContent = 'Profile edited successfully';
    editUsersProfileSuccessAlert.classList.remove('d-none');

}