// Note: If "???" is displayed, direction is unknown!
function on_forever () {
    if (LoggingIsOn == true) {
        tempC = Math.roundWithPrecision(input.temperature(), 2)
dataLog.writeData(td.getTime(), tempC)
    } else {
        showNotLoggingLED()
    }
    basic.pause(p1.getLogInterval())
}
function showQMarkLED () {
    basic.showLeds(`
        . # # # .
        . # # # .
        . . # . .
        . . . . .
        . . # . .
        `)
}
input.onButtonPressed(Button.A, function () {
    LoggingIsOn = !(LoggingIsOn)
    if (LoggingIsOn == true) {
        showLoggingLED()
    } else {
        showNotLoggingLED()
    }
})
function showLoggingLED () {
    basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
}
input.onButtonPressed(Button.B, function () {
    showQMarkLED()
})
function showNotLoggingLED () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
}
let LoggingIsOn = false
let tempC = 0
class TimeAndDate {
    private static _referenceCount: number
    private ____referenceCount_is_set: boolean
    private ____referenceCount: number
    get _referenceCount(): number {
        return this.____referenceCount_is_set ? this.____referenceCount : TimeAndDate._referenceCount
    }
    set _referenceCount(value: number) {
        this.____referenceCount_is_set = true
        this.____referenceCount = value
    }
    
    private static _refHours: number
    private ____refHours_is_set: boolean
    private ____refHours: number
    get _refHours(): number {
        return this.____refHours_is_set ? this.____refHours : TimeAndDate._refHours
    }
    set _refHours(value: number) {
        this.____refHours_is_set = true
        this.____refHours = value
    }
    
    private static _refMinutes: number
    private ____refMinutes_is_set: boolean
    private ____refMinutes: number
    get _refMinutes(): number {
        return this.____refMinutes_is_set ? this.____refMinutes : TimeAndDate._refMinutes
    }
    set _refMinutes(value: number) {
        this.____refMinutes_is_set = true
        this.____refMinutes = value
    }
    
    static Seconds: number
    private ___Seconds_is_set: boolean
    private ___Seconds: number
    get Seconds(): number {
        return this.___Seconds_is_set ? this.___Seconds : TimeAndDate.Seconds
    }
    set Seconds(value: number) {
        this.___Seconds_is_set = true
        this.___Seconds = value
    }
    
    private static _refSeconds: number
    private ____refSeconds_is_set: boolean
    private ____refSeconds: number
    get _refSeconds(): number {
        return this.____refSeconds_is_set ? this.____refSeconds : TimeAndDate._refSeconds
    }
    set _refSeconds(value: number) {
        this.____refSeconds_is_set = true
        this.____refSeconds = value
    }
    
    Count: number
    public static __initTimeAndDate() {
        //     Year = 2023
        //     Month = 5
        //     Day = 20
        TimeAndDate._refHours = 0
        TimeAndDate._refMinutes = 0
        TimeAndDate._refSeconds = 0
        //     Hours = 21
        //     Minutes = 20
        TimeAndDate.Seconds = 0
        TimeAndDate._referenceCount = 0
    }
    
    constructor() {
        this.Count = 0
        this._referenceCount = 0
    }
    
    public start() {
        this._referenceCount = input.runningTime()
        this.Count = 0
    }
    
    public getTime() {
        this.Count = (input.runningTime() - this._referenceCount) / 1000
        let compare = this.Count - (this._refHours * 3600 + this._refMinutes * 60)
        if (compare >= 60) {
            this.Seconds = Math.roundWithPrecision(compare - 60, 0)
            this._refMinutes = this._refMinutes + 1
        } else {
            this.Seconds = Math.roundWithPrecision(compare, 0)
        }
        
        if (this._refMinutes >= 60) {
            this._refMinutes = this._refMinutes - 60
            this._refHours = this._refHours + 1
        }
        
        if (this._refHours >= 24) {
            this._refHours = this._refHours - 24
        }
        
        let szLine = this.Count + "\t" + this._refHours + ":" + this._refMinutes + ":" + this.Seconds
        return szLine
    }
    
}
TimeAndDate.__initTimeAndDate()
class LoggingParams {
    private static _iLogInterval: number
    private ____iLogInterval_is_set: boolean
    private ____iLogInterval: number
    get _iLogInterval(): number {
        return this.____iLogInterval_is_set ? this.____iLogInterval : LoggingParams._iLogInterval
    }
    set _iLogInterval(value: number) {
        this.____iLogInterval_is_set = true
        this.____iLogInterval = value
    }
    
    static idefaultLogInterv: number
    private ___idefaultLogInterv_is_set: boolean
    private ___idefaultLogInterv: number
    get idefaultLogInterv(): number {
        return this.___idefaultLogInterv_is_set ? this.___idefaultLogInterv : LoggingParams.idefaultLogInterv
    }
    set idefaultLogInterv(value: number) {
        this.___idefaultLogInterv_is_set = true
        this.___idefaultLogInterv = value
    }
    
    public static __initLoggingParams() {
        LoggingParams.idefaultLogInterv = 2000
        LoggingParams._iLogInterval = 0
    }
    
    constructor() {
        this._iLogInterval = this.idefaultLogInterv
    }
    
    public getLogInterval(): number {
        return this._iLogInterval
    }
    
}
LoggingParams.__initLoggingParams()
class dataOutput {
    szLine: string
    constructor() {
        this.szLine = ""
    }
    
    public writeHeader() {
        this.szLine = "Time\thh:mm:ss\tTiC"
        serial.writeLine(this.szLine)
    }
    
    public writeData(TTime: any, TiC: number) {
        this.szLine = TTime + "\t" + TiC
        serial.writeLine(this.szLine)
    }
    
}
let p1 = new LoggingParams()
let dataLog = new dataOutput()
let td = new TimeAndDate()
serial.redirectToUSB()
td.start()
dataLog.writeHeader()
while (true) {
    on_forever()
}
