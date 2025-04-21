import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScratchPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Scratch Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Creative experiments and coding adventures
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Drawing App</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">A canvas-based drawing application with various tools and effects.</p>
            <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Drawing Canvas Preview</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Music Visualizer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Audio visualization using Web Audio API and Canvas.</p>
            <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Visualizer Preview</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Procedural Landscape Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Experiment with procedural generation techniques to create unique landscapes.
            </p>
            <div className="bg-muted aspect-[21/9] rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Landscape Generator Preview</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">About My Creative Process</h2>
        <p className="mb-4">
          These scratch projects represent my experiments with various web technologies and creative coding concepts.
          I believe in learning through exploration and these projects have helped me develop new skills while having fun.
        </p>
        <p>
          Most of these experiments start as simple coding challenges that evolve into more complex applications
          as I explore the capabilities of different APIs and frameworks.
        </p>
      </section>
    </div>
  );
}