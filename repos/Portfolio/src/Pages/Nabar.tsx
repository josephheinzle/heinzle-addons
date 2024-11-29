import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Types from "../../Types";
// import { ProjectArray } from "../ProjectInfo";

const Navbar = (props: Types.NO_PROPS) => {
  const loc = useLocation();
  const nav = useNavigate();
  // const pageURLs = ProjectArray.map((proj) => ({ URL: proj.pageURL, title: proj.title }));

  return (
    <div className="d-flex mt-4 justify-content-center ">
      <div className=" d-flex justify-content-center">
        <button
          className={`btn w-100 mx-1 btn-${loc.pathname != "/" ? "primary" : "warning"}`}
          onClick={() => {
            nav(`/`);
          }}
        >
          Projects
        </button>
      </div>

      <div className=" d-flex justify-content-center">
        <button
          className={`btn w-100 mx-1 btn-${loc.pathname != "/profile" ? "primary" : "warning"}`}
          onClick={() => {
            nav(`/profile`);
          }}
        >
          Profile
        </button>
      </div>

      {/* {pageURLs.map((link) => (
        <div key={link.title} className=" d-flex justify-content-center align-items-center">
          <Link to={link.URL} className={`btn w-100 mx-1 btn-${loc.pathname != link.URL ? "primary" : "warning"}`}>
            {link.title}
          </Link>
        </div>
      ))} */}

      {loc.pathname != "/resume" && (
        <div className=" d-flex justify-content-center">
          <button
            className={`btn w-100 mx-1 btn-${loc.pathname != "/resume" ? "primary" : "warning"}`}
            onClick={() => {
              nav(`/resume`);
            }}
          >
            Resume
          </button>
        </div>
      )}

      {loc.pathname === "/resume" && (
        <div className=" d-flex justify-content-center">
          <a
            className="btn w-100 mx-1 btn-info"
            href={`${process.env.PUBLIC_URL}/Assets/Resume/Eric_Moran_Resume.pdf`}
            download={`Eric_Moran_Resume.pdf`}
          >
            Download?
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;