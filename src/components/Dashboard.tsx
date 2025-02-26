
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Cloud, Droplets, Leaf, Thermometer } from "lucide-react";

// More realistic mock data generator with trends
const generateMockData = () => {
  const baseTemp = 24;
  const baseMoisture = 75;
  const baseHealth = 95;
  
  return Array.from({ length: 10 }, (_, i) => ({
    time: new Date(Date.now() - (9 - i) * 3000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    moisture: Math.max(60, Math.min(90, baseMoisture + Math.sin(i * 0.5) * 5)),
    temperature: Math.max(18, Math.min(30, baseTemp + Math.cos(i * 0.5) * 3)),
    health: Math.max(85, Math.min(100, baseHealth + Math.sin(i * 0.3) * 2)),
  }));
};

export const Dashboard = () => {
  const [data, setData] = useState(generateMockData());
  const [weather, setWeather] = useState({
    temperature: 24,
    humidity: 65,
    description: "Partly Cloudy",
  });

  const getStatusColor = (value: number, type: 'moisture' | 'temperature' | 'health') => {
    const ranges = {
      moisture: { low: 65, high: 85 },
      temperature: { low: 20, high: 28 },
      health: { low: 90, high: 95 },
    };
    
    if (value < ranges[type].low) return "text-yellow-500";
    if (value > ranges[type].high) return "text-red-500";
    return "text-green-500";
  };

  // Simulate real-time updates with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastValue = prevData[prevData.length - 1];
        const newData = [...prevData.slice(1), {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          moisture: Math.max(60, Math.min(90, lastValue.moisture + (Math.random() - 0.5) * 2)),
          temperature: Math.max(18, Math.min(30, lastValue.temperature + (Math.random() - 0.5))),
          health: Math.max(85, Math.min(100, lastValue.health + (Math.random() - 0.5))),
        }];
        return newData;
      });

      // Simulate weather updates
      setWeather((prev) => ({
        ...prev,
        temperature: Math.round(prev.temperature + (Math.random() - 0.5)),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 2)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderTooltip = (props: any) => {
    if (!props.active || !props.payload) return null;
    
    return (
      <div className="bg-background/95 border border-border p-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{props.label}</p>
        {props.payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: {item.value.toFixed(1)}{item.name === 'temperature' ? '°C' : '%'}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="glass p-6 fade-in col-span-1 lg:col-span-3">
        <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <Cloud className="w-5 h-5" /> Weather Conditions
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-muted-foreground">Temperature</p>
            <div className={`text-3xl font-bold ${getStatusColor(weather.temperature, 'temperature')}`}>
              {weather.temperature}°C
            </div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Humidity</p>
            <div className={`text-3xl font-bold ${weather.humidity > 80 ? 'text-red-500' : weather.humidity < 40 ? 'text-yellow-500' : 'text-green-500'}`}>
              {weather.humidity}%
            </div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Conditions</p>
            <div className="text-3xl font-bold gradient-text">{weather.description}</div>
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
              <YAxis domain={[60, 90]} />
              <Tooltip content={renderTooltip} />
              <Legend />
              <Line
                type="monotone"
                name="Moisture"
                dataKey="moisture"
                stroke="#7FFFD4"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className={`text-4xl font-bold ${getStatusColor(data[data.length - 1].moisture, 'moisture')}`}>
            {data[data.length - 1].moisture.toFixed(1)}%
          </div>
          <p className="text-muted-foreground mt-2">Optimal Range: 65-85%</p>
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
              <YAxis domain={[18, 30]} />
              <Tooltip content={renderTooltip} />
              <Legend />
              <Line
                type="monotone"
                name="Temperature"
                dataKey="temperature"
                stroke="#FF6B6B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className={`text-4xl font-bold ${getStatusColor(data[data.length - 1].temperature, 'temperature')}`}>
            {data[data.length - 1].temperature.toFixed(1)}°C
          </div>
          <p className="text-muted-foreground mt-2">Ideal Range: 20-28°C</p>
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
              <YAxis domain={[85, 100]} />
              <Tooltip content={renderTooltip} />
              <Legend />
              <Line
                type="monotone"
                name="Health"
                dataKey="health"
                stroke="#98FB98"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className={`text-4xl font-bold ${getStatusColor(data[data.length - 1].health, 'health')}`}>
            {data[data.length - 1].health.toFixed(1)}%
          </div>
          <p className="text-muted-foreground mt-2">Target Range: 90-100%</p>
        </div>
      </Card>
    </div>
  );
};
