import { motion } from "framer-motion";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer className="w-full border-t px-5 ">
        <div>
          {/* <!-- Footer Bottom --> */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 border-t py-4 lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xs md:text-sm lg:text-base"
            >
              <p>
                &copy; {new Date().getFullYear()} Pondok Ngujur. All rights
                reserved
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-5">
                <ul className="flex items-center gap-5">
                  <li>
                    <Link
                      href="https://www.instagram.com/pondokngujur/"
                      target="_blank"
                    >
                      <RiInstagramFill className="size-6 opacity-50 transition-all duration-300 hover:opacity-100 hover:fill-tosca" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/@pondokngujur"
                      target="_blank"
                    >
                      <FaYoutube className="size-6 opacity-50 transition-all duration-300 hover:opacity-100 hover:fill-tosca" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.tiktok.com/@pondokngujur_"
                      target="_blank"
                    >
                      <AiFillTikTok className="size-6 opacity-50 transition-all duration-300 hover:opacity-100 hover:fill-tosca" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/p/PPTarbiyatul-Mutathowiin-100071635964159/"
                      target="_blank"
                    >
                      <FaFacebook className="size-6 opacity-50 transition-all duration-300 hover:opacity-100 hover:fill-tosca" />
                    </Link>
                  </li>
                </ul>
              </ul>
            </motion.div>
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
