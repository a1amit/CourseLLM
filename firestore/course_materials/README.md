# Course Materials Collection

This collection stores uploaded files (slides, notes, etc.) indexed for RAG.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `material_id` | UUID | Primary key |
| `course` | Course | Parent course |
| `title` | String | e.g., "Lecture 3 Slides" |
| `file_path` | String | Storage location |
| `file_type` | String | e.g., "pdf", "pptx" |
| `topics` | List[CourseTopic] | Tagged topics |
| `embeddings` | Vector | For semantic search |
| `uploaded_at` | Timestamp | Upload date |
