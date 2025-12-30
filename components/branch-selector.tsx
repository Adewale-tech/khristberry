"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Branch {
  id: string
  name: string
}

interface BranchStore {
  selectedBranchId: string | null
  setSelectedBranchId: (id: string) => void
}

export const useBranchStore = create<BranchStore>()(
  persist(
    (set) => ({
      selectedBranchId: null,
      setSelectedBranchId: (id) => set({ selectedBranchId: id }),
    }),
    {
      name: 'branch-storage',
    }
  )
)

export function BranchSelector({ branches }: { branches: Branch[] }) {
  const [open, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const { selectedBranchId, setSelectedBranchId } = useBranchStore()

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // Default to first branch if none selected
  React.useEffect(() => {
    if (isMounted && !selectedBranchId && branches.length > 0) {
      setSelectedBranchId(branches[0].id)
    }
  }, [branches, selectedBranchId, setSelectedBranchId, isMounted])

  // Prevent hydration mismatch by rendering placeholder until mounted
  if (!isMounted) {
    return (
      <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between bg-primary/10 border-primary/20 text-foreground hover:bg-primary/20 opacity-50 cursor-wait"
        >
          Loading...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    )
  }

  const selectedBranch = branches.find((branch) => branch.id === selectedBranchId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-primary/10 border-primary/20 text-foreground hover:bg-primary/20"
        >
          {selectedBranch ? selectedBranch.name : "Select Branch..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search branch..." />
          <CommandList>
            <CommandEmpty>No branch found.</CommandEmpty>
            <CommandGroup>
              {branches.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={branch.name}
                  onSelect={(currentValue) => {
                    setSelectedBranchId(branch.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBranchId === branch.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {branch.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
