import { Outlet, Link } from "react-router";
import { Search } from "../search/Search";
import { Toaster } from "@/shared/ui/sonner";

export function Layout() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="py-4 border-b mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <Link to="/" className="text-xl font-semibold">
          News Aggregator
        </Link>

        <Search />
      </div>
      <main>
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}
