import { useEffect, useState } from "react";
import { Clock, CalendarDays, Sun, Moon, CloudSun } from "lucide-react";

export default function DashboardWidgets() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();

  let greeting = "Good Evening";
  let Icon = Moon;

  if (hour < 12) {
    greeting = "Good Morning";
    Icon = Sun;
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    Icon = CloudSun;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-10">
      {/* Greeting */}

      <div className="bg-linear-to-r from-yellow-700 to-orange-900">
        <div className="flex items-center gap-4">
          <Icon size={42} />

          <div>
            <h2 className="text-3xl font-bold">{greeting} 👋</h2>

            <p className="opacity-90 mt-2">Welcome to Wood Art Enterprises</p>
          </div>
        </div>
      </div>

      {/* Clock */}

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="text-[#8B5E3C]" />

          <h3 className="font-bold text-xl">Current Time</h3>
        </div>

        <p className="text-5xl font-bold text-[#3E2723]">
          {time.toLocaleTimeString()}
        </p>

        <div className="flex items-center gap-2 mt-5 text-gray-500">
          <CalendarDays size={18} />

          {time.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
