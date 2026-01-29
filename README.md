# Digital-Counselling
# 🌟 Student Counselling Support System

A compassionate digital counselling platform for students, powered by AI to provide 24/7 emotional support and guidance.

## 🎨 Features

- **Beautiful, Calming UI**: Warm, organic design with gradient animations that creates a safe space for students
- **Real-time Chat Interface**: Smooth, responsive conversation experience with typing indicators
- **AI-Powered Counselling**: Empathetic responses using Groq's LLaMA 3.3 70B model
- **Crisis Detection**: Automatic detection of crisis keywords with comprehensive emergency resources
- **Quick Start Prompts**: Pre-written conversation starters tailored to different student challenges
- **Conversation History**: Maintains context throughout the session (last 10 messages)
- **Specialized Support**: Field-specific guidance for Engineering/CS, Medical, and High School students
- **Mobile Responsive**: Works seamlessly on all devices
- **Completely FREE**: No API costs - powered by Groq's free tier

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with custom animations
- **Lucide React** - Beautiful icons
- **React Router** - Navigation
- **Modern JavaScript (ES6+)**

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Groq SDK** - AI-powered responses (LLaMA 3.3 70B)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment
- **Vercel** - Both frontend and backend hosting
- **Environment Variables** - Secure API key management

## 🌐 Live Demo

- **Frontend:** https://digitalocunsellingront-kwff0f5ae-partho221s-projects.vercel.app/counselling
- **Backend API:** https://digitalcounsellingserver-i0ekxixc8-partho221s-projects.vercel.app

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Groq API key (FREE - get it at https://console.groq.com)

### Backend Setup

1. **Navigate to the backend directory and install dependencies:**
```bash
cd Backend
npm install
```

2. **Create a `.env` file in the backend root directory:**
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

**Get your FREE Groq API key:**
- Visit https://console.groq.com
- Sign up (no credit card required!)
- Go to API Keys section
- Create a new API key
- Copy and paste into `.env`

3. **Start the server:**
```bash
# For development with auto-reload
npm run dev

# For production
npm start
```

The server will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to the frontend directory and install dependencies:**
```bash
cd Frontend
npm install
```

2. **Create a `.env` file in the frontend root directory:**
```env
VITE_BACKEND_URL=http://localhost:3001
```

**For production (when deploying to Vercel):**
```env
VITE_BACKEND_URL=https://digitalcounsellingserver-i0ekxixc8-partho221s-projects.vercel.app
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🚀 Deployment

### Backend Deployment (Vercel)

1. **Install Vercel CLI (optional):**
```bash
npm install -g vercel
```

2. **Ensure you have these files in your backend folder:**
- `index.js` (main entry point)
- `package.json`
- `vercel.json`

3. **Deploy to Vercel:**
```bash
cd Backend
vercel --prod
```

4. **Add environment variable in Vercel dashboard:**
- Go to your project settings on Vercel
- Navigate to Environment Variables
- Add `GROQ_API_KEY` with your API key value

### Frontend Deployment (Vercel)

1. **Update `.env` with production backend URL:**
```env
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

2. **Deploy to Vercel:**
```bash
cd Frontend
vercel --prod
```

3. **Add environment variable in Vercel dashboard:**
- Go to your project settings on Vercel
- Navigate to Environment Variables
- Add `VITE_BACKEND_URL` with your backend URL

## 🔧 Configuration

### Backend Configuration

The backend is configured in `index.js` and `server.js`:

**CORS Settings:** Already configured to allow:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative dev port)
- Your production frontend URL

**Rate Limiting:**
- 20 requests per minute per IP
- Prevents API abuse
- Automatic cleanup of old request records

**AI Model:**
- Primary: `llama-3.3-70b-versatile`
- Fallback: `llama-3.1-8b-instant` (if rate limited)
- Temperature: 0.7 (balanced creativity)
- Max tokens: 800 (detailed responses)

### Frontend Configuration

Update the backend URL in `.env`:
```env
VITE_BACKEND_URL=http://localhost:3001  # for local development
# OR
VITE_BACKEND_URL=https://your-backend.vercel.app  # for production
```

## 📡 API Endpoints

### POST `/api/chat`
Send a message and receive AI response

**Request Body:**
```json
{
  "message": "I'm feeling stressed about my upcoming exams",
  "history": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "Hello! I'm here to listen...",
      "timestamp": "2024-01-01T00:00:05.000Z"
    }
  ]
}
```

**Response:**
```json
{
  "response": "I understand exam stress can be overwhelming. It's completely normal to feel this way...",
  "isCrisis": false,
  "modelUsed": "llama-3.3-70b-versatile",
  "timestamp": "2024-01-01T00:00:10.000Z"
}
```

### GET `/api/suggestions`
Get conversation starter suggestions

**Response:**
```json
{
  "suggestions": [
    "I'm feeling stressed about my upcoming exams",
    "I'm struggling with time management",
    "I feel lonely and isolated at university",
    ...
  ]
}
```

### GET `/api/status`
Get API status and features

**Response:**
```json
{
  "status": "operational",
  "groq": {
    "configured": true,
    "ready": true
  },
  "features": {
    "crisisDetection": true,
    "conversationHistory": true,
    "rateLimit": true,
    "specializedSupport": ["engineering", "cs", "medical", "highschool"]
  }
}
```

