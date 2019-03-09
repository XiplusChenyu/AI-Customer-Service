var customer = 'right';
var robot = 'left';
var apigClient = apigClientFactory.newClient();
var token = location.toString().split('chat.html?code=')[1];

(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text;
        this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        var getMessageText, message_side, sendMessage, getReply;

        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };



        sendMessage = function (text, sender) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = sender;

            message = new Message({
                text: text,
                message_side: message_side
            });

            message.draw();
            return $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
        };

        getReply = function(msg){
            var body = toBotRequest(msg, token);

            apigClient.chatbotPost({}, body, {}).then((res)=>{
                var data = getBotResponse(res);
                sendMessage(data, robot);
            }).catch((e)=>{
                sendMessage('Can you repeat? I failed to deal with your message.', robot);
                sendMessage(e.toLocaleString(), robot);
            });
        };

        $('.send_message').click(function (e) {
            var customer_message = getMessageText();
            sendMessage(customer_message, customer);
            getReply(customer_message);
        });
        sendMessage('Hello, I am your dining assistant!', robot);
        // sendMessage(token, robot);
    });
}.call(this));