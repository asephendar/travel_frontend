import { fetchCars, displayCars, fetchCarDetails, addCar, editCar, deleteCar } from './admin/cars.js';
import { fetchSchedules, displaySchedules, fetchSchedulesDetails, addSchedules, editSchedules, deleteSchedules, searchDisplaySchedules } from './admin/schedules.js';
import { fetchUsers, displayUsers, fetchUsersAdminDetails, addUsersAdmin, editUsersAdmin, deleteUsersAdmin } from './admin/users.js';
import { fetchOrders, displayOrders, addOrders, fetchOrdersDetails, editOrders, deleteOrders } from './admin/orders.js';
import { fetchTopUsers, displayTopUsers, fetchRoutes, displayRoutes, fetchPopularSchedules, displayPopularSchedules } from './admin/reporting.js';
import { fetchUsersAdmin, displayUsersAdmin, editUsersAdminProfile } from './admin/settings.js';

// cars
document.addEventListener('DOMContentLoaded', async () => {
  try {
    //views
    const cars = await fetchCars();
    displayCars(cars);

    // add
    const addCarForm = document.getElementById('addCarForm');
    const errorAlert = document.getElementById('carsErrorAlert');
    const successAlert = document.getElementById('carsSuccessAlert');

    addCarForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      errorAlert.classList.add('d-none');

      const carName = document.getElementById('carName').value;
      const carSpec = document.getElementById('carSpec').value;
      const carCapacity = document.getElementById('carCapacity').value;
      const carImage = document.getElementById('carImage').files[0];

      const formData = new FormData();
      formData.append('name', carName);
      formData.append('specification', carSpec);
      formData.append('capacity', carCapacity);
      formData.append('image', carImage);

      try {
        await addCar(formData);
        addCarForm.reset();
        const cars = await fetchCars();
        displayCars(cars);
        successAlert.textContent = 'Car successfully added!';
        successAlert.classList.remove('d-none');
      } catch (error) {
        console.error('Error adding car:', error);
        errorAlert.classList.remove('d-none');
      }
    });

    // edit
    document.addEventListener('click', async function (event) {
      if (event.target.classList.contains('edit-car-btn')) {
        const carId = event.target.dataset.carId;
        try {
          const carData = await fetchCarDetails(carId);
          displayEditCarModal(carData);
        } catch (error) {
          alert(error.message);
        }
      }
    });

    function displayEditCarModal(data) {
      document.getElementById('editCarId').value = data.id_car;
      document.getElementById('editCarName').value = data.name;
      document.getElementById('editCarSpec').value = data.specification;
      document.getElementById('editCarCapacity').value = data.capacity;

      const editCarModalElement = document.getElementById('editCarModal');
      const editCarModal = new bootstrap.Modal(editCarModalElement);

      editCarModalElement.addEventListener('hidden.bs.modal', function () {
        editCarModal.hide();
        document.body.classList.remove('modal-open');
        const backdropElement = document.querySelector('.modal-backdrop');
        if (backdropElement) {
          backdropElement.remove();
        }
      });

      editCarModal.show();
    }

    const editCarForm = document.getElementById('editCarForm');
    const carsEditErrorAlert = document.getElementById('carsEditErrorAlert');
    const carsEditSuccessAlert = document.getElementById('carsEditSuccessAlert');

    editCarForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      carsEditErrorAlert.classList.add('d-none');


      const carId = document.getElementById('editCarId').value;
      const carName = document.getElementById('editCarName').value;
      const carSpec = document.getElementById('editCarSpec').value;
      const carCapacity = document.getElementById('editCarCapacity').value;
      const carImage = document.getElementById('editCarImage').files[0];

      const formData = new FormData();
      formData.append('name', carName);
      formData.append('specification', carSpec);
      formData.append('capacity', carCapacity);
      formData.append('image', carImage);

      await editCar(carId, formData);
    });

    // delete
    document.addEventListener('click', async function (event) {
      if (event.target.classList.contains('delete-car-btn')) {
        const carId = event.target.dataset.carId;
        const confirmation = confirm("Are you sure you want to delete this car?");
        if (confirmation) {
          try {
            await deleteCar(carId);
          } catch (error) {
            alert(error.message);
          }
        }
      }
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const schedules = await fetchSchedules();
    displaySchedules(schedules);

    // add
    const addSchedulesForm = document.getElementById('addSchedulesForm');
    const errorAlert = document.getElementById('schedulesErrorAlert');
    const successAlert = document.getElementById('schedulesSuccessAlert');

    addSchedulesForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      errorAlert.classList.add('d-none');

      const schedulesRoleCarName = document.getElementById('schedulesRoleCarName').value;
      const schedulesFromLocation = document.getElementById('schedulesFromLocation').value;
      const schedulesToLocation = document.getElementById('schedulesToLocation').value;
      const schedulesDate = document.getElementById('schedulesDate').value;
      const schedulesDepartureTime = document.getElementById('schedulesDepartureTime').value;
      const schedulesArrivalTime = document.getElementById('schedulesArrivalTime').value;
      const schedulesAvailableSeats = document.getElementById('schedulesAvailableSeats').value;
      const schedulesRentalPrice = document.getElementById('schedulesRentalPrice').value;

      const formData = new FormData();
      formData.append('car_name', schedulesRoleCarName);
      formData.append('from_location', schedulesFromLocation);
      formData.append('to_location', schedulesToLocation);
      formData.append('date_trip', schedulesDate);
      formData.append('departure_time', schedulesDepartureTime);
      formData.append('arrival_time', schedulesArrivalTime);
      formData.append('available_seats', schedulesAvailableSeats);
      formData.append('rental_price', schedulesRentalPrice);

      try {
        await addSchedules(formData);
        addSchedulesForm.reset();
        const schedules = await fetchSchedules();
        displaySchedules(schedules);
        schedulesSuccessAlert.textContent = 'Schedules successfully added!';
        schedulesSuccessAlert.classList.remove('d-none');
      } catch (error) {
        console.error('Error adding schedules:', error);
        errorAlert.classList.remove('d-none');
      }
    });

    // edit
    document.addEventListener('click', async function (event) {
      if (event.target.classList.contains('edit-schedules-btn')) {
        const schedulesId = event.target.dataset.schedulesId;
        try {
          const schedulesData = await fetchSchedulesDetails(schedulesId);
          displayEditSchedulesModal(schedulesData);
        } catch (error) {
          alert(error.message);
        }
      }
    });

    // Function to display the modal for editing schedule details
    // Function to display the modal for editing schedule details
    function displayEditSchedulesModal(data) {
      document.getElementById('editSchedulesId').value = data.id_schedule;
      document.getElementById('editSchedulesRoleCarName').value = data.car.name;
      document.getElementById('editSchedulesFromLocation').value = data.from_location;
      document.getElementById('editSchedulesToLocation').value = data.to_location;

      // Format date in "dd-mm-yyyy" format
      const dateParts = data.date_trip.split('-');
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      document.getElementById('editSchedulesDate').value = formattedDate;

      document.getElementById('editSchedulesDepartureTime').value = data.departure_time;
      document.getElementById('editSchedulesArrivalTime').value = data.arrival_time;
      document.getElementById('editSchedulesstatus_still_available').value = data.status_still_available;
      document.getElementById('editSchedulesAvailableSeats').value = data.available_seats;
      // Extracting the number part of the rental price
      const rentalPrice = parseFloat(data.rental_price.replace(/\D/g, ''));
      document.getElementById('editSchedulesRentalPrice').value = rentalPrice;

      const editSchedulesModalElement = document.getElementById('editSchedulesModal');
      const editSchedulesModal = new bootstrap.Modal(editSchedulesModalElement);

      editSchedulesModalElement.addEventListener('hidden.bs.modal', function () {
        editSchedulesModal.hide();
        document.body.classList.remove('modal-open');
        const backdropElement = document.querySelector('.modal-backdrop');
        if (backdropElement) {
          backdropElement.remove();
        }
      });

      editSchedulesModal.show();
    }

    const editSchedulesForm = document.getElementById('editSchedulesForm');

    editSchedulesForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const schedulesId = document.getElementById('editSchedulesId').value;
      const schedulesRoleCarName = document.getElementById('editSchedulesRoleCarName').value;
      const schedulesFromLocation = document.getElementById('editSchedulesFromLocation').value;
      const schedulesToLocation = document.getElementById('editSchedulesToLocation').value;
      const schedulesDate = document.getElementById('editSchedulesDate').value;
      const schedulesDepartureTime = document.getElementById('editSchedulesDepartureTime').value;
      const schedulesArrivalTime = document.getElementById('editSchedulesArrivalTime').value;
      const schedulesstatus_still_available = document.getElementById('editSchedulesstatus_still_available').value;
      const schedulesAvailableSeats = document.getElementById('editSchedulesAvailableSeats').value;
      const schedulesRentalPrice = document.getElementById('editSchedulesRentalPrice').value;

      const formData = new FormData();
      formData.append('car_name', schedulesRoleCarName);
      formData.append('from_location', schedulesFromLocation);
      formData.append('to_location', schedulesToLocation);
      formData.append('date_trip', schedulesDate);
      formData.append('departure_time', schedulesDepartureTime);
      formData.append('arrival_time', schedulesArrivalTime);
      formData.append('status_still_available', schedulesstatus_still_available);
      formData.append('available_seats', schedulesAvailableSeats);
      formData.append('rental_price', schedulesRentalPrice);

      await editSchedules(schedulesId, formData);
    });

    // delete
    document.addEventListener('click', async function (event) {
      if (event.target.classList.contains('delete-schedules-btn')) {
        const schedulesId = event.target.dataset.schedulesId;
        const confirmation = confirm("Are you sure you want to delete this schedules?");
        if (confirmation) {
          try {
            await deleteSchedules(schedulesId);
            const schedules = await fetchSchedules();
            displaySchedules(schedules);
          } catch (error) {
            alert(error.message);
          }
        }
      }
    });

    document.getElementById('schedulesSearchBtn').addEventListener('click', function () {
      // Get search term from input fields
      const fromLocation = document.getElementById('schedulesFromLocation').value;
      const toLocation = document.getElementById('schedulesToLocation').value;
      const dateTrip = document.getElementById('schedulesDateTrip').value;

      // Combine the search criteria into a single search term
      const searchTerm = {
        fromLocation: fromLocation,
        toLocation: toLocation,
        dateTrip: dateTrip
      };

      // Display schedules based on search term
      searchDisplaySchedules(searchTerm);
    });


  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
});

