import { prisma } from "@/lib/db/prisma";
import { getUserById } from "@/lib/db/getUserById";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const clerkUser = await currentUser();
  
  // Fetch current user from database using getUserById
  let dbUser = null;
  if (clerkUser?.id) {
    dbUser = await getUserById(clerkUser.id);

  }
  
  // Fetch all users from the database
  const allUsers = await prisma.user.findMany();
  
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
            
            {/* Display current user details from getUserById */}
            {clerkUser && (
              <div className="mt-8 p-4 border rounded-lg bg-muted text-left max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Current User Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-background rounded border">
                    <h3 className="font-bold mb-2">Clerk User Data:</h3>
                    <div className="text-sm space-y-1">
                      <p><strong>ID:</strong> {clerkUser.id}</p>
                      <p><strong>Email:</strong> {clerkUser.emailAddresses?.[0]?.emailAddress}</p>
                      <p><strong>First Name:</strong> {clerkUser.firstName}</p>
                      <p><strong>Last Name:</strong> {clerkUser.lastName}</p>
                      <p><strong>Created:</strong> {new Date(clerkUser.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <h3 className="font-bold mb-2">Database User (getUserById):</h3>
                    {dbUser ? (
                      <div className="text-sm space-y-1">
                        <p><strong>DB ID:</strong> {dbUser.id}</p>
                        <p><strong>Clerk ID:</strong> {dbUser.clerkId}</p>
                        <p><strong>Email:</strong> {dbUser.email}</p>
                        <p><strong>Created:</strong> {dbUser.createdAt.toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <p className="text-destructive">User not found in database</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Display all users from database */}
            <div className="mt-8 p-4 border rounded-lg bg-muted text-left max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center">All Users in Database</h2>
              {allUsers.length > 0 ? (
                <div className="space-y-2">
                  {allUsers.map((user) => (
                    <div key={user.id} className="p-3 bg-background rounded border">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span><strong>ID:</strong> {user.id}</span>
                        <span><strong>Clerk ID:</strong> {user.clerkId}</span>
                        <span><strong>Email:</strong> {user.email}</span>
                        <span><strong>Created:</strong> {user.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No users found in database</p>
              )}
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

