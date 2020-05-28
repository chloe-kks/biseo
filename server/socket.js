
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('disconnect', function(){
            console.log('disconnected')
        })

		socket.on('vote', function(votename){
			console.log("vote create: ");
			console.log(votename);
			socket.emit('vote', votename);
		})
    });
  };
