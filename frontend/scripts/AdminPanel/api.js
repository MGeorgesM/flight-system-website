const getAllFlights = (handler) => {
    axios
      .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/flights/get.php`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
            const flights = data.flights;
            console.log(flights);
            handler(flights);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error);
        throw error;
      });
  };
  
    const getAllBookings = (id, email,handler) => {
      axios
        .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/bookings/get.php?user_id=${id}&email=${email}`)
        .then((response) => {
          const data = response.data;
          if (data.status === "success") {
            const bookings = data.bookings;
            handler(bookings);
           
          } else {
            throw new Error(data.message); 
          }
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    };
    const getAllUsers = (handler) => {
      axios
        .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/users/get.php`)
        .then((response) => {
          const data = response.data;
          if (data.status === "success") {
            const users = data.users;
            handler(users);
           
          } else {
            throw new Error(data.message); 
          }
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    };