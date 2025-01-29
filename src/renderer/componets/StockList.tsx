import { useEffect, useState } from 'react'
import { StockItemInterface } from '../interfaces'
import StockCard from './stockCard'

const StockList = () => {
    const [data, setData] = useState<StockItemInterface[]>([
        {
            Ticker: '',
            OHLC: [0, 0, 0, 0], // Open, High, Low, Close
            PVM: 0,
            FourteenDayAvgVol: 0,
            FourteenDayAvgATR: 0,
        },
    ])

    const [selectedCompany, setSelectedCompany] = useState<StockItemInterface>({
        Ticker: '',
        OHLC: [0, 0, 0, 0],
        PVM: 0,
        FourteenDayAvgVol: 0,
        FourteenDayAvgATR: 0,
    })
    const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })

    const fetchData = async () => {
        const realData = await window.electron.ipcRenderer.invoke('fetchData')
        //This is the issue here, cant get the the data in JSON, everything else is in place
        console.log(Object.entries(realData))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCompanyClick = (
        company: StockItemInterface,
        event: React.MouseEvent
    ) => {
        // Get the mouse position where the click happened
        const x = event.clientX
        const y = event.clientY

        // Update the state with the position and selected company
        setCardPosition({ x, y })
        setSelectedCompany(company)
    }

    console.log(data)

    return (
        <div className="StockListPage">
            <div className="table">
                <h1>Market Data</h1>
                <div className="statNames">
                    <h3>Ticker</h3>
                    <div className="ohlc">
                        <h3>O</h3>
                        <h3>H</h3>
                        <h3>L</h3>
                        <h3>C</h3>
                    </div>

                    <h3>14 Day Avg Vol</h3>
                    <h3>14 Day Avg ATR</h3>
                </div>

                {data.map((company, index) => (
                    <div
                        className="companyStats"
                        key={index}
                        onClick={(event) => handleCompanyClick(company, event)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h5 style={{ color: '#5ecadd', fontWeight: 'bolder' }}>
                            {company.Ticker}
                        </h5>
                        <div className="ohlc">
                            {company.OHLC.map((value) => {
                                return <h5>{value}</h5>
                            })}
                        </div>
                        <h5>AAA</h5>
                        <h5>AAA</h5>
                    </div>
                ))}
            </div>
            <StockCard selectedCompany={selectedCompany} />
        </div>
    )
}

export default StockList
