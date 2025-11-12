# Course Topics Collection

This collection stores information about the topics within each course.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `topic_id` | UUID | Primary key |
| `course` | Course | Parent course |
| `title` | String | Topic name |
| `description` | Text | Brief overview |
| `prerequisites` | List[CourseTopic] | Topics that must be mastered first |
| `mastery_criteria` | JSON | e.g., `{"quiz_score": 0.8, "exercises_completed": 5}` |
| `order` | Integer | Position in trajectory |
| `resources` | List[Resource] | Supplementary materials for this topic |
