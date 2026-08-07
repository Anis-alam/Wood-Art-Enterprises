const categories = [
  "Sofa",
  "Chair",
  "Dining Table",
  "Bed",
  "Wardrobe",
  "TV Unit",
  "Coffee Table",
  "Office Furniture",
  "Bookshelf",
  "Outdoor Furniture",
];

export default function CategorySelect({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Category</label>

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
