import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: Number,
  // images: [{image: String}], //limit to 4?
  image: String,
  userID: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
  tenantEmail: String,
  tenantFirstName: String,
  tenantLastName: String,
  leaseStart: { type: Date, default: Date.now },
  leaseEnd: { type: Date, default: Date.now },
  monthlyRent: Number
});

mongoose.model('Rental', RentalSchema);

module.exports = mongoose.model('Rental');
