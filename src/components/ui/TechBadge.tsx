type TechBadgeProps = {
  children: string;
};

export function TechBadge({ children }: TechBadgeProps) {
  return (
    <span className="bg-white border border-[#465B20]/30 text-[#2A3614] font-mono text-[10px] px-2.5 py-0.5 rounded-md shadow-2xs font-semibold">
      #{children}
    </span>
  );
}
