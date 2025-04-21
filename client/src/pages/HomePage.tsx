import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Showcasing my projects, skills, and professional journey
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 py-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="mb-4">
            I am a passionate developer with expertise in web development, AI, and data visualization. 
            My goal is to create meaningful and interactive digital experiences.
          </p>
          <p>
            This portfolio showcases some of my best projects and professional achievements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="space-y-4">
            <SkillBar name="Web Development" value={90} />
            <SkillBar name="AI & Machine Learning" value={85} />
            <SkillBar name="Data Visualization" value={80} />
          </div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ProjectCard 
            title="How Long Would You Survive?"
            description="An interactive choose-your-own-adventure game that tests your survival skills in apocalyptic scenarios."
            link="survival-game"
          />
          <ProjectCard 
            title="Project 2"
            description="Description of another interesting project you've worked on. Add details about technologies used and outcomes."
            link="#"
          />
          <ProjectCard 
            title="Project 3"
            description="A third project showcase with description and details about what problem it solves."
            link="#"
          />
        </div>
      </section>

      <section className="py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="mb-4">Interested in collaborating or have questions? Feel free to reach out!</p>
        <Button variant="default" size="lg" asChild>
          <a href="mailto:your.email@example.com">Contact Me</a>
        </Button>
        
        <div className="flex justify-center gap-4 mt-6">
          <SocialLink href="#" icon="github" />
          <SocialLink href="#" icon="linkedin" />
          <SocialLink href="#" icon="youtube" />
        </div>
      </section>
    </div>
  );
}

function SkillBar({ name, value }: { name: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="w-full bg-secondary h-2.5 rounded-full">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function ProjectCard({ 
  title, 
  description, 
  link 
}: { 
  title: string; 
  description: string; 
  link: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <a href={link}>Learn More</a>
        </Button>
      </CardFooter>
    </Card>
  );
}

function SocialLink({ href, icon }: { href: string; icon: string }) {
  const getIconClass = (name: string) => {
    switch (name) {
      case 'github': return 'i-[lucide--github]';
      case 'linkedin': return 'i-[lucide--linkedin]';
      case 'youtube': return 'i-[lucide--youtube]';
      default: return '';
    }
  };

  return (
    <a 
      href={href} 
      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={`w-5 h-5 ${getIconClass(icon)}`}></span>
    </a>
  );
}