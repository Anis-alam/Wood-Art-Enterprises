export default function FeaturedToggle({ checked, onChange }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-[#8B5E3C]"
      />

      <span className="font-medium">SEE MY WORK</span>
    </label>
  );
}
