export interface StockItemInterface {
    Ticker: string
    OHLC: [number, number, number, number]
    PVM: number
    FourteenDayAvgVol: number
    FourteenDayAvgATR: number
}

export interface StockListInterface {
    list: [StockItemInterface]
}
