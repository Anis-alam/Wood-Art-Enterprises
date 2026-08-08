import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

import { uploadImage } from "../services/cloudinary";
import { addProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    material: "",
    dimensions: "",
    description: "",
    featured: false,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    }
  }

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => reject(new Error("Failed to read image"));

      reader.onload = (e) => {
        const img = new Image();

        img.onerror = () => reject(new Error("Invalid image"));

        img.onload = () => {
          const WIDTH = 800;
          const HEIGHT = 600;

          const canvas = document.createElement("canvas");
          canvas.width = WIDTH;
          canvas.height = HEIGHT;

          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

          const scale = Math.min(WIDTH / img.width, HEIGHT / img.height);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          const x = (WIDTH - newWidth) / 2;
          const y = (HEIGHT - newHeight) / 2;

          ctx.drawImage(img, x, y, newWidth, newHeight);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Image resize failed"));
                return;
              }

              resolve(
                new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }),
              );
            },
            "image/jpeg",
            0.9,
          );
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

  async function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const resized = await resizeImage(file);

      setImage(resized);
      setPreview(URL.createObjectURL(resized));
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      // Upload resized image to Cloudinary
      const imageUrl = await uploadImage(image);

      // Save product to Firestore
      await addProduct({
        ...form,
        image: imageUrl,
        price: Number(form.price),
        createdAt: new Date(),
      });

      toast.success("Product Added Successfully");

      // Reset form
      setForm({
        name: "",
        category: "",
        price: "",
        material: "",
        dimensions: "",
        description: "",
        featured: false,
      });

      setImage(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">
      <h1 className="text-4xl font-bold text-[#3E2723] mb-8">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Product Name */}
        <div>
          <label className="font-semibold">Product Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-4"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-4"
            required
          >
            <option value="">Select Category</option>

            {/* Categories from Firebase */}
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <>
                <option value="Bed">Bed</option>
                <option value="Chair">Chair</option>
                <option value="Sofa">Sofa</option>
                <option value="Dining Table">Dining Table</option>
                <option value="Coffee Table">Coffee Table</option>
                <option value="TV Unit">TV Unit</option>
                <option value="Wardrobe">Wardrobe</option>
                <option value="Office Table">Office Table</option>
                <option value="Office Chair">Office Chair</option>
                <option value="Study Table">Study Table</option>
                <option value="Bookshelf">Bookshelf</option>
                <option value="Cabinet">Cabinet</option>
                <option value="Modular Kitchen">Modular Kitchen</option>
                <option value="Wooden Door">Wooden Door</option>
                <option value="Wooden Window">Wooden Window</option>
                <option value="Steel Gate">Steel Gate</option>
                <option value="MS Fabrication">MS Fabrication</option>
                <option value="SS Railing">SS Railing</option>
                <option value="Wooden Partition">Wooden Partition</option>
                <option value="Custom Furniture">Custom Furniture</option>
              </>
            )}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price</label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-4"
            required
          />
        </div>

        {/* Material */}
        <div>
          <label className="font-semibold">Material</label>

          <input
            type="text"
            name="material"
            value={form.material}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-4"
          />
        </div>

        {/* Dimensions */}
        <div>
          <label className="font-semibold">Dimensions</label>

          <input
            type="text"
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-4"
          />
        </div>

        {/* Featured */}
        {/* <div className="flex items-center gap-3 mt-8">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          <span>Featured Product</span>
        </div> */}
        {/* Description */}
        <div className="md:col-span-2">
          <label className="font-semibold">Description</label>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-4"
            placeholder="Enter product description..."
          />
        </div>

        {/* Product Image */}
        <div className="md:col-span-2">
          <label className="font-semibold">Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full mt-2 border rounded-xl p-4"
            required
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="md:col-span-2">
            <label className="font-semibold block mb-3">Image Preview</label>

            <img
              src={preview}
              alt="Preview"
              className="w-80 h-60 object-contain rounded-2xl border shadow-lg bg-white"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B5E3C] hover:bg-[#6D4C41] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition disabled:opacity-60"
          >
            <Upload size={20} />

            {loading ? "Uploading..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
