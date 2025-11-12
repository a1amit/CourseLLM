# Assignments Collection

This collection stores information about assignments for each course.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `assignment_id` | UUID | Primary key |
| `course` | Course | Parent course |
| `title` | String | Assignment name |
| `type` | Enum | `quiz`, `coding`, `essay`, `exam` |
| `topics` | List[CourseTopic] | Topics assessed |
| `due_date` | Timestamp | Deadline |
| `rubric` | JSON | Grading criteria |
| `llm_resilience_score` | Float | 0-1, how "LLM-proof" it is |
| `submissions` | List[Submission] | Student submissions |
| `created_by` | Instructor | Assignment creator |
