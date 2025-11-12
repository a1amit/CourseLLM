# Users Collection

This collection stores information about all users of the CourseLLM application, including students, instructors, and administrators.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `user_id` | UUID | Primary key |
| `email` | String | Unique, used for login |
| `name` | String | Full name |
| `role` | Enum | `student`, `instructor`, `admin` |
| `created_at` | Timestamp | Account creation date |
