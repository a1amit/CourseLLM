# Learning Progress Collection

This collection tracks a student's mastery of a specific topic.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `progress_id` | UUID | Primary key |
| `student` | Student | Learner |
| `topic` | CourseTopic | Topic being tracked |
| `mastery_level` | Float | 0.0-1.0 (0% - 100%) |
| `status` | Enum | `not_started`, `in_progress`, `mastered` |
| `last_activity` | Timestamp | Most recent interaction |
| `evidence` | JSON | Links to interactions that inform mastery, e.g., `{"quizzes": [quiz_id_1], "assignments": [sub_id_1], "chat_sessions": [session_id_1]}` |
