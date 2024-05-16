// Ambil elemen yang akan diisi dengan data mobil
const carGallery = document.getElementById('carGallery');

// Fetch data mobil dari URL
fetch('http://127.0.0.1:5000/schedules')
    .then(response => response.json())
    .then(data => {
        // Loop melalui setiap jadwal perjalanan dan tampilkan mobil yang tersedia
        data.schedules.forEach(schedule => {
            const car = schedule.car;
            const availabilityText = schedule.status_still_available ? "Yes" : "No";
            const carCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${car.image}" class="card-img-top" alt="${car.name}">
                        <div class="card-body">
                            <h5 class="card-title">${car.name}</h5>
                            <p class="card-text">${car.specification}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Capacity : ${car.capacity} passenger</li>
                                <li class="list-group-item">Available for Hire : ${availabilityText}</li>
                                <li class="list-group-item">Rental Price : ${schedule.rental_price}</li>
                                <li class="list-group-item">Departure Schedule : ${schedule.date_trip} 
                                <li class="list-group-item">Departure Time : ${schedule.departure_time} - ${schedule.arrival_time}</li>
                                <li class="list-group-item">From Location : ${schedule.from_location} to ${schedule.to_location}</li>
                                </li>

                            </ul><br>
                            <button class="btn btn-primary btn-block">Book Now</button>
                        </div>
                    </div>
                </div>
            `;
            // Tambahkan card mobil ke dalam galeri
            carGallery.innerHTML += carCard;
        });
    })
    .catch(error => console.error('Error fetching schedules:', error));



