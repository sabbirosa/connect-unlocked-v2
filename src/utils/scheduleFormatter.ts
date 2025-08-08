export interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export const formatScheduleWithHighlighting = (schedules: any[], roomName: string): ScheduleItem[] => {
  return schedules.map(schedule => ({
    day: schedule.day,
    startTime: formatTime(schedule.startTime),
    endTime: formatTime(schedule.endTime),
    room: roomName
  }));
};

export const formatLabScheduleWithHighlighting = (schedules: any[], labRoomName: string | null): ScheduleItem[] => {
  return schedules.map(schedule => ({
    day: schedule.day,
    startTime: formatTime(schedule.startTime),
    endTime: formatTime(schedule.endTime),
    room: labRoomName || 'TBA'
  }));
};

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getDayColor = (day: string): string => {
  const dayColors: { [key: string]: string } = {
    'SUNDAY': 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 shadow-sm',
    'MONDAY': 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 shadow-sm',
    'TUESDAY': 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 shadow-sm',
    'WEDNESDAY': 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 shadow-sm',
    'THURSDAY': 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30 shadow-sm',
    'FRIDAY': 'bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30 shadow-sm',
    'SATURDAY': 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30 shadow-sm'
  };
  
  return dayColors[day] || 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30 shadow-sm';
};
