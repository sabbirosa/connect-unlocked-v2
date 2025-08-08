import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchCourses, transformCourseData } from '../services/api';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    select: transformCourseData,
    refetchInterval: 60000, // Refetch every 1 minute
    refetchIntervalInBackground: true,
    staleTime: 30000, // Consider data stale after 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Extract unique faculty initials from course data
export const extractFacultyInitials = (courses: any[]): string[] => {
  const facultySet = new Set<string>();
  
  courses.forEach(course => {
    if (course.faculties) {
      // Split faculties by comma and extract initials
      const faculties = course.faculties.split(',').map((f: string) => f.trim());
      faculties.forEach((faculty: string) => {
        // Extract initials (usually 2-4 characters)
        const initials = faculty.match(/^[A-Z]{2,4}/);
        if (initials) {
          facultySet.add(initials[0]);
        }
      });
    }
  });
  
  return Array.from(facultySet).sort();
};

export const useFilteredCourses = (
  searchTerm: string,
  hideFilledSections: boolean = false,
  facultiesToAvoid: string = ''
) => {
  const { data: courses, isLoading, error, isError } = useCourses();
  
  // Memoize the faculty initials extraction
  const facultyInitials = useMemo(() => {
    return courses ? extractFacultyInitials(courses) : [];
  }, [courses]);
  
  // Memoize the filtered courses to prevent unnecessary re-computations
  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    
    return courses.filter(course => {
      // Search filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          course.courseCode.toLowerCase().includes(searchLower) ||
          course.faculties.toLowerCase().includes(searchLower) ||
          (course.prerequisiteCourses && course.prerequisiteCourses.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }
      
      // Hide filled sections filter
      if (hideFilledSections && course.available <= 0) {
        return false;
      }
      
      // Faculties to avoid filter
      if (facultiesToAvoid.trim()) {
        const avoidFaculties = facultiesToAvoid
          .split(',')
          .map(f => f.trim().toUpperCase())
          .filter(f => f.length > 0);
        
        if (avoidFaculties.some(faculty => course.faculties.includes(faculty))) {
          return false;
        }
      }
      
      return true;
    });
  }, [courses, searchTerm, hideFilledSections, facultiesToAvoid]);
  
  return {
    courses: filteredCourses,
    isLoading,
    error,
    isError,
    totalCourses: courses?.length || 0,
    filteredCount: filteredCourses.length,
    facultyInitials
  };
};
