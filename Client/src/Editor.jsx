import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import Toolbar from "quill/modules/toolbar";
import Theme from "quill/core/theme";



// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange,onSaveChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
   
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      
    });
    

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      //toolbarOptions=[[{ 'color': [] },{'background':[]}]]
      const quill = new Quill(editorContainer, {
      modules:{
        toolbar:[ [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],[{ 'color': [] }, { 'background': [] }] ,
        ['image'], [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }]]
      },
       theme: "snow",
        
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
        
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return <div style={{display:'flex', justifyContent:'center'}}><div style={{width:'90%',background:'white'}} ref={containerRef}></div></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;

