import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as Types from "../../Types";

const Resume = (props: Types.ResumeProps) => {
  const nav = useNavigate();

  return (
    <div>
      <div style={{ height: "91vh" }}>
        <iframe
          width="100%"
          height={"100%"}
          src="https://docs.google.com/document/d/1F7eCqSJMzCzhs6Mq0qkMqSwNJtV2fMwwedde925l4sU/preview"
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;