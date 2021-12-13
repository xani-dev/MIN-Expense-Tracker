const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firebaseId: {
      type: String,
      required: true,
    },
  },
  { timestamps: { 
      createdAt: "created_at", 
      updatedAt: "updated_at",
     }, 
    },
);

module.exports = mongoose.model("User", userSchema);