
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

// Mock categories
const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'crafts', label: 'Crafts & Decor' },
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'food', label: 'Food & Beverages' },
  { value: 'beauty', label: 'Beauty & Wellness' },
  { value: 'art', label: 'Art & Collectibles' },
];

const SearchAndFilter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('relevance');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results with query params
    navigate(`/search?query=${searchQuery}&category=${selectedCategory}&min=${priceRange.min}&max=${priceRange.max}&sort=${sortBy}`);
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <Popover open={openCategoryList} onOpenChange={setOpenCategoryList}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              role="combobox" 
              aria-expanded={openCategoryList}
              className="justify-between min-w-[180px]"
            >
              {categories.find(category => category.value === selectedCategory)?.label || 'All Categories'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    onSelect={(value) => {
                      setSelectedCategory(value);
                      setOpenCategoryList(false);
                    }}
                  >
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Button type="submit" className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
          Search
        </Button>
      </form>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-iwanyu-gray">Price:</span>
          <Input
            type="number"
            placeholder="Min"
            className="w-20"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            className="w-20"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-iwanyu-gray">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
