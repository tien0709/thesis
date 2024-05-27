const express = require('express');
const User = require('../models/User');

const router = express.Router();
// device bao gồm device và sensor
router.get('/api/user', async (req, res) => {
  const { email, pw } = req.query;
  try {
    // Retrieve user
    const user = await User.findOne({
      email: email,
      pw: pw,
    });

    // Kiểm tra nếu user không tồn tại
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    // Trả về user
    res.json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/api/user/:email', async (req, res) => {
  const { email } = req.params;
  try {
    // Retrieve user
    const user = await User.findOne({
      email: email,
    });

    // Kiểm tra nếu user không tồn tại
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    // Trả về user
    res.json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/user/update', async (req, res) => {
  const { email, newEmail, phone } = req.body;
  try {
  
    const update = {};
    if (newEmail) {
      update.email = newEmail;
    }
    if (phone) {
      update.phone = phone;
    }
    // Thực hiện cập nhật người dùng nếu filter không rỗng

      const user = await User.findOneAndUpdate(email, update, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }
      res.json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
