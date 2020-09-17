import { Toolbar } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// Define our app...
export const Notes = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  // Keep track of state for the value of the editor.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "This is a note!" }],
    },
  ]);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
        <Toolbar>

        </Toolbar>
      <Editable />
    </Slate>
  );
};
