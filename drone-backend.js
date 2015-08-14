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
    .device("nav",{
        driver:"ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data){
        console.log(data);
    });
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    bot.nav.on("altitudeChange", function(data){
         console.log("Altitude:", data);
        if (data > 1.5 ){
            bot.drone.land();
        }
    });
    after(10*1000,function(){
        bot.drone.forward(0.1);
        bot.drone.left(0.1);
    });
    after(12*1000, function(){
        bot.drone.left(0);
        bot.drone.forward(0);
        bot.drone.hover(2);
    });
    after (14*1000, function(){
        bot.drone.back(0.1);
        bot.drone.right(0.1);
    });
    after(16*1000, function(){
        bot.drone.back(0);
        bot.drone.right(0);
        bot.drone.hover(2);
    });
    after(18*1000, function(){
        bot.drone.frontFlip(2);
    })
    after(20*1000, function(){
        bot.drone.hover(2);
    })
    after(22*1000, function(){
        bot.drone.land();
    });
    after(27*1000, function(){
        bot.drone.stop();
    });

}

Cylon.start();
