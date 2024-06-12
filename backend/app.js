const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/web.js');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
