// Breadcrumb.tsx
import Link from "next/link";

interface BreadcrumbProps {
  breadcrumb: { id: number; name: string; href: string };
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb }) => (
  <li>
    <div className="flex items-center">
      <Link
        href={breadcrumb.href}
        className="mr-2 text-sm font-medium text-gray-900"
      >
        {breadcrumb.name}
      </Link>
      <svg
        width={16}
        height={20}
        viewBox="0 0 16 20"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-4 text-gray-300"
      >
        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
      </svg>
    </div>
  </li>
);

export default Breadcrumb;
