function Footer() {
  return (
    <footer className="bg-[#091f36] text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm text-[#4f5f76]">
          &copy; {new Date().getFullYear()} Craver Restaurant Management. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
