Relationships and Embedded Documents
MongoDB, being a NoSQL database, does not enforce strict relationships like SQL databases. However, we can establish relationships between documents using: 1. Referencing (Normalization) – Using ObjectIDs to reference other documents. 2. Embedding (Denormalization) – Storing related data within a document.

Each approach has trade-offs in terms of performance, query complexity, and storage efficiency.

2. Referencing vs. Embedding

Referencing (Normalization)
• Data is stored separately, reducing duplication.
• Ideal for scenarios where related data is frequently updated independently.
• Example: Users and their orders are separate documents.

Embedding (Denormalization)
• Stores related data inside a document as a subdocument.
• Improves read performance since all data is in one place.
• Best for data that is read more often than updated.

3. Types of Relationships in Mongoose
   a. One to One
   Example: User and Profile

   User => email and password
   Profile => profile picture, full name, cover photo

   b. One to Many
   Example: Author and Book

   c. Many to Many
   A B

```typescript
const courseSchema = new mongoose.Schema({
  title: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
```
