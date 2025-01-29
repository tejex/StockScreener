import { useState } from 'react'
import { StockItemInterface } from '../interfaces'

const StockItem = ({}: StockItemInterface) => {
    const [data, setData] = useState<StockItemInterface>({
        Ticker: '',
        OHLC: [0, 0, 0, 0],
        PVM: 0,
        FourteenDayAvgVol: 0,
        FourteenDayAvgATR: 0,
    })

    console.log(data)

    return (
        <div>
            <p>{data.Ticker}</p>
            <p>{data.OHLC}</p>
        </div>
    )
}

export default StockItem