// users
document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();
  displayUsers(users);

  // add
  const addUsersForm = document.getElementById('addUsersForm');
  const errorAlert = document.getElementById('usersErrorAlert');
  const successAlert = document.getElementById('usersSuccessAlert');

  addUsersForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorAlert.classList.add('d-none');
    const username = document.getElementById('username').value;
    const full_name = document.getElementById('fullNameUsersAdmin').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone_number = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;
    const role = document.getElementById('role').value;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phone_number);
    formData.append('address', address);
    formData.append('role', role);
    try {
      await addUsersAdmin(formData);
      addUsersForm.reset();
      const users = await fetchUsers();
      displayUsers(users);
      successAlert.classList.remove('d-none');
    } catch (error) {
      console.error('Error adding users:', error);
      errorAlert.classList.remove('d-none');
    }
  });

  // edit
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('edit-usersAdmin-btn')) {
      const userId = event.target.dataset.userId;
      try {
        const userData = await fetchUsersAdminDetails(userId);
        displayEditUserModal(userData);
      } catch (error) {
        alert(error.message);
      }
    }
  });

  function displayEditUserModal(data) {
    document.getElementById('editUserId').value = data.id_user;
    document.getElementById('editUsername').value = data.username;
    document.getElementById('editFullNameUsersAdmin').value = data.full_name;
    document.getElementById('editEmail').value = data.email;
    document.getElementById('editPassword').value = data.password; // Ensure to handle passwords securely in a real app
    document.getElementById('editPhoneNumber').value = data.phone_number;
    document.getElementById('editAddress').value = data.address;
    document.getElementById('editRole').value = data.role;

    const editUserModalElement = document.getElementById('editUsersModal');
    const editUserModal = new bootstrap.Modal(editUserModalElement);

    editUserModalElement.addEventListener('hidden.bs.modal', function () {
      editUserModal.hide();
      document.body.classList.remove('modal-open');
      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
    });

    editUserModal.show();
  }

  // Event listener for edit user form submission
  const editUsersForm = document.getElementById('editUsersForm');
  editUsersForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('editUserId').value;
    const userName = document.getElementById('editUsername').value;
    const fullName = document.getElementById('editFullNameUsersAdmin').value;
    const email = document.getElementById('editEmail').value;
    const phoneNumber = document.getElementById('editPhoneNumber').value;
    const address = document.getElementById('editAddress').value;
    const role = document.getElementById('editRole').value;

    const formData = new FormData();
    formData.append('username', userName);
    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('address', address);
    formData.append('role', role);
    try {
      await editUsersAdmin(userId, formData);
      const users = await fetchUsers();
      displayUsers(users);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  });

  // delete
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete-usersAdmin-btn')) {
      const userId = event.target.dataset.userId;
      const confirmation = confirm("Are you sure you want to delete this user?");
      if (confirmation) {
        try {
          await deleteUsersAdmin(userId);
          const users = await fetchUsers();
          displayUsers(users);
        } catch (error) {
          alert(error.message);
        }
      }
    }
  });

});

