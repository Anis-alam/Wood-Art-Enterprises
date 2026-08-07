import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DashboardCharts({
  totalProducts,
  featuredProducts,
  totalCategories,
  totalEnquiries,
}) {
  const analyticsData = [
    {
      name: "Products",
      value: totalProducts,
    },
    {
      name: "Categories",
      value: totalCategories,
    },
    {
      name: "Featured",
      value: featuredProducts,
    },
    {
      name: "Enquiries",
      value: totalEnquiries,
    },
  ];

  const pieData = [
    {
      name: "Featured",
      value: featuredProducts,
    },
    {
      name: "Other Products",
      value: Math.max(totalProducts - featuredProducts, 0),
    },
  ];

  const COLORS = ["#8B5E3C", "#D4AF37"];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">
      {/* Analytics Bar Chart */}

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
        <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
          Dashboard Analytics
        </h2>

        <ResponsiveContainer width="100%" height={330}>
          <BarChart
            data={analyticsData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{
                fontSize: 13,
              }}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#8B5E3C"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
        <h2 className="text-2xl font-bold text-[#3E2723] mb-6">
          Featured Products
        </h2>

        <ResponsiveContainer width="100%" height={330}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={5}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              animationDuration={1500}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
