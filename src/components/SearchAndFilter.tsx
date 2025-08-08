import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, X } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  facultySuggestions?: string[];
}

const SearchAndFilter = memo(
  ({
    searchTerm,
    onSearchChange,
    onFilterClick,
    facultySuggestions = [],
  }: SearchAndFilterProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
      []
    );
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (searchTerm.trim()) {
        const filtered = facultySuggestions.filter((faculty) =>
          faculty.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setSelectedIndex(-1);
      } else {
        setShowSuggestions(false);
        setFilteredSuggestions([]);
      }
    }, [searchTerm, facultySuggestions]);

    const handleInputChange = useCallback(
      (value: string) => {
        onSearchChange(value);
      },
      [onSearchChange]
    );

    const handleSuggestionClick = useCallback(
      (suggestion: string) => {
        onSearchChange(suggestion);
        setShowSuggestions(false);
        inputRef.current?.focus();
      },
      [onSearchChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!showSuggestions) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredSuggestions.length - 1 ? prev + 1 : prev
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            break;
          case "Enter":
            e.preventDefault();
            if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
              handleSuggestionClick(filteredSuggestions[selectedIndex]);
            }
            break;
          case "Escape":
            setShowSuggestions(false);
            break;
        }
      },
      [
        showSuggestions,
        filteredSuggestions,
        selectedIndex,
        handleSuggestionClick,
      ]
    );

    const handleInputFocus = useCallback(() => {
      if (searchTerm.trim() && filteredSuggestions.length > 0) {
        setShowSuggestions(true);
      }
    }, [searchTerm, filteredSuggestions.length]);

    const handleInputBlur = useCallback(() => {
      // Delay hiding suggestions to allow for clicks
      setTimeout(() => setShowSuggestions(false), 200);
    }, []);

    const clearSearch = useCallback(() => {
      onSearchChange("");
      inputRef.current?.focus();
    }, [onSearchChange]);

    return (
      <div className="sticky top-0 z-30 bg-background/95  py-8 -mx-4 px-4">
        <div className="flex justify-center items-center gap-6 flex-wrap max-w-4xl mx-auto">
          <div className="flex-1 max-w-lg relative group">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search courses by code or faculty... (e.g., CSE101 or FLA)"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full pl-14 pr-14 py-5 rounded-xl border-2 border-border/50 bg-card/50 text-foreground text-base outline-none transition-all duration-300 placeholder-muted-foreground focus:border-primary focus:shadow-lg focus:shadow-primary/25 focus:bg-card/80 group-hover:border-primary/50"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-popover/95  border border-border/50 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50"
              >
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b border-border/20">
                    Faculty Suggestions
                  </div>
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`px-3 py-2 cursor-pointer transition-all duration-200 rounded-lg mx-1 ${
                        index === selectedIndex
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Search size={14} className="opacity-60" />
                        <span className="font-medium">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={onFilterClick}
            className="flex items-center gap-3 px-8 py-5 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-base"
          >
            <Filter size={20} />
            <span>Filters</span>
          </Button>
        </div>
      </div>
    );
  }
);

SearchAndFilter.displayName = "SearchAndFilter";

export default SearchAndFilter;
