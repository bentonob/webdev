import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ApocalypseQuiz from "./pages/ApocalypseQuiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Portfolio pages
import HomePage from "./pages/HomePage";
import ScratchPage from "./pages/ScratchPage";
import CareerPage from "./pages/CareerPage";
import AIToolsPage from "./pages/AIToolsPage";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-background">
          <header className="bg-primary/10 py-6">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-primary">My Portfolio</h1>
            </div>
          </header>
          
          <main className="container mx-auto py-8 px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="scratch">Scratch</TabsTrigger>
                <TabsTrigger value="career">Graduate Career</TabsTrigger>
                <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
                <TabsTrigger value="survival-game">Survival Game</TabsTrigger>
              </TabsList>
              
              <TabsContent value="home">
                <HomePage />
              </TabsContent>
              
              <TabsContent value="scratch">
                <ScratchPage />
              </TabsContent>
              
              <TabsContent value="career">
                <CareerPage />
              </TabsContent>
              
              <TabsContent value="ai-tools">
                <AIToolsPage />
              </TabsContent>
              
              <TabsContent value="survival-game">
                <ApocalypseQuiz />
              </TabsContent>
            </Tabs>
          </main>
          
          <footer className="bg-primary/5 py-6 mt-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">&copy; 2025 My Portfolio. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
