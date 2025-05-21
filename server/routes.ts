import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // WhatsApp users endpoint
  app.get("/api/whatsapp/users", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Mock data - in a real app this would fetch from the Twilio API
    const users = [
      "whatsapp:+14155551234",
      "whatsapp:+16505557890",
      "whatsapp:+12125554321"
    ];
    
    res.json({
      total_participants: users.length,
      user_numbers: users
    });
  });

  // WhatsApp chat history endpoint
  app.get("/api/whatsapp/history", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const { user_number } = req.query;
    
    if (!user_number) {
      return res.status(400).json({ error: "Missing user_number parameter" });
    }
    
    let formattedNumber = user_number as string;
    if (!formattedNumber.startsWith("whatsapp:")) {
      formattedNumber = `whatsapp:${formattedNumber}`;
    }
    
    // Mock chat history - in a real app this would fetch from the Twilio API
    const chatHistory = [
      {
        from: "whatsapp:+14155238886",
        to: formattedNumber,
        body: "Hi there! Thanks for reaching out. Which product are you interested in?",
        date_sent: "2023-05-15T10:17:00Z",
        media: []
      },
      {
        from: formattedNumber,
        to: "whatsapp:+14155238886",
        body: "Hello, I'm interested in your product.",
        date_sent: "2023-05-15T10:15:00Z",
        media: []
      },
      {
        from: formattedNumber,
        to: "whatsapp:+14155238886",
        body: "I saw your premium plan on the website, but I have some questions about the features.",
        date_sent: "2023-05-15T10:20:00Z",
        media: []
      },
      {
        from: "whatsapp:+14155238886",
        to: formattedNumber,
        body: "Of course! I'd be happy to help. What specific features would you like to know more about?",
        date_sent: "2023-05-15T10:22:00Z",
        media: []
      },
      {
        from: formattedNumber,
        to: "whatsapp:+14155238886",
        body: "Can I get a demo before purchasing?",
        date_sent: "2023-05-15T10:25:00Z",
        media: []
      }
    ];
    
    // Sort by date
    chatHistory.sort((a, b) => {
      return new Date(a.date_sent).getTime() - new Date(b.date_sent).getTime();
    });
    
    res.json({
      twilio_number: "whatsapp:+14155238886",
      user_number: formattedNumber,
      chat_history: chatHistory
    });
  });

  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    res.json({
      totalUsers: 248,
      totalMessages: 1423,
      activeToday: 42
    });
  });

  // Recent activity endpoint
  app.get("/api/dashboard/activity", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const activities = [
      {
        user: {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
        },
        action: "sent a message",
        content: "Hello, I'm interested in your product. Can you please provide more information?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        user: {
          name: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
        },
        action: "sent a message",
        content: "Thanks for the quick response! The information was helpful.",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
      },
      {
        user: {
          name: "Emma Wilson",
          avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80"
        },
        action: "sent a media file",
        content: "Sent a product image for your review.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Yesterday
      }
    ];
    
    res.json(activities);
  });

  const httpServer = createServer(app);

  return httpServer;
}
