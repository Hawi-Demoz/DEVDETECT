// Define startTime once at the very top (page load)
const startTime = Date.now();

function detectDeviceInfo() {
    // OS Detection
    const os = navigator.userAgent;
    let osName = 'Unknown OS';
    if (os.includes('Windows')) osName = 'Windows';
    else if (os.includes('Mac')) osName = 'MacOS';
    else if (os.includes('Linux')) osName = 'Linux';
    else if (/Android/.test(os)) osName = 'Android';
    else if (/iPhone|iPad|iPod/.test(os)) osName = 'iOS';

    // Browser Detection
    let browser = 'Unknown';
    if (os.includes('Firefox/')) browser = 'Firefox';
    else if (os.includes('Edg/')) browser = 'Edge';
    else if (os.includes('Chrome/')) browser = 'Chrome';
    else if (os.includes('Safari/') && !os.includes('Chrome')) browser = 'Safari';

    // Timezone & Time
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const time = new Date().toLocaleTimeString();

    // Screen Resolution
    const resolution = `${window.screen.width} x ${window.screen.height}`;

    // Device Type
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    // Network Connection Type
    let connectionType = 'Not supported';
    if (navigator.connection && navigator.connection.effectiveType) {
      connectionType = navigator.connection.effectiveType;
    }

    // Inject into HTML
    document.getElementById('os').textContent = osName;
    document.getElementById('browser').textContent = browser;
    document.getElementById('resolution').textContent = resolution;
    document.getElementById('timezone').textContent = timezone;
    document.getElementById('current-time').textContent = time;
    document.getElementById('device-type').textContent = deviceType;
    document.getElementById('connection').textContent = connectionType;
}

// Show user agent outside the function (only needs to run once)
document.getElementById('user-agent').textContent = navigator.userAgent;

// Initial load
detectDeviceInfo();

// Update time every second
setInterval(() => {
    document.getElementById('current-time').textContent = new Date().toLocaleTimeString();
}, 1000);

// Update uptime every second
setInterval(() => {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / 1000 / 60) % 60);
    const hours = Math.floor(elapsed / 1000 / 60 / 60);
    const formatted = `${hours}h ${minutes}m ${seconds}s`;
    document.getElementById('uptime').textContent = formatted;
}, 1000);

// Refresh on button click
document.getElementById('refresh').addEventListener('click', detectDeviceInfo);

// Copy info button logic
document.getElementById('copy-info').addEventListener('click', () => {
    const info = `
Operating System: ${document.getElementById('os').textContent}
Browser: ${document.getElementById('browser').textContent}
Screen Resolution: ${document.getElementById('resolution').textContent}
Time Zone: ${document.getElementById('timezone').textContent}
Current Time: ${document.getElementById('current-time').textContent}
Device Type: ${document.getElementById('device-type').textContent}
User Agent: ${document.getElementById('user-agent').textContent}
Connection Type: ${document.getElementById('connection').textContent}
Page Uptime: ${document.getElementById('uptime').textContent}
    `.trim();

    navigator.clipboard.writeText(info).then(() => {
        alert("Info copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy info.");
    });
});

// Theme toggle logic
const toggle = document.getElementById('theme-toggle');

// Apply saved theme on load
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    document.body.classList.toggle("light");
    const newTheme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
});
