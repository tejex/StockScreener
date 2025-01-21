import pandas as pd
import numpy as np

# Example function to process and append day single data for all stocks to dataframe table
def _add_ticker_data_to_table(data, table):
    # Convert to DataFrame
    df = pd.DataFrame(data)
    
    # Rename columns for clarity
    df.rename(columns={
        'T': 'Ticker',
        'o': 'Open',
        'h': 'High',
        'l': 'Low',
        'c': 'Close',
        'n': 'Txns',
        't': 'Timestamp',
        'v': 'Volume',
        'vw': 'Volume Weighted Price'
    }, inplace=True)
    
    # Convert timestamp to readable datetime format
    df['Timestamp'] = pd.to_datetime(df['Timestamp'], unit='ms')
    
    # Set timestamp as the index
    df.set_index('Timestamp', inplace=True)
    # Pivot data to create multi-level columns
    df = df.pivot(columns='Ticker')
    df = df.swaplevel(0, 1, 1)
    
    # Append the daily data to the overall DataFrame
    table = pd.concat([table, df])
    return table

# Function to calculate 14-day average, ATR, etc for each ticker
def _extract_ticker_metrics(df):
    if df.isnull().values.any():
        return None
    df = df.copy()
    avg_vol_14_day = df['Volume'].mean() 
    return [df['Open'].iloc[-1], avg_vol_14_day, (df['High'] - df['Low']).mean(), np.divide(df['Volume'].iloc[-1], avg_vol_14_day)]