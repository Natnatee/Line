import React, { useState } from 'react';
import axios from 'axios';

const LineNotify = () => {
  const [message, setMessage] = useState('');

  const sendLineNotify = async () => {
    try {
      const response = await axios.post('/.netlify/functions/lineNotify', { message });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Send Line Notification</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendLineNotify}>Send Notification</button>
    </div>
  );
};

export default LineNotify;