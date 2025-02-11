const mongoose = require("mongoose");
const { Movie } = require("./model");

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://simanta:FtpjoIY6AZlKZWEe@ic-mern-03.hw3zr.mongodb.net/sample_mflix"
  );
};

connect()
  .then(() => console.log("Connected to mongodb!"))
  .catch((err) => console.log(err.message));

const getMovies = async () => {
  // Comparison Operators
  // $eq
  //   const movies = await Movie.find({
  //     title: { $eq: "The Great Train Robbery" },
  //   });
  // $ne
  //   const movies = await Movie.find({
  //     type: { $ne: "movie" },
  //   });
  // $gt, $lt, $lte, $gte
  //   const movies = await Movie.find({
  //     runtime: { $lte: 5 },
  //     year: { $gte: 2011 },
  //   });
  // $in
  //   const movies = await Movie.find({
  //     cast: { $in: ["Tom Cruise", "Emily Blunt"] },
  //   });
  // $nin
  //   const movies = await Movie.find({
  //     cast: { $nin: ["Tom Cruise", "Emily Blunt"] },
  //   });
  // Logical Operator
  // $and, $or, $not, $nor
  //   const movies = await Movie.find({
  //     $or: [{ cast: { $in: ["Emily Blunt"] } }, { rated: { $eq: "TV-G" } }],
  //   });
  // $not
  //   const movies = await Movie.find({
  //     rated: {
  //       $nor: [],
  //     },
  //   });
  // Element Operators
  // $exists, $type
  //   const result = await Movie.find({
  //     fullplot: { $exists: true },
  //   });
  //   console.log(result);
  // Sorting and Limiting
  //   const movies = await Movie.find({
  //     year: { $exists: true, $type: "number" },
  //   })
  //     .sort({ year: -1 })
  //     .limit(5);

  //   const movies = await Movie.find({}).select("languages cast").limit(10);

  // skip
  //   const movies = await Movie.find({})
  //     .sort({ title: 1 })
  //     .select("title")
  //     .limit(10)
  //     .skip(1);

  // Pagination
  // page 1, limit 10, skip 0
  // page 2, limit 10, skip 10
  // page 3, limit 10, skip 20
  // page 4, limit 10, skip 30
  const criteria = "runtime";
  const order = "asc";
  const page = 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const movies = await Movie.find({ runtime: { $exists: true } })
    .sort({ [criteria]: order ? 1 : -1 })
    .select("title year runtime")
    .limit(limit) // limit 10 for first page
    .skip(skip);

  console.log(movies);
  console.log("Data count: ", movies?.length || 0);
};

getMovies();
