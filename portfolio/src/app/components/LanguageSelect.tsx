"use client";
import { redirect } from "next/navigation";

export const LanguageSelect = ({ defaultLang }: { defaultLang: string }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    console.log("redirecting to", newLang);
    redirect(`/${newLang}`);
  };

  return (
    <select onChange={handleChange} defaultValue={defaultLang}>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
    </select>
  );
};
