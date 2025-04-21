import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { 
  apocalypseScenarios, 
  questionSchema,
  gameStateSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get a random apocalypse scenario and questions
  app.get('/api/game/init', (req, res) => {
    try {
      // This would typically come from a database, but for this app
      // we'll handle the game logic on the client-side since it's a
      // simple quiz app with no persistence requirements
      res.json({ 
        success: true,
        message: 'Game initialized successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Failed to initialize game'
      });
    }
  });
  
  // Serve the portfolio static HTML pages
  app.get('/portfolio', (req, res) => {
    res.sendFile(path.resolve('client/public/index.html'));
  });
  
  app.get('/portfolio/scratch', (req, res) => {
    res.sendFile(path.resolve('client/public/scratch.html'));
  });
  
  app.get('/portfolio/career', (req, res) => {
    res.sendFile(path.resolve('client/public/career.html'));
  });
  
  app.get('/portfolio/webapp', (req, res) => {
    res.sendFile(path.resolve('client/public/webapp.html'));
  });
  
  // Serve static CSS files from the public directory
  app.use('/css', (req, res, next) => {
    const options = {
      root: path.join('client/public'),
      dotfiles: 'deny' as const,
      headers: {
        'Content-Type': 'text/css'
      }
    };
    
    res.sendFile(req.url, options, (err) => {
      if (err) {
        next(err);
      }
    });
  });

  // For future expansion: could add routes to store high scores, etc.

  const httpServer = createServer(app);
  return httpServer;
}
