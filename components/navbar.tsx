"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  if (isLandingPage) {
    return <LandingNavbar />
  }

  return <DashboardNavbar />
}

function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <BarChart3 className="h-6 w-6" />
          <span>StockPredict</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/predictions" className="text-sm font-medium hover:underline underline-offset-4">
            Predictions
          </Link>
          <Link href="/compare" className="text-sm font-medium hover:underline underline-offset-4">
            Compare
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold mr-6">
          <BarChart3 className="h-6 w-6" />
          <span className="hidden sm:inline-block">StockPredict</span>
        </Link>
        <div className="hidden md:flex md:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/predictions" className="text-sm font-medium hover:text-primary transition-colors">
            Predictions
          </Link>
          <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors">
            Compare
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </Link>
        </div>
        <div className="flex items-center ml-auto gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search stocks..." className="w-64 pl-8 rounded-full bg-muted" />
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/dashboard" className="text-lg font-medium">
                  Dashboard
                </Link>
                <Link href="/predictions" className="text-lg font-medium">
                  Predictions
                </Link>
                <Link href="/compare" className="text-lg font-medium">
                  Compare
                </Link>
                <Link href="/admin" className="text-lg font-medium">
                  Admin
                </Link>
                <div className="relative mt-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search stocks..." className="w-full pl-8" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

