import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import logoPolkesyo from "@/assets/polkesyo.png"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Tentang", id: "about" },
    { label: "Edukasi", id: "education" },
    { label: "Video", id: "video" },
    { label: "Games", id: "game" },
    { label: "Konsultasi", id: "consultation" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-all"
          >
            <img
              src={logo}
              alt="Senyum Bali Logo"
              className={`transition-transform duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              } group-hover:scale-105`}
              style={{
                height: "60px",
                width: "150px",
                objectFit: "contain",
              }}
            />
            <img
              src={logoPolkesyo}
              alt="Senyum Bali Logo"
              className={`transition-transform duration-300 ml-4 ${
                isScrolled ? "scale-95" : "scale-100"
              } group-hover:scale-105`}
              style={{
                height: "60px",
                width: "150px",
                objectFit: "contain",
              }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium transition-colors px-2 py-2 rounded-md ${
                  isScrolled
                    ? "text-bali-gold hover:bg-muted"
                    : "text-white hover:text-bali-gold hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className={isScrolled ? "text-bali-gold" : "text-white"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-bali-gold" : "text-white"} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 bg-card/95 rounded-lg p-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 hover:bg-muted rounded-md text-bali-gold hover:text-bali-green transition-colors"
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