import { memo, useMemo } from "react";
import type { CourseDisplay } from "../types";
import { getDayColor } from "../utils/scheduleFormatter";

interface CourseTableProps {
  courses: CourseDisplay[];
  isLoading: boolean;
  error: Error | null;
}

const CourseTable = memo(({ courses, isLoading, error }: CourseTableProps) => {
  // Memoize the table rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => {
    return courses.map((course, index) => (
      <tr
        key={`${course.courseCode}-${index}`}
        className={`${
          course.available < 0
            ? "bg-destructive/5 hover:bg-destructive/10"
            : index % 2 === 0
              ? "bg-card/30 hover:bg-card/50"
              : "bg-card/10 hover:bg-card/30"
        } transition-all duration-200`}
      >
        <td className="p-4 font-mono font-semibold text-foreground border border-border/30">
          <span className="bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
            {course.courseCode}
          </span>
        </td>
        <td className="p-4 border border-border/30">
          <span className="bg-muted/30 px-2 py-1 rounded-md text-sm font-medium">
            {course.faculties}
          </span>
        </td>
        <td className="p-4 border border-border/30">
          {course.prerequisiteCourses ? (
            <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-md text-xs">
              {course.prerequisiteCourses}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          )}
        </td>
        <td className="p-4 text-center font-semibold border border-border/30">
          <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">
            {course.capacity}
          </span>
        </td>
        <td className="p-4 text-center border border-border/30">
          <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-md font-medium">
            {course.consumedSeat}
          </span>
        </td>
        <td
          className={`p-4 text-center font-bold border border-border/30 ${
            course.available < 0
              ? "text-destructive"
              : course.available === 0
                ? "text-yellow-500"
                : "text-green-500"
          }`}
        >
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              course.available < 0
                ? "bg-destructive/10 border border-destructive/20"
                : course.available === 0
                  ? "bg-yellow-500/10 border border-yellow-500/20"
                  : "bg-green-500/10 border border-green-500/20"
            }`}
          >
            {course.available}
          </span>
        </td>
        <td className="p-4 border border-border/30">
          <div className="space-y-2">
            {course.classSchedule.map((schedule, i) => (
              <div key={i} className="space-y-1">
                <span
                  className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getDayColor(schedule.day)}`}
                >
                  {schedule.day}
                </span>
                <div className="text-muted-foreground text-xs space-y-0.5">
                  <div className="font-medium">
                    {schedule.startTime} - {schedule.endTime}
                  </div>
                  <div className="text-xs opacity-75">{schedule.room}</div>
                </div>
              </div>
            ))}
          </div>
        </td>
        <td className="p-4 border border-border/30">
          {course.labSchedule ? (
            <div className="space-y-2">
              {course.labSchedule.map((schedule, i) => (
                <div key={i} className="space-y-1">
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getDayColor(schedule.day)}`}
                  >
                    {schedule.day}
                  </span>
                  <div className="text-muted-foreground text-xs space-y-0.5">
                    <div className="font-medium">
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                    <div className="text-xs opacity-75">{schedule.room}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground text-xs bg-muted/20 px-2 py-1 rounded-md">
              No Lab
            </span>
          )}
        </td>
        <td className="p-4 border border-border/30">
          {course.examDay ? (
            <div className="space-y-1">
              <span
                className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getDayColor(course.examDay)}`}
              >
                {course.examDay}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground text-xs bg-muted/20 px-2 py-1 rounded-md">
              No Exam
            </span>
          )}
        </td>
      </tr>
    ));
  }, [courses]);

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-muted-foreground text-lg font-medium">
          Loading course data...
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Please wait while we fetch the latest information
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p className="text-destructive text-lg font-semibold mb-2">
          Error loading courses
        </p>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-muted-foreground text-lg font-medium mb-2">
          No courses found
        </p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl overflow-hidden">
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-primary/10 to-primary/5">
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Course Code
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Faculty Initial
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Prerequisite
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Seat Capacity
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Booked
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Available
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Class Schedule
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Lab Schedule
              </th>
              <th className="p-4 text-center font-bold text-primary-foreground bg-primary">
                Exam Day
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
});

CourseTable.displayName = "CourseTable";

export default CourseTable;
