import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import logoPolkesyo from "@/assets/polkesyo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Tentang", id: "about" },
    { label: "Edukasi", id: "education" },
    { label: "Video", id: "video" },
    { label: "Games", id: "game-preview" },
    { label: "Konsultasi", id: "consultation" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">

          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 md:gap-4">
            <img
              src={logo}
              alt="Senyum Bali Logo"
              className={`h-[40px] md:h-[60px] object-contain transition-transform duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              }`}
            />

            <img
              src={logoPolkesyo}
              alt="Polkesyo Logo"
              className={`h-[30px] md:h-[50px] object-contain transition-transform duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              }`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium px-3 py-2 rounded-md transition-colors ${
                  isScrolled
                    ? "text-bali-gold hover:bg-gray-100"
                    : "text-white hover:text-bali-gold hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={26} className={isScrolled ? "text-bali-gold" : "text-white"} />
            ) : (
              <Menu size={26} className={isScrolled ? "text-bali-gold" : "text-white"} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-xl bg-white/95 shadow-lg p-4 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 text-bali-green font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
