function StatsCard({ icon, number, title }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-white shadow-2xl hover:scale-105 transition duration-300">
      <div className="text-3xl mb-3">{icon}</div>

      <h2 className="text-3xl font-bold text-amber-400">{number}</h2>

      <p className="text-gray-200 mt-2">{title}</p>
    </div>
  );
}

export default StatsCard;