// orders
document.addEventListener('DOMContentLoaded', async () => {
  const orders = await fetchOrders();
  displayOrders(orders);

  // add
  const addOrdersForm = document.getElementById('addOrdersForm');
  const errorAlert = document.getElementById('ordersErrorAlert');
  const successAlert = document.getElementById('ordersSuccessAlert');
  addOrdersForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorAlert.classList.add('d-none');
    const fromLocation = document.getElementById('fromLocation').value;
    const toLocation = document.getElementById('toLocation').value;
    const numParticipants = document.getElementById('numParticipants').value;

    // Mengubah format tanggal
    const dateOrdersInput = document.getElementById('dateOrders').value;
    const [year, month, day] = dateOrdersInput.split('-');
    const dateOrders = `${day}-${month}-${year}`;

    const departureTimeOrders = document.getElementById('departureTimeOrders').value;
    const arrivalTimeOrders = document.getElementById('arrivalTimeOrders').value;
    const paymentGatewayOrders = document.getElementById('paymentGatewayOrders').value;

    const formData = new FormData();
    formData.append('from_location', fromLocation);
    formData.append('to_location', toLocation);
    formData.append('number_participants', numParticipants);
    formData.append('date_trip', dateOrders);
    formData.append('departure_time', departureTimeOrders);
    formData.append('arrival_time', arrivalTimeOrders);
    formData.append('payment_gateway', paymentGatewayOrders);
    try {
      await addOrders(formData);
      addOrdersForm.reset();
      const orders = await fetchOrders();
      displayOrders(orders);
      successAlert.classList.remove('d-none');
    } catch (error) {
      console.error('Error adding orders:', error);
      errorAlert.classList.remove('d-none');
    }
  });

  // edit
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('edit-orders-btn')) {
      const orderId = event.target.dataset.orderId;
      try {
        const ordersData = await fetchOrdersDetails(orderId);
        displayEditOrdersModal(ordersData);
      } catch (error) {
        alert(error.message);
      }
    }
  });

  function displayEditOrdersModal(order) {
    document.getElementById('editOrderId').value = order.id_order;
    document.getElementById('statusOrders').value = order.status_order;
    document.getElementById('statusPaymentOrders').value = order.status_payment;

    const editOrdersModalElement = document.getElementById('editOrdersModal');
    const editOrdersModal = new bootstrap.Modal(editOrdersModalElement);

    editOrdersModalElement.addEventListener('hidden.bs.modal', function () {
      editOrdersModal.hide();
      document.body.classList.remove('modal-open');
      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
    });

    editOrdersModal.show();
  }

  const editOrdersForm = document.getElementById('editOrdersForm');
  editOrdersForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const orderId = document.getElementById('editOrderId').value;
    const statusOrders = document.getElementById('statusOrders').value;
    const statusPaymentOrders = document.getElementById('statusPaymentOrders').value;

    const formData = new FormData();
    formData.append('order_status', statusOrders);
    formData.append('status_payment', statusPaymentOrders);
    try {
      await editOrders(orderId, formData);
      const orders = await fetchOrders();
      displayOrders(orders);
    } catch (error) {
      console.error('Error editing orders:', error);
    }
  });

  // delete
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete-orders-btn')) {
      const orderId = event.target.dataset.orderId;
      const confirmation = confirm("Are you sure you want to delete this orders?");
      if (confirmation) {
        try {
          await deleteOrders(orderId);
          const orders = await fetchOrders();
          displayOrders(orders);
        } catch (error) {
          alert(error.message);
        }
      }
    }
  });

});

