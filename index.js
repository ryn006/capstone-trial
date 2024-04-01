const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');

const app = express();
const upload = multer();

app.use(express.static('public'));

app.post('/classify-image', upload.single('image'), async (req, res) => {
  const form = new FormData();
  form.append('file', req.file.buffer, req.file.originalname);

  try {
    const response = await axios.post('https://api.spoonacular.com/food/images/classify', form, {
      headers: {
        ...form.getHeaders(),
        'x-api-Key': '6b283e2478894e3b876d0617f07f970e',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to classify image.' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});