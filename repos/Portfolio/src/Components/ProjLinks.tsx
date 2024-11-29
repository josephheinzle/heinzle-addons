import * as React from "react";
import * as Types from "../../Types";

/**
 * @param appURL url for the live demo
 * @param gitHubURL url for git hub repo
 * @returns some sweet jsx
 */
export default function buttonJSX({ appURL, gitHubURL }: Types.ProjectLinksProps) {
  return (
    <div className="d-flex justify-content-center">
      <a className="btn btn-primary btn-sm m-2" href={gitHubURL} target="_blank" rel="noreferrer">
        Git Hub Repo
      </a>
      <a className="btn btn-primary btn-sm m-2" href={appURL} target="_blank" rel="noreferrer">
        Project Site
      </a>
    </div>
  );
}