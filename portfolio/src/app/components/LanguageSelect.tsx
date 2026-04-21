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
    <label className="gap-05 flex items-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-globe-icon lucide-globe absolute left-05 w-05 h-05"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
      <select
        onChange={handleChange}
        value={defaultLang}
        name="language-select"
        className="hover:bg-layer3 cursor-pointer transition-colors ease-normal min-h-08 font-sans py-03 pe-05 ps-09 rounded-m bg-layer2 text-2 gap-05 overflow-visible text-neutral leading-05 font-normal border-none w-full flex items-center"
      >
        <option value="en" className="py-03 px-09">
          English
        </option>
        <option value="nl" className="py-03 px-09">
          Nederlands
        </option>
      </select>
    </label>
  );
};
