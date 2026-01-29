# Digital-Counselling
# 🌟 Student Counselling Support System

A compassionate digital counselling platform for students, powered by AI to provide 24/7 emotional support and guidance.

## 🎨 Features

- **Beautiful, Calming UI**: Warm, organic design that creates a safe space for students
- **Real-time Chat Interface**: Smooth, responsive conversation experience
- **AI-Powered Counselling**: Empathetic responses using OpenAI's GPT models
- **Crisis Detection**: Automatic detection of crisis keywords with emergency resources
- **Quick Start Prompts**: Pre-written conversation starters to help students begin
- **Conversation History**: Maintains context throughout the session
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Modern JavaScript (ES6+)**

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI-powered responses
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Backend Setup

1. **Navigate to the backend directory and install dependencies:**
```bash
npm install
```

2. **Create a `.env` file in the root directory:**
```bash
cp .env.example .env
```

3. **Add your OpenAI API key to `.env`:**
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
```

4. **Start the server:**
```bash
npm run dev
```

The server will run on `http://localhost:3001` or `http://localhost:5000`

### Frontend Setup

1. **Create a new React app with Vite (or use Create React App):**
```bash
npm create vite@latest counselling-frontend -- --template react
cd counselling-frontend
```

2. **Install Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind (tailwind.config.js):**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. **Add Tailwind to your CSS (src/index.css):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Install dependencies:**
```bash
npm install lucide-react
```

6. **Copy `CounsellingApp.jsx` to `src/components/`**

7. **Update your `App.jsx`:**
```javascript
import CounsellingApp from './components/CounsellingApp'

function App() {
  return <CounsellingApp />
}

export default App
```

8. **Start the development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA)

## 🔧 Configuration

### Backend API Endpoint
Update the API endpoint in `CounsellingApp.jsx` if your backend runs on a different port:

```javascript
const response = await fetch('http://localhost:3001/api/chat', {
  // ... configuration
});
```

### OpenAI Model Selection
In `server.js`, you can change the OpenAI model:

```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // or 'gpt-3.5-turbo' for faster responses
  // ... other options
});
```

**Model Options:**
- `gpt-4` - Most capable, best responses (slower, more expensive)
- `gpt-3.5-turbo` - Fast and cost-effective (great for hackathons)
- `gpt-4-turbo` - Balance of capability and speed

## 📡 API Endpoints

### POST `/api/chat`
Send a message and receive AI response

**Request Body:**
```json
{
  "message": "I'm feeling stressed about exams",
  "history": [
    {
      "role": "assistant",
      "content": "Previous message",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Response:**
```json
{
  "response": "I understand exam stress can be overwhelming...",
  "isCrisis": false
}
```

### GET `/api/suggestions`
Get conversation starter suggestions

### GET `/health`
Health check endpoint

## 🎯 For Your Hackathon

### Quick Start Guide

1. **Clone/Download the files**
2. **Backend Setup (5 minutes):**
   - `npm install`
   - Add OpenAI API key to `.env`
   - `npm run dev`

3. **Frontend Setup (5 minutes):**
   - Create Vite React app
   - Install Tailwind CSS and lucide-react
   - Copy component file
   - `npm run dev`

4. **You're ready to demo!** 🎉

### Customization Ideas

- **Add user authentication** for personalized sessions
- **Save conversation history** to a database
- **Add sentiment analysis** to track student mood
- **Integrate with campus resources** (counselling center, hotlines)
- **Add voice input/output** for accessibility
- **Implement chat export** feature
- **Add multi-language support**
- **Create admin dashboard** for analytics

## 🚨 Important Notes

### Crisis Handling
The system automatically detects crisis keywords and provides emergency resources. Always ensure students know how to access real emergency services.

### Privacy & Ethics
- Conversations are not stored by default (add database if needed)
- Clearly communicate this is AI, not a licensed counsellor
- Add proper disclaimers about the limitations of AI counselling
- Ensure GDPR/privacy compliance if storing data

### Rate Limiting
Consider implementing rate limiting on the backend to manage OpenAI API costs:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

app.use('/api/', limiter);
```

## 💰 OpenAI API Costs

For hackathon budgeting:
- GPT-3.5-turbo: ~$0.001 per 1K tokens (very affordable)
- GPT-4: ~$0.03 per 1K tokens (premium)
- Average conversation: 50-100 tokens per message

**Tip:** Start with GPT-3.5-turbo for development and testing!

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, ensure your backend has:
```javascript
app.use(cors());
```

### OpenAI API Errors
- **401 Unauthorized**: Check your API key in `.env`
- **429 Too Many Requests**: You've hit rate limits, wait or upgrade plan
- **500 Server Error**: Check server logs for details

### Frontend Not Connecting
- Verify backend is running on correct port
- Check API endpoint URL in CounsellingApp.jsx
- Inspect browser console for error messages

## 📝 License

MIT License - feel free to use this for your hackathon and beyond!

## 🤝 Contributing

This is a hackathon starter template. Feel free to fork, modify, and make it your own!

## 📞 Emergency Resources

Always include these in your app:
- **National Suicide Prevention Lifeline (US):** 988
- **Crisis Text Line:** Text HOME to 741741
- **International Association for Suicide Prevention:** https://www.iasp.info/resources/Crisis_Centres/

## 🌟 Good Luck with Your Hackathon!

Remember: The goal is to create a helpful tool that promotes student wellbeing. Keep the user experience empathetic, accessible, and supportive.

**Built with ❤️ for student mental health and wellbeing**
