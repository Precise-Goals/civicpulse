export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
    
    if (!apiKey) {
      console.error('VITE_GNEWS_API_KEY environment variable is not set');
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'Please set VITE_GNEWS_API_KEY in Vercel environment variables'
      });
    }

    const { topic, category = 'Economy', lang = 'en', country = 'in', max = 5 } = req.query;

    let url;
    if (topic) {
      // Search query
      const cleanTopic = topic.trim().slice(0, 90);
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(cleanTopic)}&lang=${lang}&max=${max}&apikey=${apiKey}`;
    } else {
      // Top headlines
      url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&country=${country}&max=${max}&apikey=${apiKey}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GNews API error:', errorText);
      return res.status(response.status).json({ 
        error: 'Failed to fetch news',
        details: errorText 
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in news API route:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
