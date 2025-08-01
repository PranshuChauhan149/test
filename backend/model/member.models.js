import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
    default: "",
  },

  membership: {
    plan: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    paidAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    paymentMode: { type: String, default: "cash" },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
