const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ["paid", "accepted"],
        message: "invalid status"
      },
      required: true
    },
    items: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
          },
          name: {
            type: String,
            required: true
          },
          image: {
            type: String,
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          des: {
            type: String,
            required: [true, "description is required"]
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
