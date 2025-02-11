**Advanced Querying Techniques with Mongoose**

## Introduction

Mongoose is a powerful ODM (Object Data Modeling) library for MongoDB, providing various querying techniques to efficiently retrieve and manipulate data. In this lecture, we will explore advanced querying techniques using Mongoose, including filtering, sorting, limiting, projection, and text indexes for search functionality.

## 1. Filtering Data with Comparison, Logical, and Element Operators

Mongoose provides powerful operators for filtering data, making queries more flexible and precise.

### 1.1 Comparison Operators

Comparison operators allow us to filter documents based on field values. Some common operators include:

- `$eq` (equal to)

```javascript
const users = await User.find({ age: { $eq: 25 } });
```

- `$ne` (not equal to)

```javascript
const users = await User.find({ status: { $ne: "inactive" } });
```

- `$gt` (greater than)

```javascript
const products = await Product.find({ price: { $gt: 100 } });
```

- `$gte` (greater than or equal to)

```javascript
const users = await User.find({ age: { $gte: 18 } });
```

- `$lt` (less than)

```javascript
const products = await Product.find({ stock: { $lt: 50 } });
```

- `$lte` (less than or equal to)

```javascript
const users = await User.find({ age: { $lte: 30 } });
```

- `$in` (matches any value in an array)

```javascript
const users = await User.find({ role: { $in: ["admin", "editor"] } });
```

- `$nin` (does not match any value in an array)

```javascript
const users = await User.find({ status: { $nin: ["inactive", "banned"] } });
```

### 1.2 Logical Operators

Logical operators are used to combine multiple conditions:

- `$and` (matches all conditions)

```javascript
const users = await User.find({
  $and: [{ age: { $gte: 18 } }, { status: "active" }],
});
```

- `$or` (matches any condition)

```javascript
const users = await User.find({
  $or: [{ age: { $gte: 18 } }, { subscriptionStatus: "active" }],
});
```

- `$not` (negates a condition)

```javascript
const users = await User.find({ age: { $not: { $gte: 18 } } });
```

- `$nor` (none of the conditions match)

```javascript
const users = await User.find({
  $nor: [{ age: { $gte: 18 } }, { status: "active" }],
});
```

### 1.3 Element Operators

These operators check for field existence or type:

- `$exists` (checks if a field exists)

```javascript
const orders = await Order.find({ shippedDate: { $exists: true } });
```

- `$type` (checks the data type of a field)

```javascript
const logs = await Log.find({ timestamp: { $type: "date" } });
```

## 2. Sorting and Limiting Query Results

To optimize query results, Mongoose provides sorting and limiting functionalities.

### 2.1 Sorting Results

Sorting is done using the `.sort()` method, where:

- `1` indicates ascending order.
- `-1` indicates descending order.

**Example:**

```javascript
const sortedUsers = await User.find().sort({ age: -1 });
```

### 2.2 Limiting and Skipping Results

- `.limit(n)`: Restricts the number of documents returned.
- `.skip(n)`: Skips the first `n` documents.

**Example:**

```javascript
const limitedProducts = await Product.find().limit(10).skip(5);
```

## 3. Using Projection to Retrieve Specific Fields

Projection is used to select only specific fields, improving performance and reducing data transfer.

### 3.1 Including Specific Fields

Use `1` to include fields:

```javascript
const users = await User.find({}, { name: 1, email: 1 });
```

### 3.2 Excluding Specific Fields

Use `0` to exclude fields:

```javascript
const users = await User.find({}, { password: 0 });
```

### 3.3 Using `select()` Method

```javascript
const users = await User.find().select("name email");
```

Text indexes in MongoDB enable full-text search capabilities for efficient querying of text-based fields. Unlike regular indexing, text indexes allow you to perform searches on words and phrases, making them particularly useful for applications that require search functionality.

## Conclusion

Mastering advanced querying techniques in Mongoose enhances efficiency in data retrieval and manipulation. By leveraging comparison, logical, and element operators, sorting, limiting, projection, and text search, developers can build optimized and scalable applications.

## Practice Questions

1. How would you filter movies where `runtime` is greater than 90 but less than 120 minutes?
2. What method would you use to sort movies by `imdb.rating` in descending order?
3. How can you return only the `title` and `plot` fields while excluding the `_id` field?
4. Write a query to find movies that are either rated 'PG' OR have more than 10000 IMDB votes, AND were released after 1975?
5. How would you implement pagination to display 20 results per page for the 3rd page of movies, sorted by their release date?
6. Create a compound query that finds movies that have both 'Adventure' and 'Crime' in their genres array, have a runtime greater than 100 minutes, and have won at least 1 award?
7. Write a query to find the top 5 directors with movies having the highest average IMDB rating, including only those who have directed at least 3 movies?
8. How would you use text search with multiple conditions to find movies that match certain keywords in their plot while also being in a specific runtime range and having certain actors in the cast?
9. Write a query to find all movies where the `fullplot` contains the words "Victorian" or "England" and have Sean Connery in the cast.
10. Create a query to find movies that:
    - Were released between 1975 and 1980
    - Have both a `plot` and `fullplot` field
    - Have an IMDB rating greater than 6.5
11. How would you find all movies where:
    - The director is also listed as a writer
    - The movie has won at least one award
    - The runtime is between 100 and 120 minutes
12. Write a query to find movies that:
    - Are produced by "MGM" (hint: check tomatoes.production)
    - Have been released in the UK
    - Have an IMDB vote count greater than 10000
13. Create a query to find all movies where:
    - The movie has exactly 3 genres
    - One of those genres must be "Adventure"
    - The movie must be rated "PG"
14. How would you query for movies that:
    - Have a DVD release date (tomatoes.dvd exists)
    - Have more "fresh" than "rotten" ratings in tomatoes
    - Were released before the year 2000
15. Write a query to find movies where:
    - The title length is less than 30 characters
    - Has at least 2 languages listed
    - Has both a poster URL and an IMDB ID
16. Create a query to find movies where:
    - The director has made at least one other movie in the database
    - The movie has won more awards than nominations
    - The movie is in English and at least one other language

By practicing with these questions, you'll become more familiar with MongoDB's query operators and how to effectively search through complex document structures.
