import * as React from "react";
import * as Types from "../../Types";

const Resume = (props: Types.NO_PROPS) => {
  return (
    <div>
      <div style={{ height: "91vh" }}>
        <iframe
          width="100%"
          height={"100%"}
          // src="https://docs.google.com/document/d/1F7eCqSJMzCzhs6Mq0qkMqSwNJtV2fMwwedde925l4sU/preview"
          src="https://docs.google.com/document/d/1ujDqnhHzlhacSWKo-pHKiIywkHiPSF6CjOBfkKkyGA4/preview"
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;