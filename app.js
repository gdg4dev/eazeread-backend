require("dotenv").config()
const express = require('express');
const { getGPTResponse } = require('./utils/openai');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const axios = require('axios');
const cheerio = require('cheerio');

// API to add new text
app.post('/api/simplify/text', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }
  await getGPTResponse(0, text).then(async d => {
    res.json({ message: "Success", content: await d });
  })
});

// API to fetch JSON response from a URL - just in case~
app.post('/api/simplify/url', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }
  axios.get(url)
  .then(async (response) => {
    // Handle the response
    const htmlData = response.data; // This contains the text data from the URL
    const $ = cheerio.load(htmlData);
    textData =  $('body').text()
    await getGPTResponse(0, textData).then(async d => {
        res.json({ message: "Success", content: await d });
      })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });


  // You can make an HTTP request to the 'url' and process the response
  res.json({ message: "Data fetched successfully from the URL.", url: url });
});

// modifies the text to even 5 year old can understandd 
app.post('/api/modify/text', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }
  // Simulate removing text from the existing resource
  existingText = existingText.replace(text, '');
  res.json({ message: "Text removed successfully.", updatedText: existingText });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
