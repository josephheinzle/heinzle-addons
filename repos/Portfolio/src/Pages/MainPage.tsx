import * as React from "react";
import * as Types from "../../Types";
import { ProjectArray } from "../ProjectInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const MainPage = (props: Types.NO_PROPS) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    //https://ejm-dev.com/#/?isDemo=true
    // grab the query params from the URL
    let params = new URLSearchParams(loc.search);
    const [isDemo] = params.getAll("isDemo");

    // check if we landed here from a link with isDemo in the query params
    if (isDemo && ref.current) {
      // we know we landed on the page from a link that wants to view the demo
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    console.log(loc.search);
  }, []);
  const projectsJSX = (isLab: boolean) => {
    return (
      <div>
        <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>
        <div className="d-flex flex-wrap justify-content-center">
          {/* <button onClick={()=> }>click to sdcroll</button> */}
          {ProjectArray.filter((project) => project.lab === isLab).map((project) => (
            <div key={`project-${project.title}`} className="card col-8 m-5 ">
              <h3 ref={project.title === "Gundam Getter" ? ref : null} className="card-title my-2 text-center">
                {project.title}
              </h3>
              <hr></hr>

              {project.title === "Gundam Getter" ? (
                <iframe
                  id="gundamFrame"
                  style={{ position: "relative", height: "40em", width: "100%" }}
                  src="https://www.youtube.com/embed/prFtAVsyJoE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/Assets/ProjectCardScreenCaps/${project.title.replace(
                    /\s+/g,
                    ""
                  )}.PNG`}
                  height={750}
                  width={1500}
                  className="card-img-top img-fluid"
                  alt={`${project.title}`}
                  title={`${project.title}`}
                />
              )}

              <hr></hr>
              <div className="card-body">
                <p className="card-text text-center">{project.details}</p>
              </div>
              <hr></hr>
              <div className="card-body text-center">
                {project.techStack.sort().map((tech) => (
                  <span
                    key={`tech-stack-item-${tech}`}
                    className="mx-2 badge bg-light text-dark border border-1 border-dark"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <hr></hr>
              <div className="card-body">
                <div className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      nav(`${project.pageURL}`);
                    }}
                  >
                    Details
                  </button>

                  {project.title === "Gundam Getter" ? (
                    ""
                  ) : (
                    <a className="btn btn-primary" href={project.appURL} rel="noreferrer" target="_blank">
                      Project Site
                    </a>
                  )}

                  <a className="btn btn-primary" href={project.gitHubURL} rel="noreferrer" target="_blank">
                    Git Hub Repo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // return null;
  return (
    <div className="d-flex flex-wrap">
      <div className="my-4">
        <h1 className="text-center">Projects</h1>
        {projectsJSX(false)}
        <h1 className="text-center">Labs</h1>
        {projectsJSX(true)}
      </div>
    </div>
  );
};

export default MainPage;