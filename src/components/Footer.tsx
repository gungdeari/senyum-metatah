const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Senyum Bali. All rights reserved.
        </p>
        <p className="text-xs mt-2 opacity-80">
          Menjaga tradisi, merawat senyum sehat
        </p>
      </div>
    </footer>
  );
};

export default Footer;
