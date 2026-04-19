"use client";
import { redirect } from "next/navigation";

export const LanguageSelect = ({ defaultLang }: { defaultLang: string }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    console.log("redirecting to", newLang);
    redirect(`/${newLang}`);
  };

  return (
    <select onChange={handleChange}>
      <option value="en" selected={defaultLang === "en"}>
        English
      </option>
      <option value="nl" selected={defaultLang === "nl"}>
        Nederlands
      </option>
    </select>
  );
};
