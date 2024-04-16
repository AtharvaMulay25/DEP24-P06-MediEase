import React from "react";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  const LINKS = [
    {
      title: "",
      items: ["", "", ""],
    },
    {
      title: "",
      items: ["", "", ""],
    },
    {
      title: "Services",
      items: ["Patient", "Medical Staff", "Admin"],
    },
    {
      title: "Contact us",
      items: [
        "Medical Center, IIT ROPAR, Punjab - 140001, India",
        "support@care.com,", //Yet to get an email ID
        "+91-1881-242124, +91-1881-242279",
        "",
      ],
    },
  ];
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full mt-5 bg-white">
      <div className="w-full px-4 py-5">
        <div className="grid grid-cols-2 justify-between gap-4 lg:grid-cols-4 xl:grid-cols-5">
          <Typography variant="h5" className="mb-6">
            MediEase
          </Typography>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.1054441492915!2d76.4699057!3d30.967539500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905542ff7523359%3A0x9550be661c7b2a95!2sMedical%20Center%20-%20IIT%20Ropar!5e0!3m2!1sen!2sin!4v1713301151993!5m2!1sen!2sin"
            className="md:col-span-3 col-span-2"
            width="100%"
            height="250"
            style={{ border: 0, marginBottom: "4%" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="grid grid-cols-2 col-span-2 justify-between gap-4 pl-2 lg:col-span-3 xl:col-span-1">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link, index) => (
                  <li key={index}>
                    {index === items.length - 1 &&
                    link.startsWith("https://") ? (
                      <Typography
                        as="a"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="gray"
                        className="py-0.5 font-normal transition-colors hover:text-blue-gray-900"
                      >
                        Location
                      </Typography>
                    ) : (
                      <Typography color="gray" className="py-0.5 font-normal">
                        {link}
                      </Typography>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-3 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-2 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-0 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear} <a href="">MediEase</a>. All Rights Reserved.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
