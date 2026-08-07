export default function ImageUploader({ preview, onChange }) {
  return (
    <div>
      <label className="block font-semibold mb-3">Product Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full border rounded-xl p-3"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-6 w-64 h-64 rounded-2xl object-cover shadow-lg"
        />
      )}
    </div>
  );
}
