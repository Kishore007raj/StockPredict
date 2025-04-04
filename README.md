# Stock Prediction Platform

A full-stack application for real-time stock tracking and prediction using FastAPI, WebSocket, Yahoo Finance API, and Supabase.

## Features

- Real-time stock price updates using WebSocket
- Historical stock data visualization
- User authentication and watchlists
- Stock price predictions
- Responsive web interface

## Prerequisites

- Python 3.8+
- Node.js 14+
- Supabase account
- Yahoo Finance API access

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd stock-prediction-platform
```

2. Install backend dependencies:

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

- Copy `.env.example` to `.env`
- Fill in your Supabase credentials and other configuration

4. Set up Supabase:

- Create a new project in Supabase
- Run the SQL commands in `database/schema.sql` to create necessary tables
- Update the `.env` file with your Supabase URL and key

5. Start the backend server:

```bash
cd backend
uvicorn main:app --reload
```

6. Start the frontend development server:

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/stocks/{symbol}` - Get historical stock data
- `GET /api/stocks/{symbol}/info` - Get stock information
- `WS /ws/{symbol}` - WebSocket endpoint for real-time updates

## WebSocket Events

The WebSocket connection provides real-time stock price updates:

```javascript
const ws = new WebSocket(`ws://localhost:8000/ws/AAPL`);
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

## Database Schema

The application uses the following tables in Supabase:

- `stock_prices` - Stores historical stock prices
- `users` - User information
- `watchlists` - User watchlists

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
