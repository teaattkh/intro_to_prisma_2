// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


// DOM elements
const dataContainer = document.getElementById('data-container');

async function fetchAndDisplayData() {
    try {
        // Show loading state
        dataContainer.textContent = 'Loading data...';
        
        // Fetch data from your Express API
        const response = await fetch('http://localhost:5555/api/data');
        
        if (!response.ok) {
          console.log(`response not okay`)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data)

        // Display the data
        if (data.length === 0) {
            dataContainer.textContent = 'No data found';
            return;
        }

        // Create HTML for the data
        const html = `
            <ul>
                ${data.map(item => `
                    <li>
                        <strong>ID:</strong> ${item.id}<br>
                        ${Object.entries(item)
                            .filter(([key]) => key !== 'id')
                            .map(([key, value]) => `
                                <strong>${key}:</strong> ${value}<br>
                            `).join('')}
                    </li>
                `).join('')}
            </ul>
        `;

        dataContainer.innerHTML = html;
    } catch (error) {
        console.error('Error:', error);
        dataContainer.textContent = 'Failed to load data. Check console for details.';
    }
}

// Fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);