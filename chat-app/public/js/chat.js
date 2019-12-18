const socket = io();

socket.on('message', function(message) {
    console.log(message);
});

//Elements

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('#message');
const $messageFormButton = $messageForm.querySelector('#submit');

const $sendLocationButton = document.querySelector('#location');
const $messages = document.querySelector('#messages');

//Templates

const messageTemplates = document.querySelector('#message-template').innerHTML;
const locationMessageTemplates = document.querySelector('#location-message-template').innerHTML

socket.on('message', function(message) {
    console.log(message);
    const html = Mustache.render(messageTemplates, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html);
});

socket.on('locationMessage', function(message){
    console.log(message);
    const html = Mustache.render(locationMessageTemplates, {
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html);
});

$messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', $messageFormInput.value, function(error){
        $messageFormButton.removeAttribute('disabled');
        $messageForm.reset();
        if(error) {
            return console.log(error);
        }
        console.log('this message was delivered!');
    });
});

$sendLocationButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (!navigator.geolocation) {
        return alert('Geo not found!');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('setGeoposition', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(){
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    })
});