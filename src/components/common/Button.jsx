function Button({ children, variant = "primary" }) {
  const base =
    "min-w-[220px] h-14 rounded-l font-semibold text-lg transition-all duration-300 flex items-center justify-center padding-x-6 shadow-md hover:shadow-lg active:scale-95";

  const style =
    variant === "primary"
      ? "bg-amber-700 text-white hover:bg-amber-800 shadow-xl hover:scale-105"
      : "bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 shadow-lg";

  return <button className={`${base} ${style}`}>{children}</button>;
}

export default Button;
