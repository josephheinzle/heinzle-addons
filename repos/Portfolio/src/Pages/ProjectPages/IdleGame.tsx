import * as React from "react";
import * as Types from "../../../Types";
import { IdleGameDetails } from "../../ProjectInfo";
import ProjectLinks from "../../Components/ProjLinks";
import { useEffect } from "react";

const IdleGame = (props: Types.NO_PROPS) => {
  return (
    <div className="my-4">
      <h1 className="text-center">IdleScape</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>

      <ProjectLinks appURL={IdleGameDetails.appURL} gitHubURL={IdleGameDetails.gitHubURL} />

      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Overview</h3>
              <p>
                IdleScape is an idle / incremental game based on the MMORPG Runescape. The player tells the game what
                they want to do, and the game executes those actions on an interval. The player can choose to train
                skills, go on quests, or engage in combat with various enemies. Options vary for each location the
                player may travel to.
              </p>
              <p>
                IdleScape runs on a large global state object to maintain the player's data, such as experience,
                location, inventory, etc. Just about every component reads and updates multiple parts of this state
                object. To help manage this, I utilized Redux by way of the Redux Toolkit. RTK enabled me to portion out
                'slices' of state that were related: experience, quest progress, etc. By focusing the scope of the
                global state to just the slice, the workflow is greatly simplified.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Features</h3>
              <p>Auth process ensures no duplicate emails or player usernames.</p>
              <p>
                Game actions send a chat message to the chat window component, with an option to toggle chat filters.
              </p>
              <p>The game state is managed with Redux, and every state update writes to localStorage.</p>
              <p>Every 5 minutes, the player's data is updated on the Mongo database.</p>
              <p>The changelog is displayed in the lobby, keeping players up to date on recent changes and fixes.</p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Challenges</h3>
              <p>
                Staying organized was a big task with this project as there are a lot of interconnected parts. I made
                sure to keep data structures and nomenclature as consistent and patterned as possible, and I documented
                functions and left notes to simplify the workflow. When implementing new skills, I broke down the big
                ideas into smaller ones, then translated those small ideas into pseudocode, which lent itself nicely to
                actual code.
              </p>
              <p>
                Redux and MongoDB were not part of the coursework, so implementing these were initially a challenge as I
                had to learn them on my own. To familiarize myself with Redux, I built a small app to update multiple
                slices of state in different ways to mimic the functionality of the final project with a much simpler
                implementation. Once the small app was complete, I expanded upon it as a framework and added in new
                features and functionality until it became IdleScape.
              </p>
              <p>
                I wanted to make Idlescape as close to Runescape as I could, which meant using large amounts of varied
                data available on their wiki. I did not want to copy and paste everything manually, so I made some web
                scraping utility tools. My bookmarklets scraped a wiki page for the data I was looking for, such as
                quest data, monster information, etc., and logged it to the console in the form of an object. This
                vastly reduced the workload and simplified the workflow.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Roadmap</h3>
              <div>
                <p>
                  View the roadmap for Idlescape on{" "}
                  <a href={"https://github.com/emoran0403/Idle-Game#roadmap"} rel="noreferrer" target="_blank">
                    Github
                  </a>
                </p>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              {IdleGameDetails.techStack.sort().map((tech) => (
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

export default IdleGame;