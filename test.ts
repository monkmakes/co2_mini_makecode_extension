/*
Testing:
This is the same example app as described here:
https://monkmakes.com/downloads/instructions_pmon_mb.pdf

Use the guide above to make the connections between the micro:bit and the Plant Monitor.

Test Procedure:
1. Once running, the test program will plot a bargraph of the measured moisture on the 25 LEDs of the micro:bit.
With the Plant Monitor's prong in the air, just 1 LED should be lit, indicating a moisture of 0.
2. Grip the prong of the Plant Monitor in your hand, and you should see the bargraph rise. With a good
grip and clammy hands, you'll probably be able to get the reading up to all LEDs (100%). 
Alternatively, dunk the prong in some water and chek that the reading increases.
3. Press micro:bit button A. A plausable temperature in degrees C should be displayed.
4. Press micro:bit button B. A plausable relative humidity in percent should be displayed.
*/


input.onButtonPressed(Button.A, function () {
    show_wetness = false
    basic.clearScreen()
    basic.showNumber(PlantMonitor.readTemp())
    basic.pause(1000)
    show_wetness = true
})
input.onButtonPressed(Button.B, function () {
    show_wetness = false
    basic.clearScreen()
    basic.showNumber(PlantMonitor.readHumidity())
    basic.pause(1000)
    show_wetness = true
})
let show_wetness = false
PlantMonitor.startMon()
show_wetness = true
basic.forever(function () {
    if (show_wetness == true) {
        led.plotBarGraph(
        PlantMonitor.readWetness(),
        100
        )
    }
})
