/*
Testing:
This is the same example app as described here:
https://monkmakes.com/downloads/instructions_co2_mini.pdf

Use the guide above to make the connections between the micro:bit and the CO2 Mini.

Test Procedure -- to be carried out in fresh air.
1. Once running, the test program will display the Firmware version of the CO2 Mini's internal firmware, then turn off the RBG LED for 2 seconds before turning it back on again.
2. Press button A. The micro:bit display will show the CO2 level, followed by the temperature and then the humidity. The CO2 level should be between 400 and 600 ppm.
3. Make a note of the CO2 level from step 2 and now press button B. This will set altitude compensation to 1000m. Press button A again and the reported CO2 concentration should go up significantly.
4. Press buttons A and B simultaneoulsy to reset to factory defaults. Press button A again to check that the CO2 readings have gone back down again.
*/

input.onButtonPressed(Button.A, function () {
    basic.showString("co2:")
    basic.showNumber(CO2Mini.readCO2())
    basic.pause(1000)
    basic.showString("temp:")
    basic.showNumber(CO2Mini.readTemp())
    basic.pause(1000)
    basic.showString("humidity:")
    basic.showNumber(CO2Mini.readHumidity())
})
input.onButtonPressed(Button.AB, function () {
    CO2Mini.factory_reset()
})
input.onButtonPressed(Button.B, function () {
    basic.showString("Setting altitude to 1000m")
    CO2Mini.altitude(1000)
})
CO2Mini.startMon()
basic.showString("Firmware version:")
basic.showNumber(CO2Mini.firmware_version())
basic.pause(2000)
CO2Mini.monitor_led_off()
basic.pause(2000)
CO2Mini.monitor_led_on()
