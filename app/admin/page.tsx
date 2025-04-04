"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Download, FileUp, RefreshCw, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DataTable } from "@/components/data-table"
import { ModelStatus } from "@/components/model-status"

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      setFile(null)
      // Reset file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
              <p className="text-muted-foreground">Manage data, models, and system settings</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Logs
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Models
              </Button>
            </div>
          </div>

          <Tabs defaultValue="data">
            <TabsList className="mb-8">
              <TabsTrigger value="data">Data Management</TabsTrigger>
              <TabsTrigger value="models">ML Models</TabsTrigger>
              <TabsTrigger value="settings">System Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="data">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Upload Data</CardTitle>
                    <CardDescription>Upload CSV or ZIP files with stock data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="file-upload">File</Label>
                        <Input id="file-upload" type="file" accept=".csv,.zip" onChange={handleFileChange} />
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="data-type">Data Type</Label>
                        <select
                          id="data-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="price">Price Data</option>
                          <option value="fundamental">Fundamental Data</option>
                          <option value="news">News Sentiment</option>
                          <option value="economic">Economic Indicators</option>
                        </select>
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="data-description">Description</Label>
                        <Textarea
                          id="data-description"
                          placeholder="Brief description of the data"
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleUpload} disabled={!file || isUploading}>
                      {isUploading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Data
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Data Sources</CardTitle>
                        <CardDescription>Manage your data sources</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileUp className="mr-2 h-4 w-4" />
                        Add Source
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="models">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Model Training</CardTitle>
                    <CardDescription>Train or update prediction models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="model-type">Model Type</Label>
                        <select
                          id="model-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="standard">Standard Prediction</option>
                          <option value="advanced">Advanced ML</option>
                          <option value="sentiment">Sentiment Analysis</option>
                          <option value="ensemble">Ensemble Model</option>
                        </select>
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="training-data">Training Data</Label>
                        <select
                          id="training-data"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="all">All Available Data</option>
                          <option value="recent">Last 6 Months</option>
                          <option value="year">Last Year</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="model-params">Model Parameters</Label>
                        <Textarea
                          id="model-params"
                          placeholder="Enter model parameters (JSON format)"
                          className="resize-none font-mono text-xs"
                          defaultValue='{"epochs": 100, "batch_size": 32, "learning_rate": 0.001}'
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Train Model
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Model Status</CardTitle>
                        <CardDescription>Current status of prediction models</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Metrics
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ModelStatus />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>API Configuration</CardTitle>
                    <CardDescription>Configure external data API connections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="api-key">Alpha Vantage API Key</Label>
                        <Input
                          id="api-key"
                          type="password"
                          placeholder="Enter API key"
                          defaultValue="••••••••••••••••"
                        />
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="finnhub-key">Finnhub API Key</Label>
                        <Input
                          id="finnhub-key"
                          type="password"
                          placeholder="Enter API key"
                          defaultValue="••••••••••••••••"
                        />
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="api-rate">API Request Rate (per minute)</Label>
                        <Input id="api-rate" type="number" placeholder="Requests per minute" defaultValue="60" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save API Settings</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system behavior and defaults</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                        <Input
                          id="cache-duration"
                          type="number"
                          placeholder="Cache duration in minutes"
                          defaultValue="15"
                        />
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="default-timeframe">Default Timeframe</Label>
                        <select
                          id="default-timeframe"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="1h">1 Hour</option>
                          <option value="1d" selected>
                            1 Day
                          </option>
                          <option value="1w">1 Week</option>
                          <option value="1m">1 Month</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="auto-refresh"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <Label htmlFor="auto-refresh">Enable auto-refresh</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <Label htmlFor="notifications">Enable notifications</Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save System Settings</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

