import type { Course } from "../types";
import {
  formatLabScheduleWithHighlighting,
  formatScheduleWithHighlighting,
} from "../utils/scheduleFormatter";

const API_URL = "https://usis-cdn.eniamza.com/connect.json";

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Course[];
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const transformCourseData = (courses: Course[]) => {
  return courses.map((course) => ({
    courseCode: `${course.courseCode}-[${course.sectionName}]`,
    sectionName: course.sectionName,
    faculties: course.faculties,
    prerequisiteCourses: course.sectionSchedule.prerequisiteCourses,
    capacity: course.capacity,
    consumedSeat: course.consumedSeat,
    available: course.capacity - course.consumedSeat,
    classSchedule: formatScheduleWithHighlighting(
      course.sectionSchedule.classSchedules,
      course.roomName
    ),
    labSchedule: course.sectionSchedule.labSchedules
      ? formatLabScheduleWithHighlighting(
          course.sectionSchedule.labSchedules,
          course.sectionSchedule.labRoomName
        )
      : null,
    examDay: course.sectionSchedule.finalExamDetail,
  }));
};
