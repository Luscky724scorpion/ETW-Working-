import React, { useState } from "react";

function JournalTitle() {
  // Create the title state with an empty string as the initial value
  const [title, setTitle] = useState("");

  // Update the state when the input changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <label htmlFor="title-input">Journal Title:</label>
      <input
        id="title-input"
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter your journal title"
      />
      <p>Current title: {title}</p>
    </div>
  );
}

export default JournalTitle;