import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageLayout({ children, breadcrumbs }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
