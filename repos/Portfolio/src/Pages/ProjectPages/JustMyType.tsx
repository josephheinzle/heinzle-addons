import * as React from "react";
import * as Types from "../../../Types";
import { JustMyTypeDetails } from "../../ProjectInfo";
import ProjectLinks from "../../Components/ProjLinks";
import { useEffect } from "react";

const JustMyType = (props: Types.NO_PROPS) => {
  return (
    <div className="my-4">
      <h1 className="text-center">Just My Type Lab</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>

      <ProjectLinks appURL={JustMyTypeDetails.appURL} gitHubURL={JustMyTypeDetails.gitHubURL} />

      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Overview</h3>
              <p>
                Just My Type is a typing game built entirely with HTML, CSS, and JS. The player types the sentences
                shown on the screen, restarting the sentence if they make a mistake. The game also times the player and
                records their mistakes, showing a score at the end.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Features</h3>
              <p>
                On-screen keyboard, highlighting buttons as they are pressed, and swapping to an uppercase keyboard when
                the shift button is held.
              </p>
              <p>The player's time and mistakes are recorded, showing up as a score when the game is over.</p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Challenges</h3>
              <p>
                There was a lot of conditional logic behind the scenes. Every key press had to be evaluated as it could
                have been the wrong key, the end of a particular word, or the end of the sentence, and each of those
                changes had to update something elsewhere. This was where I found the value in abstracting out repeated
                logic into smaller functions to clean up code. With clever contextual function names, the newly cleaned
                up code almost read like high level instructions - a pattern I tried to implement in my future projects.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Roadmap</h3>
              <div>
                <ul>
                  <li>Connect to a database to track player high scores</li>
                  <li>Add a high scores view</li>
                  <li>Enable players to add their own sentences to a custom game</li>
                  <li>Enable players to share their custom games with friends</li>
                </ul>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              {JustMyTypeDetails.techStack.sort().map((tech) => (
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

export default JustMyType;