
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}


app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    const id = file.originalname; // Use the original filename for consistency
    const imageUrl = `https://714e398a-c470-4e67-a904-2f40b6993c6c-00-15ewfsrrm7sam.worf.replit.dev/uploads/${id}`;
    res.json({ id, imageUrl });
});


app.get('/uploads/:id', (req, res) => {
    const id = req.params.id;
    const filePath = path.join(__dirname, 'uploads', id);
    if (!fs.existsSync(filePath)) {
        res.status(404).send('Image not found');
    } else {
        res.setHeader('Content-Type', 'image/jpeg'); // Or set dynamically based on file extension
        res.sendFile(filePath);
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
