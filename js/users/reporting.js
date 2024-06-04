export async function fetchTopUsers() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/top_users', {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch top users');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export function displayTopUsers(topUsers) {
    const topUsersContainer = document.getElementById('topUsersTableBody');
    topUsersContainer.innerHTML = '';

    // Check if topUsers has the correct structure
    if (topUsers && Array.isArray(topUsers.top_users)) {
        const usersArray = topUsers.top_users;

        usersArray.forEach((user, index) => {
            const userRow = document.createElement('tr');

            userRow.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td class="text-center">${user.username}</td>
                <td class="text-center">${user.full_name}</td>
                <td class="text-center">${user.order_count}</td>
            `;

            topUsersContainer.appendChild(userRow);
        });
    } else {
        console.error('topUsers is not structured correctly', topUsers);
    }
}

export async function fetchRoutes() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/popular_route', {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export function displayRoutes(routes) {
    const routesContainer = document.getElementById('popularRouteTableBody');
    routesContainer.innerHTML = '';

    // Check if routes is an array
    if (Array.isArray(routes)) {
        routes.forEach((route, index) => {
            const routeRow = document.createElement('tr');

            routeRow.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td class="text-center">${route.from_location}</td>
                <td class="text-center">${route.to_location}</td>
                <td class="text-center">${route.order_count}</td>
            `;

            routesContainer.appendChild(routeRow);
        });
    } else {
        console.error('routes is not an array', routes);
    }
}

export async function fetchPopularSchedules() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/popular_schedule', {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch schedules');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export function displayPopularSchedules(schedules) {
    const schedulesContainer = document.getElementById('popularScheduleTableBody');
    schedulesContainer.innerHTML = '';

    // Check if schedules is an array
    if (Array.isArray(schedules)) {
        schedules.forEach((schedule, index) => {
            const scheduleRow = document.createElement('tr');

            scheduleRow.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td class="text-center">${schedule.from_location}</td>
                <td class="text-center">${schedule.to_location}</td>
                <td class="text-center">${schedule.departure_time}</td>
                <td class="text-center">${schedule.arrival_time}</td>
                <td class="text-center">${schedule.order_count}</td>
            `;

            schedulesContainer.appendChild(scheduleRow);
        });
    } else {
        console.error('schedules is not an array', schedules);
    }
}