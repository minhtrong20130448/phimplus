import { on } from "events";
import Link from "next/link";
type DropdownMenuProps = {
  label: string | null;
  options: string[] | null;
  isOpen: boolean | null;
  setOpenMenu: any | null;
  isMobileMenuOpen: boolean | null;
  setIsMobileMenuOpen?: any | null;
  parent?: string | null;
};

export default function DropdownMenu({
  label,
  options,
  isOpen,
  setOpenMenu,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  parent,
}: DropdownMenuProps) {
  const handleItemClick = () => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative h-full">
      {/* Tag thể loại hoặc quốc gia có icon */}
      <button
        onClick={() => setOpenMenu(isOpen ? null : label)}
        className={`h-full flex items-center block py-2 px-3 rounded md:p-0 text-white font-bold`}
      >
        <span className="mr-2">{label}</span>
        <svg
          className="w-[15px] h-[15px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
        {/* Dropdown menu */}
      </button>
      {isOpen && (
        <div
          className={`${
            isMobileMenuOpen
              ? "relative"
              : "absolute right-0 top-[50] w-96 bg-gray-800 rounded-lg shadow-lg"
          }`}
        >
          <div
            className={`${
              isMobileMenuOpen
                ? "grid grid-cols-1 bg-gray-800"
                : "grid grid-cols-3 gap-4 p-4"
            }`}
          >
            {options?.map((option, index) => (
              <Link
                key={index}
                href={`/${
                  parent === "Thể loại" ? "category" : "country"
                }/${option}`}
                className="h-full w-full"
                onClick={handleItemClick}
              >
                <div
                  className={`${
                    isMobileMenuOpen
                      ? "cursor-pointer py-2 px-10 hover:text-blue-600"
                      : "cursor-pointer col-span-1 text-center hover:bg-blue-100 hover:text-black px-2 py-1 rounded-lg "
                  }`}
                >
                  {option}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
