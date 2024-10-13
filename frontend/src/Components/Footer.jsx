import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#091f36] text-white py-8">
      <div className="container mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Craver Restaurant</h2>
            <p className="text-sm text-[#4f5f76]">
              Delicious meals and exceptional service. Visit us for a dining
              experience like no other.
            </p>
            <p className="text-sm mt-2 text-[#4f5f76]">
              &copy; {new Date().getFullYear()} Craver Restaurant Management.
              All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-[#4f5f76]">Phone: +1 (123) 456-7890</p>
            <p className="text-sm text-[#4f5f76]">Email: contact@craver.com</p>
            <p className="text-sm mt-2 text-[#4f5f76]">
              Address: 123 Gourmet St., Food City, FC 1001
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com"
                className="text-[#4f5f76] hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                className="text-[#4f5f76] hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                className="text-[#4f5f76] hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-[#4f5f76] hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-[#4f5f76]">
            Terms & Conditions | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
