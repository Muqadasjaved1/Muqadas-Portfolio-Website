interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 50 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="0"
        y="20"
        fontFamily="'Crimson Pro', serif"
        fontSize="24"
        fontWeight="400"
        fill="#2C312B"
      >
        MJ
      </text>
      <circle cx="40" cy="24" r="3" fill="#A8B8A6" />
    </svg>
  );
}
