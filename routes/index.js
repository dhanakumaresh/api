const router = require('express').Router({ mergeParams: true });

const customer = require('./customer');

// Routes
router.use('/customer', customer);

module.exports = router;