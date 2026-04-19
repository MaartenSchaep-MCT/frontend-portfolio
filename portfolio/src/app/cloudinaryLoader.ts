"use client";
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.includes("res.cloudinary.com")) {
    return src;
  }

  // Use c_scale to strictly resize to the width Next.js requests
  const params = `f_auto,c_scale,w_${width},q_${quality || "auto"}`;

  // This regex extracts the base URL and the public ID, ignoring any existing
  // transformations (like f_auto,q_auto) or version numbers (v1775049291) already in the URL.
  const regex =
    /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?:.*\/)*(v\d+\/)?(.+)/;
  const match = src.match(regex);

  if (match) {
    const baseUrl = match[1]; // https://res.cloudinary.com/dcejensy8/image/upload/
    const publicId = match[3]; // ImageName

    // Clean output: .../upload/f_auto,c_scale,w_256,q_auto/ImageName
    return `${baseUrl}${params}/${publicId}`;
  }

  return src;
}
