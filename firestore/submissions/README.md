# Submissions Collection

This collection stores student submissions for assignments.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `submission_id` | UUID | Primary key |
| `assignment` | Assignment | Assignment submitted for |
| `student` | Student | Submitter |
| `file_path` | String | Submission file location |
| `submitted_at` | Timestamp | Submission time |
| `grade` | Float | 0-100 or null if ungraded |
| `feedback` | Text | Instructor/AI comments |
| `cheating_flag` | JSON | `{"ai_generated": 0.85, "plagiarism": null}` |
| `reviewed_by` | Instructor | Human who reviewed (if graded) |
