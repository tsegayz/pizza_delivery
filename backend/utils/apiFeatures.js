class APIFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	filter() {
		// FILTERING
		const queryObj = { ...this.queryStr };
		const excludedFields = ["page", "limit", "sort", "fields"];
		excludedFields.forEach((el) => delete queryObj[el]);

		// advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|letlt)\b/g, (match) => `$${match}`);

		// console.log(JSON.parse(queryStr))

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		// SORTING
		if (this.queryStr.sort) {
			// if i have more than one field to query the data with
			const sortBy = this.queryStr.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}

	limitFields() {
		if (this.queryStr.fields) {
			const fields = this.queryStr.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}
		return this;
	}

	pagination() {
		const page = this.queryStr.page * 1 || 1;
		const limit = this.queryStr.limit * 1 || 10;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = APIFeatures