const express= require('express');
const cors = require('cors');
const OpenAIApi= require('openai');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi({apiKey: process.env.OPENAI_API_KEY,});
app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(5000, () => console.log('Backend server running on port 5000'));