// reporting
document.addEventListener('DOMContentLoaded', async () => {
  const reports = await fetchTopUsers();
  displayTopUsers(reports);

  const reports2 = await fetchRoutes();
  displayRoutes(reports2);

  const reports3 = await fetchPopularSchedules();
  displayPopularSchedules(reports3);

});

// Settings
document.addEventListener('DOMContentLoaded', async () => {
  const profile = await fetchUsersAdmin();
  displayUsersAdmin(profile);

  // edit
  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('edit-usersAdminProfile-btn')) {
      const userId = event.target.dataset.userId;
      try {
        const userData = await fetchUsersAdminDetails(userId);
        displayEditUserModalProfile(userData);
      } catch (error) {
        alert(error.message);
      }
    }
  });

  function displayEditUserModalProfile(data) {
    document.getElementById('editUserIdProfile').value = data.id_user;
    document.getElementById('editFullNameUsersAdminProfile').value = data.full_name;
    document.getElementById('editEmailProfile').value = data.email;
    document.getElementById('editPasswordProfile').value = data.password; // Ensure to handle passwords securely in a real app
    document.getElementById('editPhoneNumberProfile').value = data.phone_number;
    document.getElementById('editAddressProfile').value = data.address;

    const editUserModalElement = document.getElementById('editUsersModalProfile');
    const editUserModal = new bootstrap.Modal(editUserModalElement);

    editUserModalElement.addEventListener('hidden.bs.modal', function () {
      editUserModal.hide();
      document.body.classList.remove('modal-open');
      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
    });

    const editUsersFormProfile = document.getElementById('editUsersFormProfile');
    editUsersFormProfile.addEventListener('submit', async (event) => {
      event.preventDefault();

      const userId = document.getElementById('editUserIdProfile').value;
      const fullName = document.getElementById('editFullNameUsersAdminProfile').value;
      const email = document.getElementById('editEmailProfile').value;
      const password = document.getElementById('editPasswordProfile').value;
      const phoneNumber = document.getElementById('editPhoneNumberProfile').value;
      const address = document.getElementById('editAddressProfile').value;

      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone_number', phoneNumber);
      formData.append('address', address);
      try {
        await editUsersAdminProfile(userId, formData);
        const users = await fetchUsersAdmin();
        displayUsersAdmin(users);
      } catch (error) {
        console.error('Error editing user:', error);
      }
    });

    editUserModal.show();
  }


});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('logout').addEventListener('click', async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });

  async function fetchUserData() {
    try {
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function setFullName() {
    const fullNameElement = document.getElementById("fullName");
    const fullNameDashboard = document.getElementById("fullNameDashboard");
    const userData = await fetchUserData();
    if (userData && userData.full_name) {
      fullNameElement.textContent = userData.full_name;
      fullNameDashboard.textContent = userData.full_name;
    }
  }

  setFullName();
});
