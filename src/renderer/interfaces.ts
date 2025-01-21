export interface StockItemInterface {
    Ticker: string
    OHLC: number
    PVM: number
    FourteenDayVol: number
    FourteenATRAvg: number
    RelativeVolume: number
}

export interface StockListInterface {
    list: [StockItemInterface]
}
