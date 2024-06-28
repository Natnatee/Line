สร้างโปรเจค Netlify Function
เริ่มต้นโดยสร้างโฟลเดอร์สำหรับ Netlify functions:

bash
Copy code
netlify/functions
สร้างไฟล์ใหม่ในโฟลเดอร์ functions ชื่อ lineNotify.js:

javascript
Copy code
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

///////////////////////////////////////////////
ติดตั้ง Netlify CLI (หากยังไม่ได้ติดตั้ง)
bash
Copy code
npm install -g netlify-cli
npm install axios
///////////////////////////////////////////////


สร้างไฟล์ netlify.toml ที่ root ของโปรเจค
toml
Copy code
[build]
  functions = "netlify/functions"
เรียกใช้ Netlify Dev
bash
Copy code
netlify dev
อัพเดท React component ของคุณให้ยิง request ไปยัง Netlify Function
ใน React component:

javascript
Copy code
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
ในตัวอย่างนี้ axios จะยิง request ไปยัง Netlify function แทนที่จะยิงตรงไปยัง LINE Notify API. Netlify function จะจัดการกับการยิง request และหลีกเลี่ยงปัญหา CORS ที่เกิดขึ้น.

เมื่อคุณ deploy โปรเจคของคุณไปยัง Netlify, function จะสามารถทำงานได้โดยไม่เจอปัญหา CORS.

สร้างไฟล์ netlify.toml ที่ root ของโปรเจค งง root ตรงไหน

ChatGPT
root ของโปรเจคหมายถึงไดเรกทอรีหลักของโปรเจคที่คุณสร้างขึ้น โดยปกติแล้วจะเป็นไดเรกทอรีที่มีไฟล์ package.json และโฟลเดอร์ src อยู่

นี่คือตัวอย่างโครงสร้างของโปรเจค:

java
Copy code
my-react-app/
├── netlify/
│   └── functions/
│       └── lineNotify.js
├── public/
├── src/
├── .gitignore
├── netlify.toml
├── package.json
└── README.md