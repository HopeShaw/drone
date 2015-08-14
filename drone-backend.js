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
    bot.nav.on("altitudeChange", function(){
         console.log("Altitude:", data);
        if (altitude > 1.5 ){
            bot.drone.land();
        }
    });
    after(10*1000,function(){
        bot.drone.forward(0.1);
        bot.drone.left(0.1);
    });
    after(12*1000, function(){
        bot.drone.back(0.1);
        bot.drone.right(0.1);
    });
    after(14*1000, function(){
        bot.drone.land();
    });
    after(19*1000, function(){
        bot.drone.stop();
    });

}

Cylon.start();
