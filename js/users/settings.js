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
    const usersContainer = document.getElementById('userTableBodyAdmin');
    usersContainer.innerHTML = '';

    if (!Array.isArray(users)) {
        console.error('Expected an array of users but got:', users); // Error handling for non-array input
        return;
    }

    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.className = "col-md-5 mb-4";

        userCard.innerHTML = `
            <div class="card p-4 border rounded shadow-sm bg-light">
                <h2 class="text-center mb-4">User Information</h2>
                <div class="row mb-3">
                    <label for="username-${index}" class="col-sm-4 col-form-label">Username :</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="username-${index}" name="username" value="${user.username}" readonly>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="full_name-${index}" class="col-sm-4 col-form-label">Full Name :</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="full_name-${index}" name="full_name" value="${user.full_name}" readonly>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="email-${index}" class="col-sm-4 col-form-label">Email :</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="email-${index}" name="email" value="${user.email}" readonly>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="phone_number-${index}" class="col-sm-4 col-form-label">Phone Number :</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="phone_number-${index}" name="phone_number" value="${user.phone_number}" readonly>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="address-${index}" class="col-sm-4 col-form-label">Address :</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="address-${index}" name="address" value="${user.address}" readonly>
                    </div>
                </div>
                <div class="row row-cols-md-3 g-2 mt-3">
                    <button type="button" class="btn btn-warning btn-sm edit-usersAdminProfile-btn" data-bs-toggle="modal" data-bs-target="#editUsersModalProfile" data-user-id="${user.id_user}">
                    <i class="bi bi-pencil-square"></i> Edit
                    </button>
                </div>
            </div>
        `;

        usersContainer.appendChild(userCard);
    });
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