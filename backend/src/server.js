const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const jwt = require ('jsonwebtoken');
const express = require('express');
const app = express();
const midtransClient = require('midtrans-client');


app.use(express.json());
app.use(cors());

const authRouter = require('./router/auth.router.js');
const postRouter = require ('./router/post.router.js');
const ItemRouter = require ('./router/item.router.js');
const VariantRouter = require('./router/game.router.js')

app.use('/api' , postRouter);
app.use('/api' , authRouter);
app.use('/api' , ItemRouter);
app.use('/api' , VariantRouter);

app.post('/api/verify-token', (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(400).json({ message: 'Token not provided' });

  jwt.verify(token, process.env.jwtTOKEN, (err, user) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      res.status(200).json({ message: 'Token verified', user });
  });
});

app.post('/api/createTransaction', async (req, res) => {
  try {
    const { itemId, price } = req.body;

    // Pastikan itemId dan price ada di dalam req.body sebelum melakukan destrukturisasi
    if (!itemId || !price) {
      return res.status(400).json({ message: 'itemId or price is missing in the request body' });
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-wxRehCB2R2A6Uli_OvcFY3ns',
      clientKey: 'SB-Mid-client-P_2qMY2U3g1blgqQ'
    });

    const transactionDetails = {
      order_id: `order-${Date.now()}`,
      gross_amount: price,
    };

    const midtransItemDetails = {
      id: itemId,
      price: price,
      quantity: 1,
      name: 'Your Item Name',
    };

    const transaction = await snap.createTransaction({
      transaction_details: transactionDetails,
      item_details: [midtransItemDetails],
      credit_card: {
        secure: true,
      },
    });

    const token = transaction.token;

    return res.json({ token, paymentUrl: transaction.redirect_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const snap = new Snap({
//   isProduction: false,
//   serverKey: 'SB-Mid-server-wxRehCB2R2A6Uli_OvcFY3ns',
//   clientKey: 'SB-Mid-client-P_2qMY2U3g1blgqQ',
//   ira: Transactions,
// });



// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Direktori untuk menyimpan file yang diunggah
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Menetapkan nama file yang diunggah
//     }
// });

// // Membuat middleware untuk mengunggah file
// const upload = multer({ storage: storage });

// module.exports = upload;
