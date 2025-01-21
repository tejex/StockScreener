from datetime import datetime, timedelta
from pprint import pprint
import numpy as np
import os
import pandas as pd
import requests
import utils
from flask import Flask
from flask_cors import CORS


# api_key = os.environ.get("POLYGON_KEY", None)
# if not api_key:
#     print(" Cannot find api key")
#     exit()

app = Flask( __name__ )
CORS(app)
DAY_TO_PROJECT_FOR = "06-03-2024"
url_string =  "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/"
params = {
    "apiKey": ''
}
@app.route("/getDailyData", methods=["GET"])
def get_daily_data():
    print("THIS METHOD WAS CALLED")
    no_trading = {"Sunday", "Saturday"}
    hour_delta = timedelta(hours=24)

    if not DAY_TO_PROJECT_FOR:
        present_day = datetime.now()
    else:
        mm, dd, yy = list(map(int, DAY_TO_PROJECT_FOR.split("-")))
        if 1 > mm or mm > 12 or 1 > dd or dd > 31 or 2000 > yy or yy > 2025:
            print("Error: invalidate date, please follow the scheme mm-dd-yy")
            exit()
        present_day = datetime(yy, mm, dd)

    curr = present_day - hour_delta
    while curr.strftime("%A") in no_trading:
        curr -= hour_delta

    print(f"\nProjections for ORB on {present_day.strftime('%A')}, {present_day.month}-{present_day.day}-{present_day.year}: \n")
    data = pd.DataFrame()

    try:
        for _ in range(14):
            # parsing
            month = curr.month if int(curr.month) > 9 else f"0{curr.month}"
            day = curr.day if int(curr.day) > 9 else f"0{curr.day}"
            response = requests.get(f"{url_string}{curr.year}-{month}-{day}", params=params).json()
            if "results" in response:
                tickers_for_curr_day = response["results"]
                data = utils._add_ticker_data_to_table(tickers_for_curr_day, data)

            curr -= hour_delta
            # no trading day
            while curr.strftime("%A") in no_trading:
                curr -= hour_delta

    except Exception as e:
        print("Error", e)

    data = data.sort_index(axis=1, level=0)
    return data


# # Apply metric for each ticker separately
# def main():
#     all_data = get_daily_data()
#     return all_data
    # all_metrics = dict()
    # for ticker in all_data.columns.get_level_values(0).unique():
    #     ticker_data = all_data[ticker]
    #     ticker_metrics = utils._extract_ticker_metrics(ticker_data)
    #     if ticker_metrics:
    #         all_metrics[ticker] = ticker_metrics

    # all_metrics = pd.DataFrame(all_metrics, index=["Open", "14D_Avg_Volume", "ATR", "Relative Volume"]).T
    # print("All")
    # pprint(all_metrics.head(15))
    # pprint(f"{len(all_metrics.index)} Assets")
    # print()
    # filtered_metrics = all_metrics[  # Opening price > $5
    #                         (all_metrics['14D_Avg_Volume'] >= 5_000_000) &  # Avg volume > 1,000,000
    #                         (all_metrics['ATR'] >= 3) &  # ATR > $3
    #                         (all_metrics['Relative Volume'] >= 1.5)].sort_values(by='Relative Volume', ascending=False)  # RVOL >= 150%
    # print("Filtered and Sorted :")
    # pprint(filtered_metrics.head(15))
    # pprint(f"{len(filtered_metrics.index)} Assets")

if __name__ == "__main__":
    app.run( host = "127.0.0.1", port = 5000 )
# # question: past 14 trading days inclusive of holidays?
