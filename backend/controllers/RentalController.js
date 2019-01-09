import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import Rental from '../models/Rental';
import Expense from '../models/Expense';
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
import { verifyJWT_MW } from '../middleware';

router.use(bodyParser.json({ limit: '10mb' }));

router.all('*', verifyJWT_MW);

// EXPENSE ROUTES
// Get all financials for a specific userID
router.get('/allexpenses', (req, res) => {
  const userID = req.user._doc._id;
  Expense.find({userID: ObjectId(userID)}, (err, expenses) => {
    if (err) res.status(500).send("There was an error getting all expenses");
    res.status(200).send(expenses);
  });
});

router.get('/exporttocsv', (req, res) => {
  const userID = req.user._doc._id;
  Expense.find({userID: ObjectId(userID)}).
    populate('RentalId').
    exec(function (err, expenses) {
      if (err) res.status(500).send("There was an error getting all expenses");
      //console.log(expenses);
      let expensesArr = [];
      expenses.forEach(elem => {
        let tempObj = {};
        tempObj.Address = elem.RentalId.address1,
        tempObj.Address2 = elem.RentalId.address2;
        tempObj.City = elem.RentalId.city;
        tempObj.Type = elem.type;
        tempObj.Description = elem.description;
        tempObj.Amount = elem.amount;
        tempObj.Date = moment(elem.date).format('MM/DD/YYYY');
        tempObj.Receipt = elem.image;
        expensesArr.push(tempObj);
      })
      res.status(200).send(expensesArr);
    });
});

//============================================================================================================
// Graph Router
//============================================================================================================

router.get('/groupxyear/', function(req, res) {
  const userID = req.user._doc._id;
  const ObjectId = require('mongodb').ObjectId;
  Expense.aggregate([{$match: {userID: ObjectId(userID)}},
                    {$group: {_id: {user: "$userID", type: "$type", year: {$year: "$date"}, month: {$month: "$date"}}, total: {$sum : "$amount"}}}]
                    , (err, expenses) => {
    if (err) res.status(500).send("There was an error getting all expenses");

    res.status(200).send(expenses);
  });
});

router.get('/years/', function(req, res) {
  const userID = req.user._doc._id;
  const ObjectId = require('mongodb').ObjectId;
  Expense.aggregate([{$match: {userID: ObjectId(userID)}},
                    {$group: {_id: {year: {$year: "$date"}}}},{$sort: { "_id.year": -1 } }]
                    , (err, expenses) => {
    if (err) res.status(500).send("There was an error getting years");

    res.status(200).send(expenses);
  });
});

//============================================================================================================

// Get all financials for a specific rentalID
router.get('/:rental/expenses/:year?', (req, res) => {
  const { rental, year } = req.params;
  const searchedExpense = new RegExp(req.query.description);
  let searchParams;
  searchedExpense
    ? searchParams = { RentalId: ObjectId(rental), description: { $regex: searchedExpense, $options: 'i' }}
    : searchParams = { RentalId: ObjectId(rental) };
  Expense.find(searchParams, null, {sort: {date: -1} }, (err, expenses) => {
    if (err) res.status(500).send("there was an error getting expenses for a specific property");
    const filterByYear = expenses.filter(expense => moment(expense.date).format('YYYY') === year);
    res.status(200).send(filterByYear);
  });
});

// Get expenses for specific rentalID and specific expense type
router.get('/:rental/expenses/:year/:expense', (req, res) => {
  const { rental, year, expense } = req.params
  Expense.find( { $and: [ {RentalId: ObjectId(rental)}, {type: expense} ]}, null, {sort: {date: -1}}, (err, expenses) => {
    if (err) res.status(500).send("there was an error getting expenses for a specific property");
    const filterByYear = expenses.filter(expense => moment(expense.date).format('YYYY') === year);
    res.status(200).send(filterByYear);
  });
});

router.get('/:rental/years', (req, res) => {
  const { rental } = req.params;
  Expense.find({ RentalId: ObjectId(rental) }, null, {sort: {date: -1} }, (err, expenses) => {
    if (err) res.status(500).send("there was an error getting expenses for a specific property");
    const allYears = expenses
      .map(expense => moment(expense.date).format('YYYY'))
      .filter((year, i, arr) => arr[i-1] !== year);
    res.status(200).send(allYears);
  });
});

// Post expense for a specific rentalID and specific expense type
router.post('/:rental/expenses/:expense', (req, res) => {
  const userID = req.user._doc._id;
  const rental = req.params.rental;
  const expenseType = req.params.expense;
  const { amount, date, description, image } = req.body;
  Expense.create({
    type: expenseType,
    amount: amount,
    date: date,
    description: description,
    image: image,
    RentalId: ObjectId(rental),
    userID: ObjectId(userID),}, (err, expense) => {
    if(err) res.status(500).send("could not add expense");
    res.status(200).send(expense);
  });
});

// Delete a specific expense by it's ID
router.delete('/expenses/:expense', (req, res) => {
  const expense = req.params.expense;
  Expense.deleteOne({ _id : ObjectId(expense)}, (err, response) => {
    if(err) res.status(500).send('There was an issue deleting an expense');
    res.status(200).send('Your expense was deleted!')
  });
});

// RENTAL ROUTES
router.get('/', (req, res) => {
  const userID = req.user._doc._id;

  Rental.find({ userID : ObjectId(userID) }, (err, rentals) => {
    if (err) res.status(500).send("error finding your rentals", err);
    res.status(200).send(rentals);
  });
});

// sends back a single rental object to display in property details page
router.get('/:rental', (req, res) => {
  const rentalID = req.params.rental;
  Rental.find({ _id : ObjectId(rentalID) }, (err, rental) => {
    if (err) res.status(500).send("error finding your rental", err);
    res.status(200).send(rental);
  });
});

// creates a new property based on current user logged in and returns a confirmation statement
router.post('/', (req, res) => {
  const userID = req.user._doc._id;

  Rental.create({
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    image: req.body.image,
    userID: ObjectId(userID),
    tenantEmail: req.body.tenantEmail,
    tenantFirstName: req.body.tenantFirstName,
    tenantLastName: req.body.tenantLastName,
    leaseStart: req.body.leaseStart,
    leaseEnd: req.body.leaseEnd,
    monthlyRent: req.body.monthlyRent
  },
  { new: true },
  (err, rental) => {
    if (err) res.status(500).send("error adding your property", err);
    res.status(200).send(`Your property at ${rental.address1} has been added.`);
  });
});

// updates a rental and returns a confirmation statement
router.put('/:rental', (req, res) => {
  const rentalID = req.params.rental;

  Rental.findOneAndUpdate(
    { _id: ObjectId(rentalID) },
    req.body,
    // ensures the updated obj will be sent back
    { new: true },
    (err, rental) => {
      if (err) return res.status(500).send("error updating your rental", err);
      res.status(200).send(rental);
  });
});

// deletes a single rental based on it's id
router.delete('/my_rentals/:rental', (req, res) => {
  const rentalID = req.params.rental;

  Rental.findOneAndDelete({ _id: ObjectId(rentalID) }, (err, rental) => {
    if (err) return res.status(500).send("error deleting your property", err);
    // res.send('Your property has been deleted.');
    // cant res.send twice!!! What else do we need to do here???
    console.log('findOneAndDelete fired');
  });

  Expense
    .find({ RentalId: ObjectId(rentalID) })
    .deleteMany({ RentalId: ObjectId(rentalID) }, (err, rentals) => {
      if (err) return res.status(500).send('error deleting your associated expenses.');
      res.status(200).send('Your associated expenses have been deleted.');
    });
});


module.exports = router;
