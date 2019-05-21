const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = '';

    // Here we request data from that url
    fetch(`http://127.0.0.1:3000/weather?address=${location}`).then(response => {
        response.json().then(({ error, location, forecast }) => {
            if (error) {
                messageOne.innerHTML = data.error;
                return;
            }
            messageOne.innerHTML = location;
            messageTwo.innerHTML = forecast;
        });
    });
});