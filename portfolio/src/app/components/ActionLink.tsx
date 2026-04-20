import Link from "next/link";

export default function ActionLink({
  text,
  isCTA,
  href,
  isExternal,
}: {
  text: string;
  isCTA?: boolean;
  href: string;
  isExternal?: boolean;
}) {
  const btnClass = ` py-04 px-06 rounded-m cursor-pointer flex gap-03 items-center justify-center ${isCTA ? "bg-brand text-cta" : "bg-layer2 text-neutral"}`;
  if (isExternal) {
    return (
      <a
        className={btnClass}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a className={btnClass} href={href}>
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={btnClass}>
      {text}
    </Link>
  );
}
