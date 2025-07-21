export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Demo content to show scrolling behavior */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-sans">
              Welcome to LineupLab
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-sans">
              Build the perfect lineup for your team with our advanced analytics and management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-sans">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors font-sans">
                Get Started Free
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors font-sans">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Additional sections to demonstrate scroll behavior */}
        {Array.from({ length: 10 }).map((_, i) => (
          <section key={i} className="py-20 border-t border-border font-sans">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-sans">Section {i + 1}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
                This is demo content to show how the navbar behaves when scrolling. Notice how it becomes blurred and
                gains a border when you scroll down.
              </p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

