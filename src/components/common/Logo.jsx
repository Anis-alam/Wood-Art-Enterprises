import { Link } from "react-router-dom";

function Logo({ dark }) {
  return (
    <Link to="/" className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-[#8B5E3C] flex items-center justify-center shadow-lg">
        <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#D4AF37" strokeWidth="3" />

          <path d="M20 42V22H44V42" stroke="white" strokeWidth="3" />

          <path d="M20 30H44" stroke="#D4AF37" strokeWidth="3" />
        </svg>
      </div>

      <div>
        <h2
          className={`font-bold text-4xl ${
            dark ? "text-[#5C3A21]" : "text-[#5C3A21]"
          }`}
        >
          WOOD ART
        </h2>

        <p
          className={`tracking-[5px] ${
            dark ? "text-[#5C3A21]" : "text-[#5C3A21]"
          }`}
        >
          Enterprises
        </p>
      </div>
    </Link>
  );
}

export default Logo;
