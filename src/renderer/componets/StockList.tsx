import { useEffect, useState } from 'react'
import { StockItemInterface } from '../interfaces'
import StockCard from './stockCard'

const StockList = () => {
    const [data, setData] = useState<StockItemInterface[]>([
        {
            Ticker: '',
            OHLC: 0,
            PVM: 0,
            FourteenDayVol: 0,
            FourteenATRAvg: 0,
            RelativeVolume: 0,
        },
    ])
    const [selectedCompany, setSelectedCompany] = useState<StockItemInterface>({
        Ticker: '',
        OHLC: 0,
        PVM: 0,
        FourteenDayVol: 0,
        FourteenATRAvg: 0,
        RelativeVolume: 0,
    })
    const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })

    const fetchData = async () => {
        const data: [StockItemInterface] =
            await window.electron.ipcRenderer.invoke('readJSON')

        setData(data)
    }

    const statNames = [
        'Ticker',
        'OHLC',
        'Pre Market Volume',
        '14 Day Avg Volume',
        '14 Day ATR',
        'Relative Volume',
    ]

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

    return (
        <div className="StockListPage">
            <div className="table">
                <div className="statNames">
                    {statNames.map((stat, index) => (
                        <h3 key={index}>{stat}</h3>
                    ))}
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
                        <h5>{company.OHLC}</h5>
                        <h5>{company.PVM}</h5>
                        <h5>{company.FourteenATRAvg}</h5>
                        <h5>{company.FourteenDayVol}</h5>
                        <h5>{company.RelativeVolume}</h5>
                    </div>
                ))}
            </div>
            <StockCard
                Ticker={selectedCompany.Ticker}
                OHLC={selectedCompany.OHLC}
                PVM={selectedCompany.PVM}
                FourteenDayVol={selectedCompany.FourteenDayVol}
                FourteenATRAvg={selectedCompany.FourteenATRAvg}
                RelativeVolume={selectedCompany.RelativeVolume}
            />
        </div>
    )
}

export default StockList
