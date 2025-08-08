import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import CourseTable from './components/CourseTable';
import FilterPanel from './components/FilterPanel';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import { useFilteredCourses } from './hooks/useCourses';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hideFilledSections, setHideFilledSections] = useState(false);
  const [facultiesToAvoid, setFacultiesToAvoid] = useState('');
  
  const { courses, isLoading, error, totalCourses, filteredCount, facultyInitials } = useFilteredCourses(
    searchTerm,
    hideFilledSections,
    facultiesToAvoid
  );

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilterApply = () => {
    setIsFilterOpen(false);
  };

  const handleFilterReset = () => {
    setHideFilledSections(false);
    setFacultiesToAvoid('');
    setIsFilterOpen(false);
  };

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterClick={handleFilterClick}
          facultySuggestions={facultyInitials}
        />
        
        <div className="space-y-6 pb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm border border-border/50 rounded-full">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredCount}</span> of <span className="font-semibold text-foreground">{totalCourses}</span> courses
              </p>
            </div>
          </div>
          
          <CourseTable
            courses={courses}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <FilterPanel
          isOpen={isFilterOpen}
          onClose={handleFilterClose}
          hideFilledSections={hideFilledSections}
          onHideFilledSectionsChange={setHideFilledSections}
          facultiesToAvoid={facultiesToAvoid}
          onFacultiesToAvoidChange={setFacultiesToAvoid}
          onApply={handleFilterApply}
          onReset={handleFilterReset}
          facultySuggestions={facultyInitials}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
