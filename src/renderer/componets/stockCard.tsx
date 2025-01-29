import { StockItemInterface } from '../interfaces'

interface StockCardProps {
    selectedCompany: StockItemInterface
}

const StockCard = ({ selectedCompany }: StockCardProps) => {
    return (
        <div className="statCardContainer">
            {selectedCompany && (
                <div className="statCard">
                    <h2>Company Stats</h2>
                    <div className="cardDetails">
                        <p>
                            <strong>Ticker:</strong> {selectedCompany.Ticker}
                        </p>
                        <p>
                            <strong>14 Day ATR:</strong>{' '}
                            {selectedCompany.OHLC[3].toLocaleString('en-US')}{' '}
                            {/* Assuming OHLC[3] is Close price */}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StockCard
