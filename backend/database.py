#we are using supabase as our database which is a postgresql database
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from typing import List, Dict, Any
from datetime import datetime, timedelta

load_dotenv()

supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

async def save_stock_price(symbol: str, price: float, timestamp: datetime) -> Dict[str, Any]:
    """Save stock price to Supabase."""
    data = {
        "symbol": symbol,
        "price": price,
        "timestamp": timestamp.isoformat()
    }
    result = supabase.table('stock_prices').insert(data).execute()
    return result.data[0]

async def get_stock_history(symbol: str, days: int = 7) -> List[Dict[str, Any]]:
    """Get historical stock prices from Supabase."""
    start_date = datetime.now() - timedelta(days=days)
    result = supabase.table('stock_prices')\
        .select('*')\
        .eq('symbol', symbol)\
        .gte('timestamp', start_date.isoformat())\
        .order('timestamp')\
        .execute()
    return result.data

async def add_to_watchlist(user_id: str, symbol: str) -> Dict[str, Any]:
    """Add a stock to user's watchlist."""
    data = {
        "user_id": user_id,
        "symbol": symbol
    }
    result = supabase.table('watchlists').insert(data).execute()
    return result.data[0]

async def remove_from_watchlist(user_id: str, symbol: str) -> None:
    """Remove a stock from user's watchlist."""
    supabase.table('watchlists')\
        .delete()\
        .eq('user_id', user_id)\
        .eq('symbol', symbol)\
        .execute()

async def get_watchlist(user_id: str) -> List[Dict[str, Any]]:
    """Get user's watchlist."""
    result = supabase.table('watchlists')\
        .select('*')\
        .eq('user_id', user_id)\
        .execute()
    return result.data 