document.addEventListener("DOMContentLoaded", () => {
  async function login(username, password) {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store session information in local storage
      localStorage.setItem("loggedIn", "true");

      // Redirect based on user role
      if (data.role === "admin") {
        window.location.href = "/pages/dashboard.html";
      } else if (data.role === "member") {
        window.location.href = "/pages/dashboard_users.html";
      } else {
        throw new Error("Unknown role"); // Handle unexpected roles
      }
    } catch (error) {
      // Show error alert
      const loginErrorAlert = document.getElementById("loginErrorAlert");
      loginErrorAlert.textContent = error.message;
      loginErrorAlert.classList.remove("d-none");
    }
  }

  document
    .getElementById("loginForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      await login(username, password);
    });
});


document.addEventListener("DOMContentLoaded", () => {
  async function register(formData) {
    try {
      const response = await fetch('http://127.0.0.1:5000/registers', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      registerSuccessAlert.textContent = 'Registered successfully';
      registerSuccessAlert.classList.remove('d-none');
      return data.message;
    } catch (error) {
      throw error;
    }
  }
  // add
  const addUsersForm = document.getElementById('registerForm');
  const errorAlert = document.getElementById('usersErrorAlert');
  const successAlert = document.getElementById('registerSuccessAlert');

  addUsersForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // errorAlert.classList.add('d-none');
    const username = document.getElementById('registerUsername').value;
    const full_name = document.getElementById('registerFullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const phone_number = document.getElementById('registerPhoneNumber').value;
    const address = document.getElementById('registerAddress').value;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phone_number);
    formData.append('address', address);
    try {
      await register(formData);
      addUsersForm.reset();
      const users = await fetchUsers();
      displayUsers(users);
      successAlert.classList.remove('d-none');
    } catch (error) {
      // console.error('Error adding users:', error);
      // errorAlert.classList.remove('d-none');
    }
  });

});
