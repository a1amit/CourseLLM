# Courses Collection

This collection stores information about the courses offered in the CourseLLM application.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `course_id` | UUID | Primary key |
| `title` | String | e.g., "Data Structures & Algorithms" |
| `code` | String | e.g., "CS201" |
| `semester` | String | e.g., "Spring 2025" |
| `instructor` | Instructor | Course owner |
| `topics` | List[CourseTopic] | Learning trajectory |
| `materials` | List[CourseMaterial] | Uploaded content |
| `assignments` | List[Assignment] | Quizzes, exams, projects |
| `enrollments` | List[Enrollment] | Students enrolled |
| `created_at` | Timestamp | Course creation date |