### GET `/health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "AI Counselling server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Groq LLaMA 3.3 70B"
}
```

## 🎯 Specialized Support Areas

The AI counsellor provides field-specific guidance for:

### Engineering & Computer Science
- Coding challenges and debugging help
- Hackathon preparation and participation
- GATE exam preparation
- Tech internships and placements
- Career path guidance
- Burnout management

### Medical Students
- NEET preparation support
- Medical school stress management
- Clinical rotation challenges
- Specialization guidance
- Work-life balance

### High School Students (Grades 10-12)
- Board exam preparation (10th/12th)
- Stream selection guidance
- JEE/NEET preparation
- Career exploration
- Study techniques

### General Support
- Anxiety and stress management
- Time management skills
- Relationship issues
- Family pressure
- Motivation and confidence building
- Imposter syndrome

## 🚨 Crisis Detection & Resources

The system automatically detects crisis keywords including:
- Suicide-related terms
- Self-harm mentions
- Extreme distress signals

**When crisis is detected, the response includes:**

### Emergency Services
- Emergency: 911 (US) or local emergency number
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741

### Campus Resources
- Campus Counselling Center (24/7)
- Campus Security/Police
- Resident Advisor or Trusted Faculty

### Other Resources
- SAMHSA National Helpline: 1-800-662-4357
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

## 💰 Cost Analysis

### Why Groq?
- **Completely FREE** - No credit card required
- **No API costs** - Unlimited usage on free tier
- **Fast responses** - Powered by LPU (Language Processing Unit)
- **High quality** - LLaMA 3.3 70B model rivals GPT-4

### Comparison with Alternatives:
| Provider | Model | Cost per 1M tokens |
|----------|-------|-------------------|
| Groq | LLaMA 3.3 70B | **FREE** ✨ |
| OpenAI | GPT-3.5-turbo | ~$1.00 |
| OpenAI | GPT-4 | ~$30.00 |
| Anthropic | Claude 3 | ~$15.00 |

**Perfect for:**
- Student projects
- Hackathons
- Learning and experimentation
- Production apps (with proper rate limiting)

## 🐛 Troubleshooting

### Backend Issues

**"ERROR: GROQ_API_KEY is not set"**
- Make sure `.env` file exists in backend folder
- Check that `GROQ_API_KEY=your_key_here` is in `.env`
- Restart the server after adding the key

**CORS Errors**
- Backend `index.js` already has CORS configured
- Make sure frontend URL is in the allowed origins list
- Redeploy backend after CORS changes

**"Module not found" error**
- Run `npm install` in backend folder
- Make sure you have `index.js` or `server.js`
- Check `package.json` has correct main entry point

### Frontend Issues

**"Failed to fetch" or network errors**
- Check backend is running (`http://localhost:3001/health`)
- Verify `VITE_BACKEND_URL` in `.env` is correct
- Restart dev server after changing `.env`
- Check browser console for specific error

**Environment variable not working**
- Must start with `VITE_` for Vite projects
- Restart dev server after adding/changing `.env`
- In production, add to Vercel dashboard

**Styling issues**
- Make sure Tailwind CSS is installed
- Check `tailwind.config.js` is configured correctly
- Verify CSS imports in `main.jsx` or `index.css`

### Deployment Issues

**Vercel build fails**
- Check all files are committed to Git
- Verify `package.json` has correct build scripts
- Ensure `index.js` exists (Vercel entry point)
- Check Vercel logs for specific error

**"Cannot GET /" on deployed backend**
- This is normal! Backend has no root route
- Test with `/health` endpoint instead
- API endpoints work fine: `/api/chat`, `/api/suggestions`

**CORS errors in production**
- Add production frontend URL to CORS whitelist in backend
- Redeploy backend after updating CORS
- Check Vercel environment variables are set

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use environment variables** - For all sensitive data
3. **Implement rate limiting** - Already included (20 req/min)
4. **Validate user input** - Message length limits enforced
5. **Monitor API usage** - Check Groq dashboard regularly
6. **Add authentication** - For production apps with user data

## 🎨 Customization Ideas

### UI Enhancements
- Add dark/light mode toggle
- Customize color schemes in Tailwind config
- Add more animation effects
- Create different themes for different student types

### Feature Additions
- User authentication and profiles
- Save conversation history to database
- Export chat transcripts
- Voice input/output
- Multi-language support
- Sentiment analysis and mood tracking
- Integration with campus resources
- Admin dashboard for analytics

### AI Improvements
- Add context from previous sessions
- Fine-tune responses for specific universities
- Integrate with academic calendars
- Add study resource recommendations
- Create personalized study plans

## 📝 License

MIT License - Feel free to use, modify, and distribute!

## 🤝 Contributing

Contributions are welcome! This project is designed to help students, and any improvements that enhance the user experience or add valuable features are appreciated.

## 📞 Important Disclaimer

**This is an AI-powered support tool, NOT a replacement for professional mental health services.**

- Conversations are with an AI, not a licensed counsellor
- For emergencies, always contact emergency services or crisis hotlines
- For ongoing mental health support, consult with licensed professionals
- The AI provides general guidance and emotional support, not medical advice

## 🌟 Acknowledgments

- **Groq** - For providing free, fast AI inference
- **Vercel** - For free hosting and deployment
- **The open-source community** - For amazing tools and libraries

## 📧 Contact & Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review Groq documentation: https://console.groq.com/docs

---

**Built with ❤️ for student mental health and wellbeing**

*Remember: It's okay to ask for help. You're not alone.* 🌟
