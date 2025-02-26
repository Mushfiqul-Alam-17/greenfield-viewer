
import { Card } from "@/components/ui/card";

export const Dashboard = () => {
  return (
    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="glass p-6 fade-in">
        <h3 className="text-xl font-semibold mb-4 gradient-text">
          Soil Moisture
        </h3>
        <div className="text-4xl font-bold">78%</div>
        <p className="text-muted-foreground mt-2">Optimal Range</p>
      </Card>

      <Card className="glass p-6 fade-in [animation-delay:200ms]">
        <h3 className="text-xl font-semibold mb-4 gradient-text">
          Temperature
        </h3>
        <div className="text-4xl font-bold">24°C</div>
        <p className="text-muted-foreground mt-2">Ideal Growing Conditions</p>
      </Card>

      <Card className="glass p-6 fade-in [animation-delay:400ms]">
        <h3 className="text-xl font-semibold mb-4 gradient-text">
          Plant Health
        </h3>
        <div className="text-4xl font-bold">95%</div>
        <p className="text-muted-foreground mt-2">Excellent Condition</p>
      </Card>
    </div>
  );
};
