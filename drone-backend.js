var Cylon = require('cylon');
var utils = require('./utils/droneUtils.js');
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
    bot.nav.on("navdata", function (data) {
        console.log(data);
    });
    bot.drone.getPngStream().on("data", untils.sendFrame);
    utils.instructionListener.on('move', moveDrone);
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    bot.nav.on("altitudeChange", function (data) {
        console.log("Altitude:", data);
        if (data > 1.5) {
            bot.drone.land();
        }
    });


    after(10 * 1000, function () {
        bot.drone.forward(0.05);
    });
    after(40 * 1000, function () {
        bot.drone.land();
    });
    after(45 * 1000, function () {
        bot.drone.stop()
    });

    function moveDrone(move) {
        console.log("received", move);
        if (move.left) {
            console.log("Moving left");
            bot.drone.left(0.2);
            bot.drone.forward(0.05);
            after(0.5 * 1000, function () {
                bot.drone.left(0);
                bot.drone.forward(0.05);
            });
        }

        if (move.right) {
            console.log("Moving right");
            bot.drone.right(0.2);
            bot.drone.forward(0.05);
            after(0.5 * 1000, function () {
                bot.drone.right(0);
                bot.drone.forward(0.05);
            });


        }
    }
}

Cylon.start();
