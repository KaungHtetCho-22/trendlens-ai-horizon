
import { useState } from "react";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "./ui/popover";
import {
  RadioGroup,
  RadioGroupItem
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  onFilterChange?: (filters: {
    dateRange: string;
    sortBy: string;
  }) => void;
  className?: string;
}

export default function FilterPanel({ onFilterChange, className }: FilterPanelProps) {
  const [dateRange, setDateRange] = useState("this-week");
  const [sortBy, setSortBy] = useState("newest");
  const [isOpen, setIsOpen] = useState(false);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    if (onFilterChange) {
      onFilterChange({
        dateRange: value,
        sortBy,
      });
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    if (onFilterChange) {
      onFilterChange({
        dateRange,
        sortBy: value,
      });
    }
  };

  return (
    <>
      {/* Mobile: Collapsible filter button */}
      <div className={cn("block lg:hidden mb-6", className)}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span>Filter articles</span>
              <Filter size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="neumorph w-full p-4 border-none">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Date Range</h3>
                <Select value={dateRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <RadioGroup 
                  value={sortBy} 
                  onValueChange={handleSortChange}
                  className="flex flex-col space-y-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="most-viewed" id="most-viewed-mobile" />
                    <label htmlFor="most-viewed-mobile" className="text-sm">Most Viewed</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="newest-mobile" />
                    <label htmlFor="newest-mobile" className="text-sm">Newest First</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oldest" id="oldest-mobile" />
                    <label htmlFor="oldest-mobile" className="text-sm">Oldest First</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Desktop: Sticky sidebar filter panel */}
      <div className={cn("hidden lg:block sticky top-20", className)}>
        <div className="neumorph p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Filter size={18} className="text-primary" />
            <h3 className="text-lg font-bold">Filter by</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Date Range</h3>
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Sort By</h3>
              <RadioGroup 
                value={sortBy} 
                onValueChange={handleSortChange}
                className="flex flex-col space-y-1.5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="most-viewed" id="most-viewed" />
                  <label htmlFor="most-viewed" className="text-sm flex items-center">
                    Most Viewed
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="newest" id="newest" />
                  <label htmlFor="newest" className="text-sm flex items-center">
                    Newest First <SortDesc className="ml-1" size={14} />
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oldest" id="oldest" />
                  <label htmlFor="oldest" className="text-sm flex items-center">
                    Oldest First <SortAsc className="ml-1" size={14} />
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
