import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E7ECE4]/80 bg-[#F7F9F5]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
            <img
              src="/Green_cart.png"
              alt="GreenCart logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="font-semibold tracking-tight">
              GreenCart
            </p>

            <p className="text-[10px] text-[#7B857A]">
              Smart agriculture marketplace
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-[#687268] transition hover:text-[#2E7D32]"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-sm text-[#687268] transition hover:text-[#2E7D32]"
          >
            About
          </Link>

        </div>

        <Link
          to="/about"
          className="rounded-xl bg-[#172117] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2E7D32]"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}