const mongoose = require("mongoose");
const { Book } = require("./models/books");
const { Author } = require("./models/author");

mongoose
  .connect(
    "mongodb+srv://simanta:FtpjoIY6AZlKZWEe@ic-mern-03.hw3zr.mongodb.net/library"
  )
  .then(() => console.log("Mongodb connected successfully!"))
  .catch((err) => {
    console.error(err);
  });

// Distinct
const findDistinctGenre = async () => {
  const result = await Book.distinct("genre", {
    genre: {
      $ne: "Fantasy",
    },
  });
  console.log(result);
};

// Count books
const countBooks = async () => {
  const result = await Book.countDocuments({
    price: {
      $gt: 30,
    },
  });
  console.log(result);
};

// Estimation
const countEstimatedBooks = async () => {
  const result = await Book.estimatedDocumentCount();
  console.log(result);
};

// countBooks();
// findDistinctGenre();
// countEstimatedBooks();

// Aggregation Pipeline
// Calculate total Sales
const totalBookSales = async () => {
  const result = await Book.aggregate([
    // Stage 1
    // {
    //   $match: {
    //     price: {
    //       $lte: 30,
    //     },
    //   },
    // },
    // Stage 2
    {
      $group: {
        _id: "$author",
        totalSales: {
          $sum: "$sales",
        },
        averagePrice: {
          $avg: "$price",
        },
      },
    },
  ]);

  await Author.populate(result, {
    path: "_id",
    select: "name",
  });

  console.log(result);
};

const mostExpensiveBook = async () => {
  const result = await Book.aggregate([
    {
      $sort: {
        price: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        title: 1,
        price: 1,
        _id: 0,
      },
    },
  ]);
  console.log(result);
};

// Calculate revenue by author
const revenueByAuthor = async () => {
  const result = await Book.aggregate([
    // Stage 1: Joining
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    // Stage 2: Flattening array
    {
      $unwind: "$authorDetails",
    },
    // Stage 3:
    {
      $group: {
        _id: "$authorDetails._id",
        authorName: {
          $first: "$authorDetails.name",
        },
        totalSales: {
          $sum: "$sales",
        },
        avgPrice: {
          $avg: "$price",
        },
        totalRevenue: { $sum: { $multiply: ["$price", "$sales"] } },
        books: {
          $push: {
            title: "$title",
            genre: "$genre",
          },
        },
      },
    },
    {
      $sort: {
        totalRevenue: -1,
      },
    },
  ]);
  console.table(JSON.stringify(result, null, 2));
  // console.log(result);
};

// totalBookSales();
revenueByAuthor();
// mostExpensiveBook();
