function createChart() {
    const labels = ["January", "February", "March", "April", "May", "June", "July"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Total flights',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#202B32',
            tension: 0.1
        }]
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Total Flights Chart',
                    font: {
                        size: 24,
                        weight: 'bold',
                    },
                    color: 'black'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'black',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    ticks: {
                        color: 'black',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}
createChart()