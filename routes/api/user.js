const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const {Transaction} = require("../../models/transaction");

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { email,password } } = req;

  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
var user={
    "email":email,
    "password":password
}
  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});
router.get("/balance",auth.required,async (req,res,next)=>{
  var startDate = req.body.startDate
  var endDate = req.body.endDate
  const { payload: { id } } = req;
  var transactions = await Transaction.find({"PaymentDate":{$gt: new Date(startDate),$lt:new Date(endDate)},"User": id}).lean()
        var balance;
      transactions.forEach(transactions => {
        balance += transactions.Amount;
      });
    res.status(200).send({"balance":balance,"Transactions":transactions})
})


//GET current route (required, only authenticated users have access)
router.get('/current', auth.required,  (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;