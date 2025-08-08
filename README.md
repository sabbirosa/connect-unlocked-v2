# Connect Unlocked 1.0

A modern React application for displaying and searching course schedules with real-time data fetching and caching capabilities.

## Features

- **Real-time Data Fetching**: Fetches course data from external API every minute
- **Modern Caching**: Uses React Query for efficient data caching and background updates
- **Search & Filter**: Search courses by course code or faculty initials
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Beautiful dark UI with modern styling
- **Error Handling**: Robust error handling with retry mechanisms
- **Loading States**: Smooth loading animations and user feedback

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Query (TanStack Query)** - Data fetching, caching, and synchronization
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd connect-unlocked-v2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Data Source

The application fetches course data from:
```
https://usis-cdn.eniamza.com/connect.json
```

The data is automatically refetched every minute to ensure the most up-to-date information.

## Features in Detail

### Data Fetching & Caching
- **Automatic Refetch**: Data is refreshed every 60 seconds
- **Background Updates**: Continues updating even when tab is not active
- **Smart Caching**: Efficient cache management with stale-while-revalidate
- **Error Recovery**: Automatic retry with exponential backoff

### Search Functionality
- **Real-time Search**: Instant filtering as you type
- **Multiple Fields**: Search by course code, faculty initials, or prerequisites
- **Case Insensitive**: Search works regardless of case

### UI/UX Features
- **Dark Theme**: Easy on the eyes with modern color scheme
- **Responsive Design**: Optimized for all screen sizes
- **Loading States**: Clear feedback during data loading
- **Error States**: User-friendly error messages
- **Hover Effects**: Interactive elements with smooth animations

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx     # Application header
│   ├── SearchAndFilter.tsx # Search and filter controls
│   └── CourseTable.tsx # Course data table
├── hooks/              # Custom React hooks
│   └── useCourses.ts  # Data fetching hooks
├── services/           # API services
│   └── api.ts         # Data fetching and transformation
├── types/              # TypeScript type definitions
│   └── course.ts      # Course data types
├── App.tsx            # Main application component
├── App.css            # Application styles
└── main.tsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Data Structure

The application processes course data with the following structure:

```typescript
interface Course {
  sectionId: number;
  courseId: number;
  sectionName: string;
  courseCredit: number;
  courseCode: string;
  sectionType: string;
  capacity: number;
  consumedSeat: number;
  faculties: string;
  roomName: string;
  sectionSchedule: SectionSchedule;
  // ... other fields
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with modern React patterns and best practices
- Uses TanStack Query for efficient data management
- Styled with custom CSS for optimal performance
