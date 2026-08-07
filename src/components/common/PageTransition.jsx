export default function PageTransition({ children }) {
  return (
    <div
      className="
        animate-[fadeIn_.4s_ease-in-out]
        min-h-screen
      "
    >
      {children}
    </div>
  );
}
