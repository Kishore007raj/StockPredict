#we are using fastapi to create a websocket server that will send stock data to the frontend
#we are using yfinance to get stock data from yahoo finance
#we are using uvicorn to run the fastapi server

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import yfinance as yf
import json
import asyncio
from datetime import datetime
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{symbol}")
async def websocket_endpoint(websocket: WebSocket, symbol: str):
    await manager.connect(websocket)
    try:
        while True:
            # Fetch real-time stock data
            stock = yf.Ticker(symbol)
            data = stock.history(period="1d", interval="1m")
            if not data.empty:
                latest_price = data['Close'].iloc[-1]
                timestamp = datetime.now().isoformat()
                
                # Save to Supabase
                supabase.table('stock_prices').insert({
                    'symbol': symbol,
                    'price': float(latest_price),
                    'timestamp': timestamp
                }).execute()
                
                # Send to WebSocket clients
                await websocket.send_json({
                    "symbol": symbol,
                    "price": float(latest_price),
                    "timestamp": timestamp
                })
            
            await asyncio.sleep(60)  # Update every minute
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/stocks/{symbol}")
async def get_stock_data(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d", interval="1m")
        return {
            "symbol": symbol,
            "prices": data['Close'].tolist(),
            "timestamps": data.index.strftime('%Y-%m-%d %H:%M:%S').tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/stocks/{symbol}/info")
async def get_stock_info(symbol: str):
    try:
        stock = yf.Ticker(symbol)
        info = stock.info
        return {
            "symbol": symbol,
            "name": info.get('longName'),
            "sector": info.get('sector'),
            "industry": info.get('industry'),
            "marketCap": info.get('marketCap'),
            "currentPrice": info.get('currentPrice'),
            "peRatio": info.get('trailingPE'),
            "dividendYield": info.get('dividendYield')
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 