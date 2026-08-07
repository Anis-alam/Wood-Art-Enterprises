const CLOUD_NAME = "p1g3pogs";
const UPLOAD_PRESET = "wood-art";

export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
}
