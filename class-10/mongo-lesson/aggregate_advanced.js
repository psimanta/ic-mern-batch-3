const mongoose = require("mongoose");
const { Book } = require("../my-express-app/models/books");
const { Author } = require("../my-express-app/models/author");

mongoose
  .connect(
    "mongodb+srv://simanta:FtpjoIY6AZlKZWEe@ic-mern-03.hw3zr.mongodb.net/library"
  )
  .then(() => console.dir("Mongodb connected successfully!"))
  .catch((err) => {
    console.error(err);
  });

/**
 * 1. Basic Group and Count by Genre
 * This aggregation:
 * - Groups all books by their genre
 * - For each genre, calculates:
 *   - Total number of books
 *   - Average price of books
 *   - Total revenue (price * sales)
 * - Sorts results by total revenue in descending order
 * Useful for understanding which genres are most profitable
 */
async function booksByGenre() {
  try {
    const result = await Book.aggregate([
      // Group books by genre and calculate statistics
      {
        $group: {
          _id: "$genre", // Group by the genre field
          numberOfBooks: { $sum: 1 }, // Count number of books in each genre
          averagePrice: { $avg: "$price" }, // Calculate average price per genre
          totalRevenue: { $sum: { $multiply: ["$price", "$sales"] } }, // Calculate total revenue (price * sales)
        },
      },
      // Sort results by total revenue in descending order (-1)
      { $sort: { totalRevenue: -1 } },
    ]);
    console.dir("Books Statistics by Genre:");
    console.dir(result);
  } catch (error) {
    console.error("Error in booksByGenre:", error);
  }
}

/**
 * 2. Author Analytics
 * Complex aggregation that:
 * - Joins books with authors collection using $lookup
 * - Groups data by author and calculates:
 *   - Total books written
 *   - Average book price
 *   - Total sales across all books
 *   - Total revenue
 *   - List of genres they write in
 *   - Detailed book information
 * - Projects formatted results with calculated fields
 * - Sorts by highest revenue authors first
 * Provides comprehensive author performance metrics
 */
async function authorAnalytics() {
  try {
    const result = await Book.aggregate([
      {
        $lookup: {
          from: "authors", // Join with authors collection
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" }, // Deconstruct the author array
      {
        $group: {
          _id: "$authorDetails._id",
          authorName: { $first: "$authorDetails.name" },
          totalBooks: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          totalSales: { $sum: "$sales" },
          revenue: { $sum: { $multiply: ["$price", "$sales"] } },
          genres: { $addToSet: "$genre" }, // Unique list of genres
          books: {
            $push: {
              // Collect all book details
              title: "$title",
              price: "$price",
              sales: "$sales",
              genre: "$genre",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          authorName: 1,
          totalBooks: 1,
          averagePrice: { $round: ["$averagePrice", 2] },
          totalSales: 1,
          revenue: 1,
          genres: 1,
          averageRevenuePerBook: {
            $round: [{ $divide: ["$revenue", "$totalBooks"] }, 2],
          },
          books: 1,
        },
      },
      { $sort: { revenue: -1 } },
    ]);
    console.log("Detailed Author Analytics:");
    console.dir(result);
  } catch (error) {
    console.error("Error in authorAnalytics:", error);
  }
}

/**
 * 3. Sales Analysis with Multiple Facets
 * Uses $facet to run multiple aggregation pipelines in parallel:
 * - genreStats: Analyzes performance by genre
 * - priceRanges: Groups books into price brackets
 * - topPerformers: Identifies best-selling books
 *
 * This gives a multi-dimensional view of the book sales data,
 * useful for identifying trends and patterns across different
 * aspects of the business
 */
async function salesAnalysis() {
  try {
    const result = await Book.aggregate([
      {
        $facet: {
          genreStats: [
            {
              $group: {
                _id: "$genre",
                totalSales: { $sum: "$sales" },
                averagePrice: { $avg: "$price" },
                revenue: { $sum: { $multiply: ["$price", "$sales"] } },
              },
            },
            { $sort: { revenue: -1 } },
          ],
          priceRanges: [
            {
              $bucket: {
                groupBy: "$price",
                boundaries: [0, 10, 20, 30, 50, 100], // Define price brackets
                default: "100+",
                output: {
                  count: { $sum: 1 },
                  titles: { $push: "$title" },
                  totalSales: { $sum: "$sales" },
                  genres: { $addToSet: "$genre" },
                },
              },
            },
          ],
          topPerformers: [
            { $sort: { sales: -1 } },
            { $limit: 5 }, // Top 5 best-selling books
            {
              $project: {
                _id: 0,
                title: 1,
                genre: 1,
                sales: 1,
                revenue: { $multiply: ["$price", "$sales"] },
              },
            },
          ],
        },
      },
    ]);
    console.dir("Sales Analysis:");
    console.dir(result);
  } catch (error) {
    console.error("Error in salesAnalysis:", error);
  }
}

/**
 * 4. Genre Performance Analysis
 * Detailed analysis of performance by genre:
 * - Calculates key metrics like total books, sales, revenue
 * - Provides price analysis (min, max, average)
 * - Lists all books in each genre
 * - Formats output into structured statistics
 *
 * Helps identify which genres are performing best and
 * understand pricing strategies within each genre
 */
async function genrePerformance() {
  try {
    const result = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          totalBooks: { $sum: 1 },
          totalSales: { $sum: "$sales" },
          averagePrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          totalRevenue: { $sum: { $multiply: ["$price", "$sales"] } },
          books: {
            $push: {
              title: "$title",
              price: "$price",
              sales: "$sales",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          statistics: {
            books: "$totalBooks",
            sales: "$totalSales",
            revenue: "$totalRevenue",
            pricing: {
              average: { $round: ["$averagePrice", 2] },
              minimum: "$minPrice",
              maximum: "$maxPrice",
            },
          },
          averageRevenuePerBook: {
            $round: [{ $divide: ["$totalRevenue", "$totalBooks"] }, 2],
          },
          books: 1,
        },
      },
      { $sort: { "statistics.revenue": -1 } },
    ]);
    console.dir("Genre Performance Analysis:");
    console.dir(result);
  } catch (error) {
    console.error("Error in genrePerformance:", error);
  }
}

// Execute all aggregation examples
async function runAggregationExamples() {
  console.dir("\n=== Running Aggregation Examples ===\n");
  await booksByGenre();
  await authorAnalytics();
  await salesAnalysis();
  await genrePerformance();
}

runAggregationExamples().catch(console.error);
