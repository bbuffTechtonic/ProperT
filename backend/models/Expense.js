import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  type: String, //example hoa, or mortgage(single $ amount).
  amount: Number,
  date: { type: Date, default: Date.now },
  description: String,
  image: String, //phase 2 add capability to add multiple photos
  RentalId: {type: mongoose.Schema.Types.ObjectId,ref: "Rental"},
  userID: {type: mongoose.Schema.Types.ObjectId,ref: "User"}
});

mongoose.model('Expense', ExpenseSchema);

//phase 2 separate out principal, interest, escrow, mortgage insurance
//monthly statement

module.exports = mongoose.model('Expense');
