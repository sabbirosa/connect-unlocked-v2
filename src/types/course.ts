export interface ClassSchedule {
  startTime: string;
  endTime: string;
  day: string;
}

export interface LabSchedule {
  startTime: string;
  endTime: string;
  day: string;
}

export interface SectionSchedule {
  classPairId: number | null;
  classSlotId: number | null;
  finalExamDate: string | null;
  finalExamStartTime: string | null;
  finalExamEndTime: string | null;
  midExamDate: string | null;
  midExamStartTime: string | null;
  midExamEndTime: string | null;
  finalExamDetail: string | null;
  midExamDetail: string | null;
  classStartDate: string;
  classEndDate: string;
  classSchedules: ClassSchedule[];
  labSchedules: LabSchedule[] | null;
  labSectionId: number | null;
  labCourseCode: string | null;
  labFaculties: string | null;
  labName: string | null;
  labRoomName: string | null;
  prerequisiteCourses: string | null;
  preRegLabSchedule: string | null;
  preRegSchedule: string;
}

export interface Course {
  sectionId: number;
  courseId: number;
  sectionName: string;
  courseCredit: number;
  courseCode: string;
  sectionType: string;
  capacity: number;
  consumedSeat: number;
  semesterSessionId: number | null;
  parentSectionId: number | null;
  faculties: string;
  roomName: string;
  roomNumber: string;
  academicDegree: string;
  sectionSchedule: SectionSchedule;
}

export interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface CourseDisplay {
  courseCode: string;
  sectionName: string;
  faculties: string;
  prerequisiteCourses: string | null;
  capacity: number;
  consumedSeat: number;
  available: number;
  classSchedule: ScheduleItem[];
  labSchedule: ScheduleItem[] | null;
  examDay: string | null;
}
