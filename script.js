let transactions = JSON.parse(localStorage.getItem('finguard_data')) || [];
let myChart;

function initChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const data = getCategoryData();
    
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444']
            }]
        },
        options: { responsive: true, cutout: '70%' }
    });
}

function getCategoryData() {
    let totals = { "Food": 0, "Transport": 0, "Bills": 0, "Shopping": 0 };
    transactions.forEach(t => totals[t.category] += parseFloat(t.amount));
    return totals;
}

function addEntry() {
    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    if(!desc || !amount) return alert("Please fill all fields");

    transactions.push({ desc, amount, category, date: new Date().toLocaleDateString() });
    localStorage.setItem('finguard_data', JSON.stringify(transactions));
    
    updateUI();
    document.getElementById('desc').value = "";
    document.getElementById('amount').value = "";
}

function updateUI() {
    const list = document.getElementById('transactionList');
    list.innerHTML = transactions.map(t => `
        <li class="t-item">
            <span>${t.desc} <small>(${t.date})</small></span>
            <span class="t-cat">${t.category}: PKR ${t.amount}</span>
        </li>
    `).reverse().join('');

    // Update Chart
    const newData = getCategoryData();
    myChart.data.datasets[0].data = Object.values(newData);
    myChart.data.labels = Object.keys(newData);
    myChart.update();
}

// Initial Load
window.onload = () => {
    initChart();
    updateUI();
};