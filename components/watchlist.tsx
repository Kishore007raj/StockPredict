"use client"

import { ArrowDown, ArrowUp, DollarSign, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for watchlist
const watchlistData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.25,
    changePercent: 0.69,
    volume: "32.5M",
    marketCap: "2.87T",
    prediction: "up",
    confidence: 87,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 415.32,
    change: -2.18,
    changePercent: -0.52,
    volume: "18.2M",
    marketCap: "3.09T",
    prediction: "down",
    confidence: 62,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 174.93,
    change: 3.42,
    changePercent: 1.99,
    volume: "12.7M",
    marketCap: "2.21T",
    prediction: "up",
    confidence: 91,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 182.94,
    change: -0.87,
    changePercent: -0.47,
    volume: "15.3M",
    marketCap: "1.89T",
    prediction: "up",
    confidence: 73,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 193.57,
    change: 5.32,
    changePercent: 2.83,
    volume: "28.7M",
    marketCap: "615.8B",
    prediction: "up",
    confidence: 65,
  },
]

export function Watchlist() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Prediction</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlistData.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {stock.price.toFixed(2)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stock.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  <span>
                    {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">{stock.volume}</TableCell>
              <TableCell className="text-right">{stock.marketCap}</TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end ${stock.prediction === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {stock.prediction === "up" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{stock.confidence}%</span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>New Prediction</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Remove from Watchlist</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

