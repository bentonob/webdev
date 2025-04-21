import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Professional Journey</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Education, Skills, Experience, and Future Goals
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Resume & Qualifications</h2>
          <p className="mb-6">
            Here you'll find details about my educational background, work experience, and professional skills. 
            You can also download my full resume for more information.
          </p>
          <Button variant="default" size="lg" className="mb-8" asChild>
            <a href="#" download>Download Resume (PDF)</a>
          </Button>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div className="space-y-4">
                <TimelineItem 
                  date="2021 - 2023"
                  title="Master of Science in Computer Science"
                  organization="Example University"
                  description="Specialized in Artificial Intelligence and Machine Learning"
                />
                <TimelineItem 
                  date="2017 - 2021"
                  title="Bachelor of Science in Computer Science"
                  organization="Example College"
                  description="Minor in Data Science"
                />
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">Work Experience</h3>
              <div className="space-y-4">
                <TimelineItem 
                  date="2023 - Present"
                  title="Software Developer"
                  organization="Tech Company Inc."
                  description={[
                    "Developed and maintained web applications using modern JavaScript frameworks",
                    "Implemented machine learning algorithms for data analysis",
                    "Collaborated with cross-functional teams to deliver high-quality software"
                  ]}
                />
                <TimelineItem 
                  date="2022 - 2023"
                  title="Graduate Research Assistant"
                  organization="Example University"
                  description={[
                    "Conducted research on natural language processing techniques",
                    "Published two academic papers in renowned conferences",
                    "Developed prototype applications for research demonstration"
                  ]}
                />
                <TimelineItem 
                  date="Summer 2021"
                  title="Software Engineering Intern"
                  organization="Tech Startup LLC"
                  description={[
                    "Developed features for the company's web application",
                    "Implemented data visualization components",
                    "Participated in agile development processes"
                  ]}
                />
              </div>
            </section>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><strong>Degree:</strong> Master of Science in Computer Science</li>
                <li><strong>University:</strong> Example University</li>
                <li><strong>Graduation:</strong> 2023</li>
                <li><strong>GPA:</strong> 3.9/4.0</li>
              </ul>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold mt-8 mb-4">Technical Skills</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Programming Languages</h4>
              <div className="space-y-3">
                <SkillBar name="JavaScript" value={95} />
                <SkillBar name="Python" value={90} />
                <SkillBar name="Java" value={85} />
                <SkillBar name="C++" value={75} />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Web Technologies</h4>
              <div className="space-y-3">
                <SkillBar name="React" value={90} />
                <SkillBar name="Node.js" value={85} />
                <SkillBar name="HTML/CSS" value={95} />
                <SkillBar name="Express.js" value={80} />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Data Science & AI</h4>
              <div className="space-y-3">
                <SkillBar name="TensorFlow" value={85} />
                <SkillBar name="PyTorch" value={80} />
                <SkillBar name="Scikit-Learn" value={90} />
                <SkillBar name="Pandas/NumPy" value={95} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Professional Portfolios & Profiles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ProfileCard 
            icon="github" 
            title="GitHub" 
            description="Explore my open-source contributions and personal projects on GitHub."
            link="https://github.com/yourusername"
            linkText="Visit My GitHub"
          />
          <ProfileCard 
            icon="youtube" 
            title="YouTube" 
            description="Watch my coding tutorials, project demonstrations, and tech talks."
            link="https://youtube.com/yourusername"
            linkText="Visit My Channel"
          />
          <ProfileCard 
            icon="bar-chart" 
            title="Tableau Public" 
            description="View my data visualization work and interactive dashboards."
            link="https://public.tableau.com/profile/yourusername"
            linkText="View My Visualizations"
          />
        </div>
      </section>
    </div>
  );
}

function TimelineItem({ 
  date, 
  title, 
  organization, 
  description 
}: { 
  date: string; 
  title: string; 
  organization: string; 
  description: string | string[];
}) {
  return (
    <div className="border-l-2 border-primary/20 pl-4 pb-2">
      <div className="font-medium text-muted-foreground">{date}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="mb-2">{organization}</div>
      
      {typeof description === 'string' ? (
        <p>{description}</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SkillBar({ name, value }: { name: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function ProfileCard({ 
  icon, 
  title, 
  description, 
  link, 
  linkText 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  link: string; 
  linkText: string;
}) {
  const getIconClass = (name: string) => {
    switch (name) {
      case 'github': return 'i-[lucide--github]';
      case 'youtube': return 'i-[lucide--youtube]';
      case 'bar-chart': return 'i-[lucide--bar-chart-3]';
      default: return '';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className={`w-12 h-12 ${getIconClass(icon)}`}></div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">{linkText}</a>
        </Button>
      </CardContent>
    </Card>
  );
}