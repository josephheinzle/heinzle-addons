import * as React from "react";
import * as Types from "../../../Types";
import { TicTacToeDetails } from "../../ProjectInfo";
import ProjectLinks from "../../Components/ProjLinks";
import { useEffect } from "react";

const TicTacToe = (props: Types.NO_PROPS) => {
  return (
    <div className="my-4">
      <h1 className="text-center">Tic Tac Toe Lab</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>

      <ProjectLinks appURL={TicTacToeDetails.appURL} gitHubURL={TicTacToeDetails.gitHubURL} />

      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Overview</h3>
              <p>
                Your basic Tic Tac Toe, Noughts and Crosses, or X's and O's game. Clicking in a square places the symbol
                for the current player. Every turn the game checks for a winner, or when the board is full, displays
                Draw! When the game is over, there is an option to reset the board and play again.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Features</h3>
              <p>1 function checks the entire board for a winning condition after every turn.</p>
              <p>The game resets the board after a win or draw.</p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Challenges</h3>
              <p>
                This was one of the first labs in the course that brought together the concepts taught in the HTML, CSS,
                and JS sections, with a healthy dose of "If you don't know it, google it". One of the small things not
                explicitly covered (and the most difficult part about this lab) was adding the defer attribute to the
                script tag in the html file to ensure the DOM tree loaded before the script attempted to add the event
                listeners. Turns out I could have just put the script tag at the end of the body as well.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Roadmap</h3>
              <div>
                <ul>
                  <li>Enable the game to track wins for local multiplayer</li>
                  <li>Add a dummy computer player to choose random tiles to play against</li>
                  <li>Add a smart computer player that implements a strategy to choose tiles</li>
                  <li>Online Multiplayer</li>
                </ul>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              {TicTacToeDetails.techStack.sort().map((tech) => (
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

export default TicTacToe;