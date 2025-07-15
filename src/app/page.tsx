import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-xl mx-auto space-y-6">
        <ThemeToggle />
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md space-y-2 border-2">
          <h1 className="text-3xl font-bold tracking-tight font-sans">Welcome 👋</h1>
          <p className="text-muted-foreground">
            Theme toggle based on HTML, JS & Tailwind in Next.js.
          </p>
        </div>
      </div>
    </main>
  );
}
