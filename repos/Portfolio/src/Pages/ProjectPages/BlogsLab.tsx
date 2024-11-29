import * as React from "react";
import * as Types from "../../../Types";
import { BlogsLabDetails } from "../../ProjectInfo";
import ProjectLinks from "../../Components/ProjLinks";
import { useEffect } from "react";

const BlogsLab = (props: Types.NO_PROPS) => {
  return (
    <div className="my-4">
      <h1 className="text-center">Blogs Lab</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>
      <ProjectLinks appURL={BlogsLabDetails.appURL} gitHubURL={BlogsLabDetails.gitHubURL} />
      <div className="d-flex justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Overview</h3>
              <p>
                This Full-Stack CRUD application is the last major lab in the course, bringing all the previous learning
                together in one nice package. Users sign up with an email, and are issued a JSON Web Token for
                authentication / authorization purposes. Once registered, users may view other blog authors, or view and
                create blogs, and may edit or delete their own blogs. The JWT is utilized for editing and deleting
                blogs, verifying the author is the only one capable of editing or deleting their own content.
              </p>
              <p>
                My Blogs Lab also incorporates Mailgun and Stripe. I've implemented Mailgun with a feature allowing
                users to send an email to an author. Stripe processes credit card payments, which I've implemented into
                a donate feature, letting users donate to other authors.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Features</h3>
              <p>
                Full-Stack CRUD app where users can securely register, view other authors, read, write, edit, and delete
                blogs.
              </p>
              <p>Mailgun implemented allowing users to send emails to authors.</p>
              <p>Stripe implemented allowing users to safely send money to authors.</p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Challenges</h3>
              <p>
                The toughest part of the lab was the size of the project compared to the previous labs. This was the
                first time there was a large number of components and features - it was not 'complete' when the lab was
                'done'. The first iteration did not have auth, mailgun, or stripe. Finishing this lab with all the
                intended features helped me become comfortable with bigger projects.
              </p>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Roadmap</h3>
              <div>
                <ul>
                  <li>Allow users to create their own tags</li>
                  <li>Allow users to add multiple tags to a post</li>
                  <li>Add a search feature to search by author / title / tags</li>
                  <li>Public and private profile pages</li>
                </ul>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              {BlogsLabDetails.techStack.sort().map((tech) => (
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

export default BlogsLab;