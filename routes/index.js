var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const accountTransactions = {
  accounts: [],
  accountActivities: []
};

/* GET accounts listing. */
router.get('/getListOfAccounts', function (req, res, next) {
  res.json(accountTransactions.accounts);
});

router.post('/createAccount', function (req, res, next) {

  let currencyCode = req.body.currencyCode;
  let balance = req.body.balance;

  if (currencyCode === 'TRY' || currencyCode === 'USD' || currencyCode === 'EUR') {
    if (!Number.isInteger(balance)) {
      const balanceDec = balance.toFixed(2);
      const account = {
        accountNumber: accountTransactions.accounts.length + 1,
        currencyCode: currencyCode,
        balance: balanceDec
      }
      console.log(account);
      accountTransactions.accounts.push(account);
      // res.json(accountTransactions);
      const responseCreateAccount = {
        isError: true,
        referenceNumber: Date.now()
      }
      res.status(200).json(responseCreateAccount);
      return;
    }
    else {
      const responseBalance = {
        isError: false,
        referenceNumber: Date.now()
      }
      res.status(400).json(responseBalance);
    }
  }
  else {
    const responseCurrency = {
      isError: false,
      referenceNumber: Date.now()
    }
    res.status(400).json(responseCurrency);
  }

});


/* GET money page. */
router.get('/getListOfMoneyTransactions', function (req, res, next) {
  res.json(accountTransactions.accountActivities);
  console.log(accountTransactions.accountActivities);
});

router.post('/createMoneyTransaction', function (req, res, next) {

  let senderAccountNumber = req.body.senderAccountNumber;
  let senderFlag = 0;
  let senderCurrency, receiverCurrency, senderBalance;
  let receiverAccountNumber = req.body.receiverAccountNumber;
  let receiverFlag = 0;
  let amount = req.body.amount;

  accountTransactions.accounts.forEach(element => {
    if (senderAccountNumber == element.accountNumber) {
      senderFlag = 1;
      senderCurrency = element.currencyCode;
      senderBalance = element.balance;
    }
  });

  accountTransactions.accounts.forEach(element => {
    if (receiverAccountNumber == element.accountNumber) {
      receiverFlag = 1;
      receiverCurrency = element.currencyCode;
    }
  });

  if (senderFlag == 1 && receiverFlag == 1 && senderBalance >= amount && senderCurrency == receiverCurrency) {

    const accounting = {
      senderAccountNumber: senderAccountNumber,
      receiverAccountNumber: receiverAccountNumber,
      amount: amount
    }
    console.log(accounting);
    accountTransactions.accountActivities.push(accounting);
    const responseSenderMoneyTransfer = {
      isError: true,
      referenceNumber: Date.now()
    }
    res.status(200).json(responseSenderMoneyTransfer);

  }
  else {
    const responseSenderFail = {
      isError: false,
      referenceNumber: Date.now()
    }
    res.status(400).json(responseSenderFail);
  }













  // accountTransactions.accounts.forEach(element => {
  //   if (senderAccountNumber == element.accountNumber) {
  //     let senderCurrency = element.currencyCode;
  //     let senderBalance = element.balance;
  //     if (senderBalance >= amount) {
  //       accountTransactions.accounts.forEach(element => {
  //         if (receiverAccountNumber == element.accountNumber && senderCurrency == element.currencyCode) {
  //           const accounting = {
  //             senderAccountNumber: senderAccountNumber,
  //             receiverAccountNumber: receiverAccountNumber,
  //             amount: amount
  //           }
  //           console.log(accounting);
  //           accountTransactions.accountActivities.push(accounting);
  //           const responseSenderMoneyTransfer = {
  //             isError: true,
  //             referenceNumber: Date.now()
  //           }
  //           res.status(200).json(responseSenderMoneyTransfer);
  //           //res.json(accountTransactions);
  //           return;

  //         }
  //         else {
  //           const responseSenderFail = {
  //             isError: false,
  //             referenceNumber: Date.now()
  //           }
  //           res.status(400).json(responseSenderFail);

  //         }

  //       });
  //     }
  //     else {
  //       const responseSenderFailBalance = {
  //         isError: false,
  //         referenceNumber: Date.now()
  //       }
  //       res.status(400).json(responseSenderFailBalance);

  //     }

  //   }
  //   else {
  //     const responseSenderFailId = {
  //       isError: false,
  //       referenceNumber: Date.now()
  //     }
  //     res.status(400).json(responseSenderFailId);

  //   }

  // });

});






module.exports = router;
