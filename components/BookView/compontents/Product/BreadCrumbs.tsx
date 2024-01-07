// Breadcrumbs.tsx
import Breadcrumb from "./BreadCrumb";

interface BreadcrumbsProps {
  breadcrumbs: { id: number; name: string; href: string }[];
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs,
  productName,
}) => (
  <nav aria-label="Breadcrumb">
    <ol
      role="list"
      className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 md:max-w-7xl"
    >
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumb key={breadcrumb.id} breadcrumb={breadcrumb} />
      ))}
      <li className="text-sm">
        <a
          href={`/books/${productName}`}
          aria-current="page"
          className="font-medium text-gray-500 hover:text-gray-600 line-clamp-1"
        >
          {productName}
        </a>
      </li>
    </ol>
  </nav>
);

export default Breadcrumbs;
