"use client";
import { useRouter, usePathname } from "next/navigation";

export const LanguageSelect = ({ defaultLang }: { defaultLang: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    if (!pathname) {
      router.push(`/${newLang}`);
      return;
    }
    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");
    console.log("redirecting to", newPath);
    router.push(newPath);
  };

  return (
    <select onChange={handleChange} value={defaultLang}>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
    </select>
  );
};
