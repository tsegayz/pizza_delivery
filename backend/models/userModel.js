const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide matching password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "The password doesn't match",
      },
    },
    passwordChangedAt: Date,
    active: Boolean,
    phoneNumber:{
      type: String,
      required: [true, "Please provide a phone number"],
    },
    role_id: {
      type: Number,
      default: 2,
      required: [true, "Please provide a role_id"],
    },
    permission_id: {
      type: Number,
      default: 2,
      required: [true, "Please provide a permission_id"],
    },
    location: String,
  },
  { _id: false, autoCreate: false }
);

// Apply the AutoIncrement plugin to the schema
userSchema.plugin(AutoIncrement, { id: "user_id", inc_field: "_id", start_seq: 100 });


// password encryption
userSchema.pre("save", async function (next) {
	if (this.isNew) {
		const highestId = await this.constructor.aggregate()
		  .group({
			_id: null,
			maxId: { $max: '$_id' },
		  })
		  .project({
			_id: { $add: ['$maxId', 1] },
		  });
	
		if (highestId.length > 0) {
		  this._id = highestId[0]._id;
		} else {
		  this._id = 1; // If no documents exist, start with 1
		}
	  }


	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// a function to check the user's password is valid by comparing the hashed password when the user logs in
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

// a function to check if the user's password has changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < passwordChangedAt;
	}
	return false;
};

// THE MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
