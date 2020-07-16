var angleClock = function(hour, minutes) {
    // convert to minutes past 12:00
    // hour hand does 360 degrees in 12*60=720 minutes
    var totalMinutes = hour*60 + minutes
    var hourAngle = 360*totalMinutes/720 // of course this is totalMinutes/2
    var minutesAngle = 360*minutes/60
    var angle = Math.abs(hourAngle - minutesAngle)
    return angle>180 ? 360 - angle : angle
};

const tests = [
    {h:9, m:10, out:145}, // 275deg - 60 = 215 degress
    {h:12, m:30, out:165}, // 275deg - 60 = 215 degress
    {h:3, m:30, out:75}, // 275deg - 60 = 215 degress
    {h:3, m:15, out:7.5}, // 275deg - 60 = 215 degress
    {h:4, m:50, out:155}, // 275deg - 60 = 215 degress
    {h:12, m:0, out:0} // 275deg - 60 = 215 degress
]

tests.forEach((t, i) => console.log(
    'test', i, angleClock(t.h, t.m), 'should be', t.out
))