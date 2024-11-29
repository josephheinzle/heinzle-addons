import * as React from "react";
import * as Types from "../../../Types";
import { GundamGetterDetails } from "../../ProjectInfo";

const GundamGetter = (props: Types.GundamGetterProps) => {
  return (
    <div className="my-4">
      <h1 className="text-center">Gundam Getter</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>

      <div className="d-flex justify-content-center">
        <a className="btn btn-primary btn-sm m-2" href={GundamGetterDetails.gitHubURL} target="_blank" rel="noreferrer">
          Git Hub Repo
        </a>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Overview</h3>
              <p>
                My friend at{" "}
                <a href="https://www.gundamplanet.com/" rel="noreferrer" target="_blank">
                  Gundam Planet
                </a>{" "}
                maintains a{" "}
                <a
                  href="https://docs.google.com/spreadsheets/d/1CIlUvXqWgsoz_MNrpkRCrn209Mbo0tgdlqQBs3YL_uk/edit#gid=0"
                  rel="noreferrer"
                  target="_blank"
                >
                  Google Sheet
                </a>{" "}
                with 3000+ entries for upcoming model kit release dates for their customers. Updating this list requires
                checking one of their many distributors' websites for the information. This was done manually, and
                updating the entire list required around 8 hours of manual data entry. Due to the nature of the
                industry, these release dates are subject to change multiple times. This state of flux was exacerbated
                when the pandemic began, leading to situations where by the time the 3000th entry was entered, something
                would undoubtedly be out of date.
              </p>
              <p>
                Behind the scenes, Gundam Getter reads the SKU data from Google Sheets via the Google Sheets API. Its
                server then launches a headless (windowless) Firefox browser via Selenium. The browser is configured to
                not download images or other extraneous items. The configuration and headless browser was chosen for
                speed and efficiency - each second spent on one SKU is a wasted 50 minutes when considering the
                performance over the entire sheet. The browser then navigates to specific sites and reads the model kit
                release dates. After reading the dates, they are then written back to the Google Sheet.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Features</h3>
              <p>
                Utilizes Google Sheets API to authorize and authenticate read and write requests to the Google Sheet.
              </p>
              <p>A headless Selenium Firefox browser to scrape web data.</p>
              <p>
                If the release date cannot be found on the page, a link to the page is written to the Google Sheet for
                manual verification.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Challenges</h3>
              <p>
                Selenium is a very interesting and exciting tool to work with. My main complaint is that their DOM
                element selectors aren't exactly 1-to-1 with traditional DOM traversal methods. This required more time
                for trial and error in instructing the browser exactly what I needed it to do on each page.
              </p>
              <p>
                Google APIs and their documentation was the most challenging part of this project. I felt like I was
                playing whack-a-mole with the debugging process: something would come up, I would check the docs to fix
                it, something new would come up that the first docs didn't warn about, and I would have to check the
                docs again.
              </p>
              <p>
                Trying to deploy Gundam Getter was definitely the most frustrating part of the project. Every issue I
                had to address to get the project working locally came up again in a slightly different way in
                deployment. The build process on Heroku ran out of available memory and would not build - I had to
                convert it to a NextJS app to address this. Selenium required an older Heroku stack to run on. Firefox's
                binaries for Selenium had to be added to the project files itself since it wouldn't be running from my
                machine. Google APIs required a few additional steps the docs didn't really warn about.
              </p>
              <p>
                In the end I decided to not deploy Gundam Getter online. Instead, I created a short list of instructions
                on how to download Node, and then created a script to install and then run the project locally on their
                machine. I felt this was the best route, as the intended users are employees at Gundam Planet, and it
                realistically only needs to be on one machine.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Roadmap</h3>
              <div>
                <ul>
                  <li>Add Selenium sripts for additional websites</li>
                  <li>Launch multiple Selenium instances to scrape multiple websites in parallel</li>
                  <li>Enable writing to the sheet after each date is found instead of waiting for all dates</li>
                  <li>Write the website URL to a new column for spot checking</li>
                </ul>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              {GundamGetterDetails.techStack.sort().map((tech) => (
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

export default GundamGetter;