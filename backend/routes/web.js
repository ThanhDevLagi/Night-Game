const express = require('express');
const router = express.Router();
const axios = require("axios");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const BASE_URL = "http://localhost:3000";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Tạo thư mục uploads nếu nó chưa tồn tại
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
router.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/api/categories', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
// Kiểm tra người dùng theo email
router.get('/api/users', async (req, res) => {
    try {
      const { email } = req.query;
      const response = await axios.get(`${BASE_URL}/users?email=${email}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error checking email' });
    }
  });
// Đăng ký người dùng mới
router.post('/api/users', async (req, res) => {
    try {
      const newUser = req.body;
      const response = await axios.post(`${BASE_URL}/users`, newUser);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  });

router.get('/api/comments', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/comments`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Lấy đơn hàng theo user_id và status
router.get('/api/orders', async (req, res) => {
    const { user_id, status } = req.query;
    try {
        const response = await axios.get(`${BASE_URL}/orders?user_id=${user_id}`);
        const orders = response.data.filter(order => order.status === status);
        res.json(orders.length ? orders[0] : []); // If no order found, return an empty array
    } catch (error) {
        console.error('Failed to fetch order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// Tạo đơn hàng mới
router.post('/api/orders', async (req, res) => {
    const newOrder = req.body;
    try {
        const response = await axios.post(`${BASE_URL}/orders`, newOrder);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Cập nhật đơn hàng
router.put('/api/orders/:id', async (req, res) => {
    const updatedOrder = req.body;
    const { id } = req.params;
    try {
        const response = await axios.put(`${BASE_URL}/orders/${id}`, updatedOrder);
        res.json(response.data);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: 'Failed to update order' });
    }
});
// router.get('/api/orders/:id/pending', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const response = await axios.get(`${BASE_URL}/orders?user_id=${id}&status=pending`);
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error fetching pending orders' });
//     }
// });


// // Cập nhật trạng thái của đơn hàng
// router.patch('/api/orders/:id/status', async (req, res) => {
//     const {status}  = req.body;
//     const { id } = req.params;
//     try {
//         const response = await axios.patch(`${BASE_URL}/orders/${id}`, status);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update order status' });
//     }
// });
router.patch('/api/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const response = await axios.patch(`${BASE_URL}/orders/${id}`, { status });
        res.json(response.data);
    } catch (error) {
        console.error('Failed to update order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

router.get('/api/orders/waiting', async (req, res) => {
    const { user_id, status } = req.query;

    if (!user_id || !status) {
        return res.status(400).json({ error: 'User ID and status are required' });
    }

    try {
        const response = await axios.get(`${BASE_URL}/orders`, {
            params: { user_id }
        });
        const orders = response.data.filter(order => order.status === status);
        res.json(orders); // Trả về tất cả các đơn hàng phù hợp với `status`
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// router.post('/api/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }
//     res.json({ filePath: `/uploads/${req.file.filename}` });
// });

// router.put('/api/users/:id', async (req, res) => {
//     const userId = req.params.id;
//     const updatedUser = req.body;
//     try {
//         const response = await fetch(`${BASE_URL}/users/${userId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedUser),
//         });
//         const responseData = await response.json(); // Chuyển đổi phản hồi thành JSON
//         res.json(responseData);
//     } catch (error) {
//         console.error('Failed to update user:', error.message);
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// });

module.exports = router;
