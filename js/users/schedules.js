export async function fetchSchedules(id_user) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/schedules?id_user=${id_user}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch schedules');
    }

    const data = await response.json();

    return data.schedules;
  }
  catch (error) {
    throw error;
  }
}

let currentPage = 1;
const rowsPerPage = 3;

export function displaySchedules(schedules) {
  const scheduleTableBody = document.getElementById('schedulesTableBody');
  const schedulesFromLocation = document.getElementById('schedulesFromLocation');
  const schedulesToLocation = document.getElementById('schedulesToLocation');
  
  scheduleTableBody.innerHTML = '';
  schedulesFromLocation.innerHTML = '<option value="">Select location</option>';
  schedulesToLocation.innerHTML = '<option value="">Select location</option>';

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedSchedules = schedules.slice(start, end);

  paginatedSchedules.forEach((schedule, index) => {
    const availabilityText = schedule.status_still_available ? "Yes" : "No";
    const row = `
      <tr>
        <th scope="row" class="text-center">${start + index + 1}</th>
        <td><img src="${schedule.car.image}" alt="Car Image" style="max-width: 150px;"></td>
        <td class="text-center">${schedule.car.name}</td>
        <td style="white-space: wrap;">${schedule.car.specification}</td>
        <td class="text-center">${schedule.from_location}</td>
        <td class="text-center">${schedule.to_location}</td>
        <td class="text-center">${schedule.date_trip}</td>
        <td class="text-center">${schedule.departure_time} - ${schedule.arrival_time}</td>
        <td class="text-center"><span class="badge bg-success">${availabilityText}</span></td>
        <td class="text-center">${schedule.car.capacity}</td>
        <td class="text-center">${schedule.rental_price}</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm edit-schedules-btn" data-bs-toggle="modal" data-bs-target="#addOrdersModal" data-schedules-id="${schedule.id_schedule}">
          <i class="bi bi-cart"></i> Add Order
          </button>
          <!-- <button type="button" class="btn btn-danger btn-sm delete-schedules-btn" data-schedules-id="${schedule.id_schedule}">
            <i class="bi bi-trash-fill"></i> Delete
          </button> -->
        </td>
      </tr>
    `;
    scheduleTableBody.innerHTML += row;
  });

  schedules.forEach((schedule) => {
    if (!Array.from(schedulesFromLocation.options).some(option => option.value === schedule.from_location)) {
      schedulesFromLocation.innerHTML += `<option value="${schedule.from_location}">${schedule.from_location}</option>`;
    }
    if (!Array.from(schedulesToLocation.options).some(option => option.value === schedule.to_location)) {
      schedulesToLocation.innerHTML += `<option value="${schedule.to_location}">${schedule.to_location}</option>`;
    }
  });

  displayPagination(schedules);
}

function displayPagination(schedules) {
  const paginationControls = document.getElementById('paginationControlsSchedules');
  paginationControls.innerHTML = '';

  const pageCount = Math.ceil(schedules.length / rowsPerPage);

  // Previous button
  const prevPageItem = document.createElement('li');
  prevPageItem.classList.add('page-item');
  if (currentPage === 1) prevPageItem.classList.add('disabled');
  prevPageItem.innerHTML = '<a class="page-link" href="#">Previous</a>';
  prevPageItem.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displaySchedules(schedules);
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
      displaySchedules(schedules);
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
      displaySchedules(schedules);
    }
  });
  paginationControls.appendChild(nextPageItem);
}

// Example usage
const schedules = [/* Your schedules data */];

document.addEventListener('DOMContentLoaded', () => {
  displaySchedules(schedules);
});


// search.js

export async function searchSchedules(searchTerm) {
  const queryParams = new URLSearchParams({
    from_location: searchTerm.fromLocation,
    to_location: searchTerm.toLocation,
    date_trip: searchTerm.dateTrip
  });

  try {
    const response = await fetch(`http://127.0.0.1:5000/search_schedule?${queryParams.toString()}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch schedules');
    }

    const data = await response.json();

    return data.schedules;
  } catch (error) {
    throw error;
  }
}

export async function searchDisplaySchedules(searchTerm) {
  try {
    const schedules = await searchSchedules(searchTerm);
    displaySchedules(schedules);
  } catch (error) {
    console.error('Error displaying schedules:', error);
  }
}


export async function addSchedules(scheduleData) {
  try {
    const response = await fetch('http://127.0.0.1:5000/schedules', {
      method: 'POST',
      body: scheduleData,
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to add schedule');
    }

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function fetchSchedulesDetails(scheduleId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/schedules/${scheduleId}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch schedule details');
    }

    const data = await response.json();

    return data.schedule;
  } catch (error) {
    throw error;
  }
}

export async function editSchedules(schedulesId, formData) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/schedules/${schedulesId}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to edit schedule');
    }

    const schedules = await fetchSchedules();
    displaySchedules(schedules);
    schedulesEditSuccessAlert.textContent = 'Schedule edited successfully';
    schedulesEditSuccessAlert.classList.remove('d-none');

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function deleteSchedules(scheduleId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/schedules/${scheduleId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to delete schedule');
    }

    const data = await response.json();

    return data.message;
  } catch (error) {
    throw error;
  }
}