import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { label: "Games", path: "/game" },
    { label: "Konsultasi", id: "consultation" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">🦷 Senyum Bali</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.path ? (
                <Link key={link.label} to={link.path}>
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    {link.label}
                  </Button>
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navLinks.map((link) =>
              link.path ? (
                <Link key={link.label} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {link.label}
                  </Button>
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id!)}
                  className="block w-full text-left px-4 py-2 hover:bg-muted rounded-md"
                >
                  {link.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
