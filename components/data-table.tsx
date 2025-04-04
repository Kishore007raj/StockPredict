//this is for the data table component

"use client"

import { useState } from "react"
import { MoreHorizontal, RefreshCw, Trash2 } from "lucide-react"

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

// Mock data for data sources
const dataSources = [
  {
    id: 1,
    name: "Alpha Vantage",
    type: "API",
    dataType: "Price Data",
    lastUpdated: "2023-06-15 14:30:22",
    status: "Active",
  },
  {
    id: 2,
    name: "Finnhub",
    type: "API",
    dataType: "News Sentiment",
    lastUpdated: "2023-06-15 12:15:43",
    status: "Active",
  },
  {
    id: 3,
    name: "Historical Data",
    type: "CSV Upload",
    dataType: "Price Data",
    lastUpdated: "2023-06-10 09:45:12",
    status: "Active",
  },
  {
    id: 4,
    name: "Economic Indicators",
    type: "CSV Upload",
    dataType: "Economic Data",
    lastUpdated: "2023-06-01 16:22:37",
    status: "Active",
  },
  {
    id: 5,
    name: "Twitter Sentiment",
    type: "API",
    dataType: "News Sentiment",
    lastUpdated: "2023-06-14 11:05:19",
    status: "Inactive",
  },
]

export function DataTable() {
  const [sources, setSources] = useState(dataSources)
  const [refreshing, setRefreshing] = useState<number | null>(null)

  const handleRefresh = (id: number) => {
    setRefreshing(id)

    // Simulate refresh
    setTimeout(() => {
      setRefreshing(null)
      setSources(
        sources.map((source) => (source.id === id ? { ...source, lastUpdated: new Date().toLocaleString() } : source)),
      )
    }, 2000)
  }

  const handleDelete = (id: number) => {
    setSources(sources.filter((source) => source.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Data Type</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sources.map((source) => (
            <TableRow key={source.id}>
              <TableCell className="font-medium">{source.name}</TableCell>
              <TableCell>{source.type}</TableCell>
              <TableCell>{source.dataType}</TableCell>
              <TableCell>{source.lastUpdated}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    source.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {source.status}
                </span>
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
                    <DropdownMenuItem onClick={() => handleRefresh(source.id)}>
                      {refreshing === source.id ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Refresh
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => handleDelete(source.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
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

