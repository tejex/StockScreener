import { useEffect, useState } from 'react'
import { StockItemInterface } from '../interfaces'

const StockCard = (selectedCompany: StockItemInterface) => {
    return (
        <div>
            {selectedCompany && (
                <div className="statCard">
                    <h2>Company Stats</h2>
                    <div className="cardDetails">
                        <p>
                            <strong>Ticker:</strong> {selectedCompany.Ticker}
                        </p>
                        <p>
                            <strong>14 Day ATR:</strong>{' '}
                            {selectedCompany.FourteenATRAvg.toLocaleString(
                                'en-US'
                            )}
                        </p>
                        <p>
                            <strong>14 Day Avg Volume:</strong>{' '}
                            {selectedCompany.FourteenDayVol.toLocaleString(
                                'en-US'
                            )}
                        </p>
                        <p>
                            <strong>Relative Volume:</strong>{' '}
                            {selectedCompany.RelativeVolume.toLocaleString(
                                'en-US'
                            )}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StockCard
