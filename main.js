let elements = document.querySelector(".elements");
let tabledata = document.getElementById("table-data")
let searchbar = document.getElementById("searchbar");
let dataStore = []

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM Fully Loaded");
    const URL = "https://api.coincap.io/v2/assets";
    hideTable()
    getData();

    function getData() {
        fetch(URL)
            .then((response) => {
                if (response.ok) {
                    console.log("Fully Loaded Data");
                    hideLoader()
                    return response.json()
                }
            })
            .then(data => {
                dataStore = data.data
                tabledata.innerHTML = getHTML(data.data)
                console.log(dataStore)
            })
    }
    // Function to hide the loader
    function hideLoader() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('mytable').style.display = '';
    }
    function hideTable() {
        document.getElementById('mytable').style.display = 'none';
    }
    function getHTML(data) {
        return data.map(({ id, rank, name, priceUsd, marketCapUsd, supply, volumeUsd24Hr }) => generateHTML(id, rank, name, priceUsd, marketCapUsd, supply, volumeUsd24Hr)).join('');
    }
    function generateHTML(id, rank, name, priceUsd, marketCapUsd, supply, volumeUsd24Hr) {
        return `
        <tr key=${id}>
            <td>${rank}</td>
            <td>${name}</td>
            <td>${priceUsd}</td>
            <td>${marketCapUsd}</td>
            <td>${supply}</td>
            <td>${volumeUsd24Hr}</td>
        </tr>
        `;
    }
    function noResultHTML() {
        return `
            <tr>
                <td>No Results Found</td>
                <td>No Results Found</td>
                <td>No Results Found</td>
                <td>No Results Found</td>
                <td>No Results Found</td>
                <td>No Results Found</td>
            </tr>
        `;
    }

    searchbar.addEventListener('keyup', function (e) {
        let currentword = e.target.value;
        let word = capitalizeFirstLetter(currentword)
        let filteredData = dataStore.filter(o => o.name.includes(word));
        tabledata.innerHTML = filteredData.length ? getHTML(filteredData) : noResultHTML();
    });
    function capitalizeFirstLetter(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

})