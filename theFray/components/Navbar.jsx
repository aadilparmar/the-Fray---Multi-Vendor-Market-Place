"use client";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const nestedCategories = [
    {
      name: "Women",
      href: "/shop?gender=women",
      children: [
        { name: "Jewellery", href: "/shop?gender=women&sub=jewellery" },
        { name: "Clothes", href: "/shop?gender=women&sub=clothes" },
        { name: "Accessories", href: "/shop?gender=women&sub=accessories" },
      ],
    },
    {
      name: "Men",
      href: "/shop?gender=men",
      children: [
        { name: "Apparel", href: "/shop?gender=men&sub=apparel" },
        { name: "Footwear", href: "/shop?gender=men&sub=footwear" },
        { name: "Grooming", href: "/shop?gender=men&sub=grooming" },
      ],
    },
    { name: "Home & Decor", href: "/shop?category=home-decor" },
    { name: "Electronics", href: "/shop?category=electronics" },
  ];

  // 2. Data Structure for Simple Resources Menu (Accessible to ResourcesDropdown)
  const resourcesLinks = [
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faqs" },
    { name: "Blog", href: "/blog" },
  ];
  // 2. Nested Dropdown Component (defined internally)
  const CategoriesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    // ... (rest of the component logic)

    return (
      <div
        className="relative h-full"
        onMouseEnter={() => setIsOpen(true)} // Open on hover
        onMouseLeave={() => {
          // Close on mouse leave
          setIsOpen(false);
          setActiveSubMenu(null);
        }}
      >
        {/* Dropdown Button (Trigger) */}
        <button className="flex items-center gap-1 text-slate-600 hover:text-green-600 transition duration-150 focus:outline-none h-full">
          Categories
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Main Dropdown Menu Panel (Level 1) */}
        {isOpen && (
          <div
            // 🛑 CRITICAL FIX: Removed mt-3 and used top-full instead.
            // top-full positions the top edge of the dropdown exactly at the bottom edge of the button's container.
            className="absolute left-1/2 transform -translate-x-1/2 top-full w-40 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20"
          >
            <div className="py-1" role="menu">
              {nestedCategories.map((item) => (
                <div key={item.name} className="relative">
                  {/* Main Category Link/Button */}
                  {item.children ? (
                    <button
                      onMouseEnter={() => setActiveSubMenu(item.name)}
                      className="w-full text-left flex justify-between items-center px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 transition"
                    >
                      {item.name}
                      <ChevronDown size={12} className="rotate-[-90deg]" />
                    </button>
                  ) : (
                    // Item has no children: Use a regular link
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 transition"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Sub-Dropdown Menu Panel (Level 2) */}
                  {item.children && activeSubMenu === item.name && (
                    <div
                      // Using top-0 here keeps it aligned with the parent sub-item
                      className="absolute left-full top-0 ml-1 w-40 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30"
                    >
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 transition"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  const ResourcesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className="relative h-full"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="flex items-center gap-1 text-slate-600 hover:text-green-600 transition duration-150 focus:outline-none h-full">
          Resources
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            // Uses top-full to ensure it's flush against the button area
            className="absolute left-1/2 transform -translate-x-1/2 top-full w-32 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20"
          >
            <div className="py-1" role="menu">
              {resourcesLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  return (
    <nav className="relative bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">
          <Link
            href="/"
            className="relative text-4xl font-semibold text-slate-700"
          >
            <span className="text-green-600">the</span>fray
            <span className="text-green-600 text-5xl leading-0">.</span>
            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
              plus
            </p>
          </Link>

          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">Home</Link>
            <CategoriesDropdown />
            <ResourcesDropdown />
            <Link href="/create-store">Become Supplier</Link>

            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-slate-600"
            >
              <ShoppingCart size={18} />
              Cart
              <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                {cartCount}
              </button>
            </Link>

            <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Become Reseller
            </button>
          </div>

          {/* Mobile User Button  */}
          <div className="sm:hidden">
            <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
              Become Reseller
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  );
};

export default Navbar;
