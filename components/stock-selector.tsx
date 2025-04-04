"use client"

import { Button } from "@/components/ui/button"

// Mock popular stocks
const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
]

interface StockSelectorProps {
  onSelect: (stock: { symbol: string; name: string }) => void
}

export function StockSelector({ onSelect }: StockSelectorProps) {
  return (
    <>
      {popularStocks.map((stock) => (
        <Button
          key={stock.symbol}
          variant="outline"
          size="sm"
          className="justify-start"
          onClick={() => onSelect(stock)}
        >
          {stock.symbol}
        </Button>
      ))}
    </>
  )
}

