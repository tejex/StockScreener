# Volatility-Filter
### Volatility screener for stocks fitting ORB strategy

# Setup
### After cloning the repo in your local directory:
1. Open your terminal, navigate to the repository directory, and install the required dependencies:  
```python3 -m pip install -r requirements.txt```

2. Add your Polygon API key to your .zshrc or .bashrc file (located in your home directory). Append the following line to the end of the file:
```export POLYGON_KEY=<API_KEY>```

3. Open the repository in VS Code and either:
    - Run the script using the play button.
    -   Execute it from the VS Code terminal with
        ```python3 filter.py```