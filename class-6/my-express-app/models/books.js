const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required!"],
      unique: true,

      // string
      trim: true,
      minlength: [3, "Title must have at least 3 characters!"],
      maxlenghth: 30,
    },
    ISBN: {
      type: String,
      required: [true, "ISBN is required!"],
      unique: true,
      match: [/^\d{3}-\d{10}$/, "ISBN must follow the format 'XXX-XXXXXXXXXX'"],
    },
    genre: {
      type: String,
      enum: ["Fiction", "Thriller", "Sci-Fi"],
      required: [true, "Genre is required!"],
    },
    author: String,
    price: Number,
    publicationDate: Date,
    available: Boolean,
    languages: {
      type: [String],
      default: ["English"],
    }, // ['English', 'Bangla']
    rating: {
      type: Number,
      validate: {
        validator: (v) => {
          return v >= 0 && v <= 5;
        },
        message: (props) => `${props.value} must be between 0 to 5!`,
      },
    },
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Author", // Populate
    // },
    reviews: [
      {
        reviewer: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports.Book = model("Book", bookSchema);
