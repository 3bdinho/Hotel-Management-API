class APIFeatures {
  constructor(mongooseQuery, queryString) {
    this.query = mongooseQuery; //Model.find()
    this.queryString = queryString; // req.query
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    // apply filter useing [gte|gt|lte|lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in|ne)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search(searchFields = []) {
    const { keyword } = this.queryString;

    if (keyword) {
      let query = {};

      query = { name: { $regex: this.queryString.keyword, $options: "i" } };

      this.query = this.query.find(query);
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // e.g. sort=price,-createdAt
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      // exclude __v by default
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate(countDocuments) {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 20;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.query = this.query.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}

module.exports = APIFeatures;
