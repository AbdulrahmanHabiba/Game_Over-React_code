import React from "react";

export default function Footer() {
  return (
    <div className="must position-relative">
      <div
        id="footer"
        className="  position-absolute start-50  bottom-0 translate-middle-x"
      >
        <footer className="footer_section navbar d-block bg-opacity-50 rounded-5 ">
          <ul className="social-icons d-flex p-0 m-0 ">
            <li>
              <a
                href="https://www.facebook.com/abdulrahmanhsan.habiba.3/"
                target="_blank"
              >
                <i className="fa-brands fa-facebook fs-4   "></i>
              </a>
            </li>
            <li>
              <a href="mailto:abdulrahmanhabibh@gmail.com?" target="_blank">
                <i className="fas fa-square-envelope  fs-4 "></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/abdulrahman-habiba-b6a34921a"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin fs-4  "></i>
              </a>
            </li>
            <li>
              <a href="https://chatwith.io/s/abdulrahmanhabiba" target="_blank">
                <i className="fa-brands fa-whatsapp fs-4  "></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/AbdulrahmanHabiba" target="_blank">
                {" "}
                <i class="fa-brands fa-github fs-4"></i>
              </a>
            </li>
          </ul>{" "}
          <p className=" text-center">
            <button className=" btn btn-outline-primary p-0 px-1 text-center my_button ">
              Design by Abdulrahhmnan Habiba{" "}
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
}
