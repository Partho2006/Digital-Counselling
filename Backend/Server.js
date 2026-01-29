import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

if (!process.env.GROQ_API_KEY) {
  console.error("ERROR: GROQ_API_KEY is not set in environment variables");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

const SYSTEM_PROMPT = `You are a compassionate, professional student counsellor AI assistant specializing in supporting students from diverse backgrounds including engineering, computer science, medical fields, and high school students (grades 10-12).

Your role is to:
1. Listen actively and empathetically to students' concerns
2. Provide supportive, non-judgmental guidance tailored to their academic field
3. Help students explore their feelings and thoughts about academic pressure, career choices, and personal challenges
4. Suggest healthy coping strategies, study techniques, and resources specific to their field
5. Offer information about competitions, hackathons, entrance exams (JEE, NEET, GATE), and career paths when relevant
6. Encourage students to seek professional help when needed
7. Maintain a warm, caring, and understanding tone

Specialized knowledge areas:
- Engineering/CS: Coding challenges, hackathons, tech careers, placements, internships
- Medical: NEET prep, medical school stress, clinical rotations, specialization guidance
- High School: Board exams, stream selection, competitive exams, career counseling
- General: Anxiety, depression, relationships, family issues, motivation, time management

Important guidelines:
- Never provide medical diagnoses or prescribe treatments
- For serious mental health crises (suicide, self-harm), immediately recommend professional emergency help
- Be culturally sensitive and inclusive
- Validate students' feelings while offering perspective
- Use open-ended questions to encourage reflection
- Keep responses concise but meaningful (2-4 paragraphs unless more detail is needed)
- Provide specific, actionable advice when appropriate
- If discussing technical topics (coding, medical concepts), be accurate but accessible

Remember: You're here to support and guide, not replace professional mental health services or academic advisors.`;

const isCrisisMessage = (message) => {
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "self-harm",
    "hurt myself",
    "no reason to live",
    "better off dead",
    "end it all",
  ];
  return crisisKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

const checkRateLimit = (identifier) => {
  const now = Date.now();
  const userRequests = requestCounts.get(identifier) || [];
  
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; 
  }
  
  recentRequests.push(now);
  requestCounts.set(identifier, recentRequests);
  return true;
};

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: "Valid message is required" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message is too long. Please keep it under 2000 characters." });
    }

    const clientIp = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: "Too many requests. Please wait a moment before sending another message." 
      });
    }

    const crisis = isCrisisMessage(message);

    const conversationHistory = Array.isArray(history) 
      ? history.slice(-10).map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content || '').slice(0, 1000) 
        }))
      : [];

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    let completion;
    let modelUsed = "llama-3.3-70b-versatile"; 

    try {
      completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile", 
        messages,
        temperature: 0.7,
        max_tokens: 800,
        top_p: 0.9,
      });
    } catch (err) {

      if (err.status === 429 || err.code === 'rate_limit_exceeded') {
        console.warn("Rate limited on llama-3.3-70b, falling back to llama-3.1-8b");
        modelUsed = "llama-3.1-8b-instant";
        
        completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages,
          temperature: 0.7,
          max_tokens: 800,
          top_p: 0.9,
        });
      } else {
        throw err;
      }
    }

    let response = completion.choices[0].message.content;

    if (crisis) {
      response += "\n\n🚨 **URGENT - IMMEDIATE HELP AVAILABLE**:\n\n" +
                  "If you're in immediate danger or having thoughts of self-harm, please reach out RIGHT NOW:\n\n" +
                  "**Emergency Services:**\n" +
                  "• Emergency: 911 (US) or your local emergency number\n" +
                  "• National Suicide Prevention Lifeline: 988 (US)\n" +
                  "• Crisis Text Line: Text HOME to 741741\n\n" +
                  "**Campus Resources:**\n" +
                  "• Campus Counselling Center (available 24/7 at most universities)\n" +
                  "• Campus Security/Police\n" +
                  "• Resident Advisor or Trusted Faculty Member\n\n" +
                  "**Other Resources:**\n" +
                  "• SAMHSA National Helpline: 1-800-662-4357\n" +
                  "• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/\n\n" +
                  "Your life has value, and there are people who want to help you. Please reach out.";
    }

    res.json({ 
      response, 
      isCrisis: crisis,
      modelUsed,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Groq API Error:", error);

    if (error.status === 401 || error.code === 'invalid_api_key') {
      return res.status(500).json({ 
        error: "API authentication failed. Please contact support." 
      });
    }
    
    if (error.status === 429 || error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: "The service is experiencing high demand. Please try again in a few moments." 
      });
    }

    if (error.status === 503 || error.code === 'service_unavailable') {
      return res.status(503).json({ 
        error: "The AI service is temporarily unavailable. Please try again shortly." 
      });
    }

    if (error.code === 'context_length_exceeded') {
      return res.status(400).json({ 
        error: "Conversation is too long. Please start a new conversation." 
      });
    }

    res.status(500).json({ 
      error: "Unable to process your request at this time. Please try again." 
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "AI Counselling server is running",
    timestamp: new Date().toISOString(),
    service: "Groq LLaMA 3.3 70B"
  });
});

app.get("/api/suggestions", (req, res) => {
  const suggestions = [

    "I'm feeling stressed about my upcoming exams",
    "I'm struggling with time management",
    "I feel lonely and isolated at university",
    "I'm having trouble concentrating on my studies",
    "I'm worried about my future career",
    "I'm dealing with anxiety in social situations",
    "I feel overwhelmed by my coursework",
    "I'm having conflicts with my roommate",
    
    // Engineering/CS Specific
    "I'm struggling with coding and debugging",
    "I want to participate in hackathons but don't know where to start",
    "I'm preparing for GATE exam and feeling overwhelmed",
    "How do I find tech internships?",
    "I'm confused about which tech career path to choose",
    "I'm experiencing burnout from constant coding",
    
    "Medical school is extremely overwhelming",
    "I'm preparing for NEET and feeling the pressure",
    "Clinical rotations are emotionally draining",
    "I'm confused about which medical specialization to pursue",

    "I'm stressed about board exams (10th/12th)",
    "I don't know which stream to choose after 10th",
    "I'm preparing for JEE/NEET and feeling anxious",
    "I'm confused about my future career options",
    
    "I feel like I'm not good enough (imposter syndrome)",
    "I'm dealing with family pressure about my career",
    "A friend is doing better than me and I feel discouraged",
    "I failed an exam and feel like a failure",
    "I'm having financial stress as a student",
  ];
  
  res.json({ suggestions });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "operational",
    groq: {
      configured: !!process.env.GROQ_API_KEY,
      ready: true
    },
    features: {
      crisisDetection: true,
      conversationHistory: true,
      rateLimit: true,
      specializedSupport: ["engineering", "cs", "medical", "highschool"]
    }
  });
});

app.listen(PORT, () => {
  console.log(`🤖 AI Counselling Server is running on http://localhost:${PORT}`);
  console.log(`📡 Ready to accept requests at /api/chat`);
  console.log(`🔑 Groq API Key: ${process.env.GROQ_API_KEY ? '✓ Configured' : '✗ Missing'}`);
  console.log(`⚡ Model: llama-3.3-70b-versatile (with llama-3.1-8b-instant fallback)`);
  console.log(`💰 Cost: FREE (No credit card required!)`);
});


process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
});

process.on("SIGTERM", () => {
  console.log("📴 SIGTERM received, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("📴 SIGINT received, shutting down gracefully...");
  process.exit(0);
});