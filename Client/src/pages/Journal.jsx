import React, { useCallback, useRef, useState } from "react";
import "../app.css";
import "../index.css";
import Quill from "quill";
import Editor from "../Editor";
import axiosInstance from "../contexts/AxiosInstance";
import styles from "../assets/Journal.module.css"
import Container from "quill/blots/container";
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
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
         
        />
      </div>
      

      <Editor
       id="toolbar"
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert("What's on your mind?")
          .insert("\n", { header: 3 })
          .insert("Initial text")
          }
        onSelectionChange={setRange}
        onTextChange={setLastChange}
        
       />
       
      <div className={styles.controls}>
       
        
        <button className={styles.controlsright} type="button" onClick={handleSave}>
          {" "}
          Save Content
        </button>
      </div>
      <div className={styles.state}>
        <div className={styles.statetitle}>Current Range:</div>
        {range ? JSON.stringify(range) : "Empty"}
      </div>
      <div className={styles.state}>
        <div className={styles.statetitle}>Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : "Empty"}
      </div>
    </div>
  );
}
export default Journal;
