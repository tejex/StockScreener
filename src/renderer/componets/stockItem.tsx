import { useState } from 'react'
import { StockItemInterface } from '../interfaces'

const StockItem = ({}: StockItemInterface) => {
    const [data, setData] = useState<StockItemInterface>({
        Ticker: '',
        OHLC: 0,
        PVM: 0,
        FourteenDayVol: 0,
        FourteenATRAvg: 0,
        RelativeVolume: 0,
    })

    return (
        <div>
            <p>{data.Ticker}</p>
            <p>{data.OHLC}</p>
            <p>{data.PVM}</p>
            <p>{data.FourteenDayVol}</p>
            <p>{data.FourteenATRAvg}</p>
            <p>{data.RelativeVolume}</p>
        </div>
    )
}

export default StockItem
