import React from 'react'
import './Footer.scss'
import {Link} from "react-router-dom";
import SocialLinks from "components/SocialLinks/SocialLinks";

const Footer = () => {

    const short = [
        [
            {
                id: 2,
                label: "HELP",
                sub: [
                    {label: "Payments", to: ""},
                    {label: "Shipping", to: ""},
                    {label: "FAQ", to: "/faqs"},
                ]
            },
            {
                id: 4,
                label: "SOCIAL",
                sub: [
                    {label: "Facebook", href: "https://www.facebook.com/rasel-mahmud-dev"},
                ]
            }],
        [{
            label: "Contact Me",
            sub: [
                {label: "Portfolio", href: "https://rasel-portfolio.vercel.app"},
                {label: "Contact Me", to: "/contact-me"},
                {label: "About", to: "/about-me"},
            ]
        }
        ]]


    return (
        <>
            <footer className='footer bg-primary-400'>
                <div className="container-1400 px-4">
                    <div className="py-1 flex flex-row ">
                        {short.map((section, index) => (
                            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 " + "sec-" + index}
                                 key={index}>

                                {index === 0 && (
                                    <div>

                                        <h4 className="text-white text-xl font-medium mt-4">Phone Mela</h4>
                                        <p>Online phone selling website</p>
                                        <SocialLinks className="text-white my-4"/>
                                    </div>
                                )}

                                {section.map((eachSec, i) => (
                                    <div className="" key={i}>
                                        <h4 className="text-white text-sm font-normal mt-4">{eachSec.label}</h4>
                                        <div className="mt-2">
                                            {eachSec.sub && eachSec.sub.map((sub, i) => (
                                                <div className="-my-1" key={i}>
                                                    {sub.to ? (
                                                        <Link className="text-[13px] m-0 text-gray-200"
                                                              to={sub.to}>{sub.label}</Link>
                                                    ) : sub.href ? (
                                                        <a className="text-[13px] m-0 text-gray-200" href={sub.href}
                                                           target="_blank">{sub.label}</a>
                                                    ) : <span
                                                        className="text-[13px] m-0 text-gray-200">{sub.label}</span>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
            <footer className="text-sm py-4  text-dark-10 bg-primary-500 w-full" alignItems="center" justify="center">
                <div className="container-1400 px-4 flex justify-between">
                    <p>@copyright {new Date().getFullYear()}</p>
                    <p className="">PoweredBy RaseL</p>
                </div>

            </footer>
        </>
    )
}

export default Footer
