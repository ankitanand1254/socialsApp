class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://18.222.154.99:5000');
    
        if (this.userEmail){
            this.connectionHandler();
        }
    
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...');

            self.socket.email('join_room', {
                user_email: self.userEmail,
                chatroom: 'socialsApp'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined', data);
            })
        });

        //send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.email('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'socialApp'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        })
    }
}