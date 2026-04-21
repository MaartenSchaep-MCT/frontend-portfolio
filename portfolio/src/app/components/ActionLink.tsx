import Link from "next/link";

export default function ActionLink({
  text,
  isCTA,
  href,
  isExternal,
  icon,
  onMouseEnter,
}: {
  text: string;
  isCTA?: boolean;
  href: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  onMouseEnter?: () => void;
}) {
  const btnClass = `transition-colors ease-normal py-04 px-06 rounded-m cursor-pointer flex gap-03 font-normal items-center justify-center ${isCTA ? "bg-brand text-cta hover:bg-brand-alt" : "bg-layer2 text-neutral hover:bg-layer3"}`;
  if (isExternal) {
    return (
      <a
        className={`${btnClass} `}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onMouseEnter}
      >
        {text}
        {icon && <span>{icon}</span>}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a className={btnClass} href={href} onMouseEnter={onMouseEnter}>
        {text}
        {icon && <span>{icon}</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={btnClass} onMouseEnter={onMouseEnter}>
      {text}
      {icon && <span>{icon}</span>}
    </Link>
  );
}
