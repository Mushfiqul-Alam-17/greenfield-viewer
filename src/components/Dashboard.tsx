
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Cloud, Droplets, Leaf, Thermometer } from "lucide-react";

// Temporary mock data - will be replaced with real API data
const generateMockData = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    time: `${i}:00`,
    moisture: Math.floor(Math.random() * (85 - 70) + 70),
    temperature: Math.floor(Math.random() * (28 - 20) + 20),
    health: Math.floor(Math.random() * (100 - 90) + 90),
  }));
};

export const Dashboard = () => {
  const [data, setData] = useState(generateMockData());
  const [weather, setWeather] = useState({
    temperature: 24,
    humidity: 65,
    description: "Partly Cloudy",
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1), {
          time: new Date().toLocaleTimeString(),
          moisture: Math.floor(Math.random() * (85 - 70) + 70),
          temperature: Math.floor(Math.random() * (28 - 20) + 20),
          health: Math.floor(Math.random() * (100 - 90) + 90),
        }];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="glass p-6 fade-in col-span-1 lg:col-span-3">
        <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <Cloud className="w-5 h-5" /> Weather Conditions
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-muted-foreground">Temperature</p>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Humidity</p>
            <div className="text-3xl font-bold">{weather.humidity}%</div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Conditions</p>
            <div className="text-3xl font-bold">{weather.description}</div>
          </div>
        </div>
      </Card>

      <Card className="glass p-6 fade-in">
        <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <Droplets className="w-5 h-5" /> Soil Moisture
        </h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="moisture"
                stroke="#7FFFD4"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-bold">{data[data.length - 1].moisture}%</div>
          <p className="text-muted-foreground mt-2">Optimal Range</p>
        </div>
      </Card>

      <Card className="glass p-6 fade-in [animation-delay:200ms]">
        <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <Thermometer className="w-5 h-5" /> Temperature
        </h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#FF6B6B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-bold">{data[data.length - 1].temperature}°C</div>
          <p className="text-muted-foreground mt-2">Ideal Growing Conditions</p>
        </div>
      </Card>

      <Card className="glass p-6 fade-in [animation-delay:400ms]">
        <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <Leaf className="w-5 h-5" /> Plant Health
        </h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="health"
                stroke="#98FB98"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-bold">{data[data.length - 1].health}%</div>
          <p className="text-muted-foreground mt-2">Excellent Condition</p>
        </div>
      </Card>
    </div>
  );
};
