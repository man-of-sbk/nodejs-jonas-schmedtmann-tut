const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      // *** 'unique' is not a 'built-in validator', it just tells mongoose to add a unique index to a field
      // *** the error that 'unique' returns is entirely handled from mongodb server, not from mongoose
      // ***** READMORE: https://stackoverflow.com/questions/38945608/custom-error-messages-with-mongoose
      // ================================================================================================
      // *** for creating custom error message for 'unique' & others things like 'unique'
      // ***** READMORE https://mongoosejs.com/docs/middleware.html#error-handling-middleware
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less than or equal to 40 characters'
      ],
      minlength: [
        10,
        'A tour name must have more than or equal to 10 characters'
      ]
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficulty'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          console.log(val, this.price);
          // *** this field must be less than the 'price' field
          // ==================================================
          // *** this of this function returns the current document when we create a new document => it won;t work when we
          // ***** update a document
          return val < this.price;
        },
        message:
          'discount price is: {VALUE} which should be below regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  // *** calculate numbers of weeks based on numbers of days
  return this.duration / 7;
});

// *** document middleware
(() => {
  tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {
      lower: true
    });

    next();
  });

  // tourSchema.post('save', function(next) {
  //   console.log(this);

  //   next();
  // });
})();

// *** query middleware
(() => {
  // *** /^find/ => match all find query
  tourSchema.pre(/^find/, function(next) {
    this.find({
      secretTour: { $ne: true }
    });

    this.start = Date.now();

    next();
  });

  tourSchema.post(/^find/, function(docs, next) {
    console.log(`this query took ${Date.now() - this.start} milliseconds !`);
    next();
  });
})();

// *** aggregation middleware
(() => {
  tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({
      $match: {
        secretTour: {
          $ne: true
        }
      }
    });
    next();
  });
})();

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
