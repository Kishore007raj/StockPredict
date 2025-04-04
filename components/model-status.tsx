"use client"

import { Play, RefreshCw, StopCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for models
const models = [
  {
    id: 1,
    name: "Standard Prediction",
    type: "LSTM",
    accuracy: 87.3,
    lastTrained: "2023-06-14 09:12:45",
    status: "Active",
    stocks: "All",
  },
  {
    id: 2,
    name: "Advanced ML",
    type: "Transformer",
    accuracy: 91.2,
    lastTrained: "2023-06-10 14:30:22",
    status: "Active",
    stocks: "AAPL, MSFT, GOOGL",
  },
  {
    id: 3,
    name: "Sentiment Analysis",
    type: "BERT",
    accuracy: 83.7,
    lastTrained: "2023-06-05 11:45:33",
    status: "Training",
    stocks: "All",
    progress: 67,
  },
  {
    id: 4,
    name: "Ensemble Model",
    type: "Random Forest",
    accuracy: 89.5,
    lastTrained: "2023-06-12 16:22:37",
    status: "Inactive",
    stocks: "Tech Sector",
  },
]

export function ModelStatus() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Last Trained</TableHead>
            <TableHead>Stocks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{model.type}</TableCell>
              <TableCell>{model.accuracy}%</TableCell>
              <TableCell>{model.lastTrained}</TableCell>
              <TableCell>{model.stocks}</TableCell>
              <TableCell>
                {model.status === "Training" ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span className="text-xs">Training ({model.progress}%)</span>
                    </div>
                    <Progress value={model.progress} className="h-1" />
                  </div>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      model.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {model.status}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {model.status === "Active" ? (
                  <Button variant="outline" size="sm" className="w-full">
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                ) : model.status === "Training" ? (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Training
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

