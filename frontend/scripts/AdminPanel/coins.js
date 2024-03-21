const allCoins = document.getElementById("all-coins");
const pendingRequests = document.getElementById("pending-requests");
const accepetBtn = document.getElementsByClassName("accept-btn");
const rejectBtn = document.getElementsByClassName("reject-btn");
const getAllCoinsRequests = () => {
  axios
    .get(
      `http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/coins_requests/get.php`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        const coins = data.coins_requests;
        showCoins(coins);
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching flight details:", error);
      throw error;
    });
};
const getPendingCoinsRequests = () => {
  axios
    .get(
      `http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/coins_requests/get_by_status.php`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        const coins = data.coins_requests;
        console.log(coins);
        showPendingRequests(coins);
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching flight details:", error);
      throw error;
    });
};
const showPendingRequests = (coinList) => {
    pendingRequests.innerHTML = generatependingRequestCardHtml(coinList);
  };
  const generatependingRequestCardHtml = (coinsList) => {
    let html = "";
    coinsList.forEach((coin, index) => {
      html += `
          <tr>
          <td>${coin.username}</td>
          <td>${coin.user_coins}</td>
          <td>${coin.coins}</td>
          <td>${coin.created_at}</td>
          <td>${coin.status}</td>
          <td><button class="accept-btn" onclick="acceptRequest(${coin.id})">Accept</button></td>
          <td><button class="reject-btn" onclick="rejectRequest(${coin.id})">Reject</button></td>
              </tr>
          `;
    });
    return html;
  };
const showCoins = (coinList) => {
  allCoins.innerHTML = generateCoinsCardHtml(coinList);
};
const generateCoinsCardHtml = (coinsList) => {
  let html = "";
  coinsList.forEach((coin, index) => {
    html += `
        <tr>
        <td>${coin.username}</td>
        <td>${coin.user_coins}</td>
        <td>${coin.coins}</td>
        <td>${coin.created_at}</td>
        <td>${coin.status}</td>
      
        
            </tr>
        `;
  });
  return html;
};
const updateStatus=(requestId, action)=> {
  const formData = new FormData();
  formData.append("request_id", requestId);
  formData.append("action", action);
    axios.post("http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/coins_requests/update.php", formData)
    .then(response => {
        const data = response.data;
        if (data.status === 'success') {
            console.log('Status updated successfully:', data.message);
            getPendingCoinsRequests();
            getAllCoinsRequests();
        } else {
            console.error('Error updating status:', data.message);
        }
    })
    .catch(error => {
        console.error('An error occurred while updating status:', error);
    });
  }
  const acceptRequest=(requestId)=> {
    console.log('accepting request:', requestId);
    updateStatus(requestId, 'accept');
  }
  
  const rejectRequest=(requestId)=> {
    updateStatus(requestId, 'reject');
  }

  
getPendingCoinsRequests();
getAllCoinsRequests();
