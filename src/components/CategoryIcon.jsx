import { getCategoryMeta } from "../data/categoryMeta.js";

export default function CategoryIcon({ category, size = "md" }) {
  const meta = getCategoryMeta(category);
  const Icon = meta.icon;
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };
  const iconSizes = { sm: 16, md: 20, lg: 26 };

  return (
    <div className={`${sizeClasses[size]} rounded-xl flex items-center justify-center shrink-0 ${meta.bg}`}>
      <Icon size={iconSizes[size]} className={meta.text} strokeWidth={2} />
    </div>
  );
}
