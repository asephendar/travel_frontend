export async function fetchCars(id_user) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/cars?id_user=${id_user}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    const data = await response.json();
    return data.cars;
  } catch (error) {
    throw error;
  }
}

let currentPage = 1;
const rowsPerPage = 3;

export function displayCars(cars) {
  const carTableBody = document.getElementById('carTableBody');
  const schedulesRoleCarName = document.getElementById('schedulesRoleCarName');
  const editSchedulesRoleCarName = document.getElementById('editSchedulesRoleCarName');
  
  carTableBody.innerHTML = '';
  schedulesRoleCarName.innerHTML = '<option value="">Select car</option>';
  editSchedulesRoleCarName.innerHTML = '<option value="">Select car</option>';

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedCars = cars.slice(start, end);

  paginatedCars.forEach((car, index) => {
    const row = `
      <tr>
        <th scope="row" class="text-center">${start + index + 1}</th>
        <td><img src="${car.image}" alt="Car Image" style="max-width: 150px;"></td>
        <td>${car.name}</td>
        <td style="white-space: wrap;">${car.specification}</td>
        <td class="text-center">${car.capacity}</td>
        <td class="text-center">
          <button type="button" class="btn btn-warning btn-sm edit-car-btn" data-bs-toggle="modal" data-bs-target="#editCarModal" data-car-id="${car.id_car}">
          <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" class="btn btn-danger btn-sm delete-car-btn" data-car-id="${car.id_car}">
            <i class="bi bi-trash-fill"></i> Delete
          </button>
        </td>
      </tr>
    `;
    carTableBody.innerHTML += row;
  });

  cars.forEach((car) => {
    schedulesRoleCarName.innerHTML += `<option value="${car.name}">${car.name}</option>`;
    editSchedulesRoleCarName.innerHTML += `<option value="${car.name}">${car.name}</option>`;
  });

  displayPagination(cars);
}

function displayPagination(cars) {
  const paginationControls = document.getElementById('paginationControlsCars');
  paginationControls.innerHTML = '';

  const pageCount = Math.ceil(cars.length / rowsPerPage);

  // Previous button
  const prevPageItem = document.createElement('li');
  prevPageItem.classList.add('page-item');
  if (currentPage === 1) prevPageItem.classList.add('disabled');
  prevPageItem.innerHTML = '<a class="page-link" href="#">Previous</a>';
  prevPageItem.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayCars(cars);
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
      displayCars(cars);
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
      displayCars(cars);
    }
  });
  paginationControls.appendChild(nextPageItem);
}

// Example usage
const cars = [/* Your cars data */];

document.addEventListener('DOMContentLoaded', () => {
  displayCars(cars);
});


// Add car
export async function addCar(carData) {
  try {
    const response = await fetch('http://127.0.0.1:5000/cars', {
      method: 'POST',
      body: carData,
      credentials: 'include'
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to add car');
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}

export async function fetchCarDetails(carId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/cars/${carId}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch car data: ' + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car data:', error);
    throw new Error('Failed to load car data. Please try again later.');
  }
}

export async function editCar(carId, formData) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/cars/${carId}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to edit car');
    }

    const cars = await fetchCars();
    displayCars(cars);
    carsEditSuccessAlert.textContent = 'Car edited successfully';
    carsEditSuccessAlert.classList.remove('d-none');
  } catch (error) {
    console.error('Error editing car:', error);
    editErrorAlert.textContent = error.message;
    editErrorAlert.classList.remove('d-none');
  }
}

export async function deleteCar(carId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/cars/${carId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to delete car');
    }

    const cars = await fetchCars();
    displayCars(cars);
  } catch (error) {
    console.error('Error deleting car:', error);
    alert('Failed to delete car. Please try again later.');
  }
}
