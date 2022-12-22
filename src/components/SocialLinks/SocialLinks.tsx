import React from 'react';
import {FaFacebookF, FaGithub, FaGlobe} from "react-icons/fa";
import {AiFillLinkedin} from "react-icons/all";

const SocialLinks = ({className=""}) => {
    return (
        <div className={className}>
            <ul className="flex gap-x-4">
                <a
                    className="hover:bg-primary-600 hover:text-white rounded-full w-7 h-7 md:w-7 md:h-7 flex justify-center items-center border  border-dark-400/50"
                    href="https://rasel-portfolio.vercel.app" target="_blank"
                >
                    <FaGlobe className="text-xl md:text-sm"/>
                </a>

                <a
                    className="hover:bg-primary-600 hover:text-white rounded-full w-7 h-7 md:w-7 md:h-7 flex justify-center items-center border  border-dark-400/50"
                    href="https://github.com/rasel-mahmud-dev"
                    target="_blank"
                >
                    <FaGithub className="text-xl md:text-sm"/>
                </a>{" "}
                <a
                    className="hover:bg-primary-600 hover:text-white rounded-full w-7 h-7 md:w-7 md:h-7 flex justify-center items-center border  border-dark-400/50"
                    href="https://www.linkedin.com/in/rasel-mahmud-dev" target="_blank"
                >
                    <AiFillLinkedin className="text-xl md:text-sm"/>
                </a>

                <a
                    className="hover:bg-primary-600 hover:text-white rounded-full w-7 h-7 md:w-7 md:h-7 flex justify-center items-center border  border-dark-400/50"
                    href="https://www.facebook.com/rasel-mahmud-dev" target="_blank"
                >
                    <FaFacebookF className="text-xl md:text-sm"/>
                </a>

            </ul>
        </div>
    );
};

export default SocialLinks;