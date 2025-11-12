# Chat Sessions Collection

This collection stores chat conversations between students and the course chatbot.

## Document Data Model

| Attribute | Type | Description |
|---|---|---|
| `session_id` | UUID | Primary key |
| `student` | Student | Participant |
| `course` | Course | Course context |
| `messages` | List[ChatMessage] | Conversation history |
| `started_at` | Timestamp | Session start |
| `ended_at` | Timestamp | Session end (or null if active) |
| `topics_discussed` | List[CourseTopic] | Inferred from messages |
