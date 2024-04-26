/**
 * makecode MonkMakes CO2 Mini sensor
 * MonkMakes Ltd
 * Author: Simon Monk @ https://www.monkmakes.com
 * Date: 2024-04-25
 */


/**
 * MonkMakes CO2 Mini block
 */
//% color=190 weight=100 icon="\uf1bb" block="CO2 Mini"
namespace CO2Mini {

    let value_str = ""
    let co2 = -1
    let temp = -1
    let humidity = -1
    let firmware = -1

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
        let response = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        //basic.showString(response)
        value_str = response.substr(2, response.length-3) // w=123\r\n
        //basic.showString(value_str)
        let value = parseInt(value_str)
        //basic.showString(response.charAt(0))
        if (response.charAt(0) == 'c') {
            co2 = value
        }
        if (response.charAt(0) == 't') {
            temp = value
        }
        if (response.charAt(0) == 'h') {
            humidity = value
        }
        if (response.charAt(0) == 'v') {
            firmware = value
        }
    })


    /**
     * Start the CO2 Mini - this will redirect serial to P1 and P2
     */
    //% blockId=device_init block="start CO2 Mini"
    export function startMon(): void {
        serial.redirect(
            SerialPin.P0,
            SerialPin.P1,
            BaudRate.BaudRate9600
        )
    }

    /**
    * Return the CO2 reading in parts per million.
    */
    //% blockId=device_co2 block="CO2 ppm"
    export function readCO2(): number {
        serial.writeString("c")
        basic.pause(200)
        return co2
    }


    /**
    * Return the temperature in degrees C.
    */
    //% blockId=device_temp block="temperature"
    export function readTemp(): number {
        serial.writeString("t")
        basic.pause(200)
        return temp
    }


    /**
    * Return the relative humidity as a percentage.
    */
    //% blockId=device_humidity block="humidity"
    export function readHumidity(): number {
        serial.writeString("h")
        basic.pause(200)
        return humidity
    }

    /**
    * Turn the LED on
    */
    //% blockId=device_led_on block="LED on"
    export function monitor_led_on(): void {
        serial.writeString("L")
    }

    /**
    * Turn the LED off
    */
    //% blockId=device_led_off block="LED off"
    export function monitor_led_off(): void {
        serial.writeString("l")
    }

    /**
    * Compensate for altitude. Specify altitude in metres
    * @param metres altitude in metres.
    */
    //% block
    //% advanced=true
    export function altitude(metres: number): void {
        let message = "m=" + metres + "\r\n"
        //basic.showString(message)
        serial.writeString(message)
    }

    /**
    * Calibrate to 400ppm
    */
    //% blockId=calib_400 block="calibrate 400ppm"
    //% advanced=true
    export function calibrate_400(): void {
        serial.writeString("k")
    }

    /**
    * Full reset to factory defaults
    */
    //% blockId=factory block="factory reset"
    //% advanced=true
    export function factory_reset(): void {
        serial.writeString("f")
    }

    /**
    * CO2 Mini Firmware version
    */
    //% blockId=version block="firmware version"
    //% advanced=true
    export function firmware_version(): number {
        serial.writeString("v")
        basic.pause(200)
        return firmware
    }

    /**
    * Auto-calibrate mode ON. The lowest reading in 24hrs is assumed to be 400ppm.
    */
    //% blockId=auto_cal_on block="auto calibrate on"
    //% advanced=true
    export function auto_calibrate_on(): void {
            serial.writeString("A")
    }

    /**
    * Auto-calibrate mode OFF.
    */
    //% blockId=auto_cal_off block="auto calibrate off"
    //% advanced=true
    export function auto_calibrate_off(): void {
        serial.writeString("a")
    }

}
