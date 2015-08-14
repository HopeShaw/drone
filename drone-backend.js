var Cylon = require('cylon');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
    robot = bot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    after(10*1000,function(){
        bot.drone.forward(0.1);
        bot.drone.left(0.1);
    });
    after(20*1000, function(){
        bot.drone.back(0.1);
        bot.drone.right(0.1);
    });
    after(25*1000, function(){
        bot.drone.land();
    });
    after(30*1000, function(){
        bot.drone.stop();
    });

}

Cylon.start();
