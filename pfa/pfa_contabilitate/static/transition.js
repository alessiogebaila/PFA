const loadingScreen = document.createElement('div');
loadingScreen.innerHTML = `
    <div class="loading-container">
        <div class="purple-dot"></div>
        <div class="purple-dot"></div>
        <div class="purple-dot"></div>
    </div>
`;
loadingScreen.style.position = 'fixed';
loadingScreen.style.top = '0';
loadingScreen.style.left = '0';
loadingScreen.style.width = '100%';
loadingScreen.style.height = '100%';
loadingScreen.style.backgroundColor = '#F5F5F5';
loadingScreen.style.display = 'flex';
loadingScreen.style.justifyContent = 'center';
loadingScreen.style.alignItems = 'center';
loadingScreen.style.zIndex = '9999';

function showLoading() {
    document.body.appendChild(loadingScreen);
}

function hideLoading() {
    if (document.body.contains(loadingScreen)) {
        document.body.removeChild(loadingScreen);
    }
}

document.addEventListener('click', function(event) {
    const target = event.target.closest('a');
    if (target && target.href && !target.target && target.origin === window.location.origin) {
        event.preventDefault();
        showLoading();
        fetch(target.href)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const newDocument = parser.parseFromString(html, 'text/html');
                document.body.innerHTML = newDocument.body.innerHTML;
                document.title = newDocument.title;
                window.history.pushState({}, '', target.href);
                hideLoading();
            })
            .catch(error => {
                console.error('Error:', error);
                hideLoading();
            });
    }
});

window.addEventListener('popstate', function() {
    showLoading();
    fetch(window.location.href)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const newDocument = parser.parseFromString(html, 'text/html');
            document.body.innerHTML = newDocument.body.innerHTML;
            document.title = newDocument.title;
            hideLoading();
        })
        .catch(error => {
            console.error('Error:', error);
            hideLoading();
        });
});