import { fetchSchedulesIndex, displaySchedulesIndex } from './schedules.js';
import { fetchSchedules, displaySchedules, fetchSchedulesDetails, addSchedules, editSchedules, deleteSchedules, searchDisplaySchedules } from './schedules.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const schedules = await fetchSchedulesIndex();
    displaySchedulesIndex(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
});


document.addEventListener('DOMContentLoaded', async () => {
  try {
    const schedules = await fetchSchedules();
    displaySchedules(schedules);

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