console.log('Client js run');

const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  console.log(input.value);
  const location = input.value;

  if(location === '') {
    return  message1.textContent = 'Please enter a location!';
  }

  message1.textContent = 'Loading...';
  message2.textContent = '';

  fetch(`http://127.0.0.1:3030/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if ( data.error) {
        console.log(data.error);
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    })
  });
  
  form.reset();

});