import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AIToolsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">AI Tools & Applications</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interactive demos showcasing my work with AI and web development
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>How Long Would You Survive?</CardTitle>
              <Button 
                onClick={() => {
                  // Handle click to navigate to the survival game tab
                  document.querySelector('[data-value="survival-game"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Play Now
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Test your survival skills in various apocalyptic scenarios with this interactive 
              choose-your-own-adventure game. Make strategic decisions and see how long you would survive!
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Game Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Multiple apocalypse scenarios (Zombie, Alien Invasion, AI Takeover)</li>
                <li>Branching storylines with meaningful choices</li>
                <li>RPG-style stat tracking (Health, Morale, Supplies, Stealth)</li>
                <li>Dynamic outcomes based on your decisions</li>
                <li>Theatrical endings that tell your survival story</li>
              </ul>
            </div>
            
            <div className="bg-muted aspect-video rounded-md flex items-center justify-center mb-4">
              <p className="text-muted-foreground">Game Preview</p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>
                This game was built using React, TypeScript, and modern web technologies.
                The interactive storytelling engine features dynamic state management and a custom
                narrative branching system.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold my-6 text-center">More AI Tools</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <AIToolCard
          title="Text Sentiment Analyzer"
          icon="brain"
          description="An AI-powered tool that analyzes the sentiment of any text input, determining if it's positive, negative, or neutral."
          status="coming-soon"
        />
        
        <AIToolCard
          title="AI Image Generator"
          icon="image"
          description="Create unique images from text descriptions using a state-of-the-art AI model."
          status="coming-soon"
        />
        
        <AIToolCard
          title="Language Translator"
          icon="languages"
          description="A neural machine translation tool that can translate text between multiple languages with high accuracy."
          status="coming-soon"
        />
      </div>

      <section className="py-8">
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-medium mb-3">How "How Long Would You Survive?" Was Built:</h4>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li><strong>Frontend:</strong> React with TypeScript for type safety and better development experience</li>
              <li><strong>State Management:</strong> React's useState and useEffect hooks for tracking game progress</li>
              <li><strong>Styling:</strong> Custom CSS with animations for an immersive experience</li>
              <li><strong>Game Logic:</strong> A custom narrative engine that tracks player choices and calculates outcomes</li>
              <li><strong>Responsive Design:</strong> Fully responsive layout that works on mobile and desktop</li>
            </ul>
            
            <h4 className="font-medium mb-3">Key Features Implemented:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dynamic stat tracking that influences the story outcome</li>
              <li>Branching narrative paths with multiple endings</li>
              <li>Real-time feedback on player choices</li>
              <li>Calculation of survival time based on decision quality</li>
              <li>Atmospheric styling to enhance immersion in each apocalypse scenario</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function AIToolCard({ 
  title, 
  icon, 
  description, 
  status 
}: { 
  title: string; 
  icon: string; 
  description: string; 
  status: "active" | "coming-soon"; 
}) {
  const getIconClass = (name: string) => {
    switch (name) {
      case 'brain': return 'i-[lucide--brain]';
      case 'image': return 'i-[lucide--image]';
      case 'languages': return 'i-[lucide--languages]';
      default: return '';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 text-primary ${getIconClass(icon)}`}></div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="mb-4">{description}</p>
        <div>
          <strong>Status:</strong>{" "}
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "Active" : "Coming Soon"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}