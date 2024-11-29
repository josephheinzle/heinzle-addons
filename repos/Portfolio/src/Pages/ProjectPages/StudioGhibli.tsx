import * as React from "react";
import * as Types from "../../../Types";
import { StudioGhibliDetails } from "../../ProjectInfo";
import ProjectLinks from "../../Components/ProjLinks";
import { useEffect } from "react";

const StudioGhibli = (props: Types.NO_PROPS) => {
  return (
    <div className="my-4">
      <h1 className="text-center">Studio Ghibli Lab</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>

      <ProjectLinks appURL={StudioGhibliDetails.appURL} gitHubURL={StudioGhibliDetails.gitHubURL} />

      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Overview</h3>
              <p>
                This was one of the first labs assigned after being introduced to React, and focused on fetching data
                from an external API. Landing on the home page triggers a fetch to the people, films, and locations
                endpoints. These return arrays of data, which I hold in the App component, and pass down as props to the
                individual components to avoid extra fetches on those components.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Features</h3>
              <p>
                Fetches data from the{" "}
                <span>
                  <a rel="noreferrer" target="_blank" href="https://ghibliapi.herokuapp.com/#">
                    Studio Ghibli API
                  </a>
                </span>{" "}
                and displays the information as bootstrap cards.
              </p>

              <p>
                This lab is built with{" "}
                <span>
                  <a rel="noreferrer" target="_blank" href="https://create-react-app.dev/">
                    create-react-app
                  </a>
                </span>{" "}
                and displays data from three endpoints.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Challenges</h3>
              <p>
                The most challenging part of this lab was creating the relationships between the data given by the API
                endpoints. For example, the data for a particular film only lists character endpoints, not the specific
                character names. I wanted to display that additional information without incurring more fetch requests.
                I accomplished this by iterating through the list of movies, and for each movie, to then iterate through
                the list of characters. If the character ID provided by the movie matched that of the current character,
                I pushed the character name into an array. Then I mapped over the array displaying the character list.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Roadmap</h3>
              <div>
                <ul>
                  <li>Add remaining endpoints for species and vehicles</li>
                  <li>Implement cross referencing between all endpoints</li>
                </ul>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              {StudioGhibliDetails.techStack.sort().map((tech) => (
                <span
                  key={`tech-stack-item-${tech}`}
                  className="mx-2 badge bg-light text-dark border border-1 border-dark"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioGhibli;