const { MongoClient } = require("mongodb");

// MongoDB
const DB_URL =
  "mongodb+srv://simanta:FtpjoIY6AZlKZWEe@ic-mern-03.hw3zr.mongodb.net/library";

const client = new MongoClient(DB_URL);
let database;
let booksCollection;

// app => mongodb client => mongodb
// app => mongoose => mongodb

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongodDB");
    database = client.db("library");
    booksCollection = database.collection("books");
  } catch (err) {
    console.log("Error connecting: ", err);
  }
}

// create new book
async function createBook(book) {
  try {
    const insertResult = await booksCollection.insertOne(book);
    console.log("Inserted book: ", insertResult);
  } catch (err) {
    console.log("Error creating book: ", err);
  }
}

async function getAllBooks() {
  try {
    const books = await booksCollection.find({}).toArray();
    console.log("All books: ", books);
    return books;
  } catch (err) {
    console.error(err);
  }
}

// Read specific book
async function getBookByTitle(title) {
  try {
    const book = await booksCollection.findOne({ title });
    console.log("Found specific book:", book);
    return book;
  } catch (error) {
    console.error("Error finding book:", error);
  }
}

// Update a book
async function updateBook(title, updateData) {
  try {
    const updateResult = await booksCollection.updateMany(
      { title },
      { $set: updateData }
    );
    console.log("Updated book:", updateResult);
    return updateResult;
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

async function deleteBook(title) {
  try {
    const deleteResult = await booksCollection.deleteMany({ title });
    console.log("Deleted book:", deleteResult);
    return deleteResult;
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

async function run() {
  try {
    await connect();
    // await createBook({
    //   title: "The Great Gatsby",
    //   author: "F. Scott Fitzgerald",
    //   year: 1925,
    //   available: true,
    // });
    // await getAllBooks();
    // await getBookByTitle("1984");
    // await updateBook("The Great Gatsby", { available: false });
    await deleteBook("The Great Gatsby");
  } catch (err) {
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
