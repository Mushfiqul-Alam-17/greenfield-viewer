
import { FarmScene } from "@/components/FarmScene";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="w-full py-8 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          GreenGuard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-Powered Smart Agriculture System
        </p>
      </header>

      <main>
        <FarmScene />
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
