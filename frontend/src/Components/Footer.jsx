import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#091f36] text-white py-8 flex justify-evenly w-full ">
        <div className="  w-[30%] flex-col items-center">
          <h2 className="text-xl font-bold text-center">Craver Restaurant</h2>
          <p className=" text-[#4f5f76]">
            Delicious meals and exceptional service. Visit us for a dining
            experience like no other.
          </p>
          <p className="text-sm mt-2 text-[#4f5f76]">
            &copy; {new Date().getFullYear()} Craver Restaurant Management.
            All rights reserved.
          </p>
        </div>
        <div className="flex-col  flex-wrap items-center mb-8 md:mb-0 w-[30%]">
          <h3 className="text-lg font-semibold mb-4 text-center">Contact Us</h3>
          <p className="text-sm text-[#4f5f76]">Phone: +1 (123) 456-7890</p>
          <p className="text-sm text-[#4f5f76]">Email: contact@craver.com</p>
          <p className="text-sm mt-2 text-[#4f5f76]">
            Address: 123 Gourmet St., Food City, FC 1001
          </p>
        </div>
        <div className="flex-col  w-[15%] item-center">
          <h3 className="text-lg font-semibold text-center">Follow Us</h3>
          <div className="flex justify-center gap-8 mt-2">
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
      <div className="mt-8 text-center w-[%]">
        <p className="text-sm text-[#4f5f76]">
          Terms & Conditions | Privacy Policy
        </p>
      </div>
    </footer>
  );
}

export default Footer;
