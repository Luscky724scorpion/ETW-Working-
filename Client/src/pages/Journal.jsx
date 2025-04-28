import React, { useCallback, useRef, useState } from "react";
import "../app.css";
import "../index.css";
import Quill from "quill";
import Editor from "../Editor";
import axiosInstance from "../contexts/AxiosInstance";
import JournalTitle from "../Components/Title";
const Delta = Quill.import("delta");

function Journal() {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  //save event
  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      const quillInstance = quillRef.current;
      try {
        console.log("Checking editorRef.current:", quillRef.current);
        if (!quillInstance) {
          console.error("ediotr uninitialized");
          return;
        }
        const content = quillInstance.getContents();

        console.log("Save content(Delta)",);
        
        const response = await axiosInstance.post(
          "/api/create/",
          {
            title: title,
            Delta: content,
          }
        );
        /*creator:userId,*/
        console.log("save successful", response.data);
        setError(null);
      } catch (error) {
        console.error("error saving entry", error);
        setError("failed to save. Try again");
      }
    },
    [title]
  );

  // Use a ref to access the quill instance directly

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
         
        />
      </div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert("Hello")
          .insert("\n", { header: 1 })
          .insert("Some ")
          .insert("initial", { bold: true })
          .insert(" ")
          .insert("content", { underline: true })
          .insert("\n")}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
      <div className="controls">
        <label>
          Read Only:{" "}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          {" "}
          Get Content Length
        </button>
        <button className="controls-right" type="button" onClick={handleSave}>
          {" "}
          Save Content
        </button>
      </div>
      <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : "Empty"}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : "Empty"}
      </div>
    </div>
  );
}
export default Journal;
