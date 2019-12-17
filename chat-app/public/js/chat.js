const socket = io();

socket.on('message', function(message) {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, function(error){

        if(error) {
            return console.log(error);
        }
        console.log('this message was delivered!');
    });
});

document.querySelector('#location').addEventListener('click', function(e) {
    e.preventDefault();
    if (!navigator.geolocation) {
        return alert('Geo not found!');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('setGeoposition', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(){
            console.log('Location shared!');
        });
    })
});