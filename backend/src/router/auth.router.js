const express = require ('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require ('bcrypt');

const nodemailer = require('nodemailer');
const crypto = require ('crypto');

const { createUser, Login } = require('../controller/auth.contoller');

router.post('/register', createUser )
router.post('/login' , Login )
// router.post('/register-admin', createAdmin)


const passwordResetTokens = [];
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zckyrfn@gmail.com', // username email
        pass: 'vlaw evjt bbwz rbyz', // password email
    }
})

router.post('/forget-password', async (req, res) => {
    const {email} = req.body;

    const token = crypto.randomBytes(20).toString('hex');
    const timestamp = Date.now() + 3600000; // 1 hours

    passwordResetTokens.push({ email, token, timestamp });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
        from: 'zckyrfn@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `Klik tautan berikut untuk mereset kata sandi Anda: ${resetLink}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) { 
            console.error('Error sending email :', error);
            return send.staus(500).json({ message : 'Error sending mail'});
        }
        console.log('Email sent : ' , info.response);
        res.json({ message : 'Email sent, Check your inbox for the reset link.'})
      })
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const tokenData = passwordResetTokens.find(t => t.token === token && t.timestamp > Date.now());
    if (!tokenData) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    };

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    try {
        // Update password di database
        const user = await prisma.user.update({
            where: {
                email: tokenData.email
            },
            data: {
                password: hashedPassword
            }
        });

        // Hapus token setelah digunakan
        const tokenIndex = passwordResetTokens.indexOf(tokenData);
        passwordResetTokens.splice(tokenIndex, 1);

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password' });
    }
});
module.exports = router;
