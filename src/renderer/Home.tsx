import { useEffect, useState } from 'react'
import { StockItemInterface } from './interfaces'
import StockList from './componets/StockList'

const Home = () => {
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Market Data</h1>
                <StockList />
            </div>
        </div>
    )
}

export default Home
