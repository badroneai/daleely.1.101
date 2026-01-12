import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link 
                href={item.href} 
                className="hover:text-primary-600 transition-colors px-2 py-1 min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${index === items.length - 1 ? "text-gray-900 font-semibold" : ""} px-2 py-1`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
