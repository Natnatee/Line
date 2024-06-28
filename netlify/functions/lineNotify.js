const axios = require('axios');

exports.handler = async (event, context) => {
  const token = 'p6B4JxmnBbP1YkcdS5TdmCC60x2pgj72Gw8rfmLs7KC';
  const url = 'https://notify-api.line.me/api/notify';
  const message = JSON.parse(event.body).message;
  const data = new URLSearchParams();
  data.append('message', message);

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: response.data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};