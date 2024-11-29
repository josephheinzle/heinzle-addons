import * as React from "react";
import * as Types from "../../Types";
import { useNavigate } from "react-router-dom";

const Profile = (props: Types.ProfileProps) => {
  const nav = useNavigate();

  return (
    <div className="my-4">
      <h1 className="text-center">Profile</h1>
      <hr style={{ width: "50%", height: "5px", margin: "auto" }}></hr>

      <div className="d-flex justify-content-center">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <p>(Profile picture coming soon)</p>
              <h3 className="text-center">About Me</h3>
              <p>Hello! I'm Eric Moran.</p>
              <p>
                I started my career in middle school math education to share my joy of math and learning with the next
                generation. I loved witnessing the moment when the gears started turning in a student's mind and the
                concept finally clicked for them. However, I personally didn't feel challenged in my career; I was
                missing something. The level of math I was teaching made me feel as if I wasn't growing my own
                understanding, and I wanted to stay mentally engaged with the material while also helping others. I
                remembered thinking about the Number Theory and Sets and Logic classes I took in college, and how
                rigorous, yet enjoyable they were; I wanted to find a career that would be as rewarding and resourceful
                as those classes were for me.
              </p>
              <p>
                After attending and graduating from Covalence, a software development boot camp, I have once again found
                the challenging and rewarding environment that I've wanted to return to professionally, and I've already
                put it to use by helping my family and friends solve real-world problems. For one brief example, I have
                a friend who works at Gundam Planet that needed help with their manual release date tracking system. To
                test my newfound skills, I offered to build an app that would collect release date information for them
                and update it for them automatically - saving them hours of manual, tedious data entry work every day.
                This project won't change the world, but it changed their world - and they absolutely loved it. Now
                they're using my software, and it has made their work life easier while it simultaneously helped me grow
                as a software developer. It gives me a tremendous amount of joy to know that the work I'm doing is
                improving someone else's life, and I have a greater sense of personal fulfillment because I am growing
                personally and professionally while still helping someone else. I'm still early in my software career,
                but I am extremely eager to continue developing this new skillset and passion as I help others along the
                way.
              </p>
              <p>
                When I'm not coding, I enjoy baking, going outdoors, and gaming. My most delicious recipes are vegan
                banana bread and vegan pumpkin bread. My mother routinely sells out of these at her shop. Asheville NC
                has no lack of hiking trails or scenic views. I've heard you can hike one a day and still have new
                trails after a year. My favorite spots (so far) are Black Balsam Knob and Bearwallow Mountain.
                Waldeinsamkeit is an accurate description of the feeling you get when you reach the top and take in the
                view. I've recently been playing modded minecraft on a server with friends; it has been a great way to
                stay connected when we're all in different states. When I'm feeling a little more competitive, I'll hop
                on Master Chief Collection and do some games of big team on Halo 4.
              </p>
            </div>
            <hr></hr>
            <div className="card-body">
              <h3 className="text-center">Socials</h3>
              <div className="d-flex justify-content-center">
                <a
                  className="btn btn-primary btn-sm m-2"
                  href={"https://www.linkedin.com/in/ejm-dev/"}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="btn btn-primary btn-sm m-2"
                  href={"https://github.com/emoran0403"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </div>
            </div>
            <hr></hr>

            <div className="card-body">
              <h3 className="text-center">Projects I'm working on</h3>
              <ul>
                <li>
                  <a href="https://github.com/emoran0403/Idle-Game" rel="noreferrer" target="_blank">
                    IdleScape
                  </a>{" "}
                  - Varrock city, Cooking skill, Grand Exchange API
                </li>
                <li>
                  <a href="https://github.com/emoran0403/Gundam-Getter" rel="noreferrer" target="_blank">
                    Gundam Getter
                  </a>{" "}
                  - Targeted scraping scripts and fallback scripts
                </li>
                <li>
                  <a href="https://github.com/emoran0403/Daily_Tarot_Picker" rel="noreferrer" target="_blank">
                    Daily Tarot Journal
                  </a>{" "}
                  - A Full-Stack mindfulness app with a tarot twist
                </li>
                <li>
                  <a href="https://github.com/emoran0403/Leet-Code-Examples" rel="noreferrer" target="_blank">
                    Codewars App
                  </a>{" "}
                  - An app to showcase my solutions to the challenges on{" "}
                  <a href="https://www.codewars.com/" rel="noreferrer" target="_blank">
                    CodeWars
                  </a>
                </li>
              </ul>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;