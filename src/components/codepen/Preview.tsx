import React, { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
  error: string;
}

// iframe posts message
// event.preventDefault(), prevents error to be thrown to console.
// "message" from parent is being sent here to preview
const html = `
 <html>
 <head>
 <style>html{background-color:gray}</style>
 </head>
 <body>
   <div id="root"></div>
   <script>
   const handleError=(err)=>{
    const root=document.getElementById("root");
    root.innerHTML='<div style="color:red"> <h4> Runtime Error</h4>'+ err+ '</div>';
    console.error(err);
   }
   window.addEventListener('error',(event)=>{
     event.preventDefault()
     handleError(event.error)
   })
     window.addEventListener('message',(event)=>{
       try{
         eval(event.data)
       }catch(err){
         handleError(err)
       }
     },false)
   </script>
 </body>
</html>
`;
// this receives bundled code
const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    // code=result.outputFiles[0].text
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
    // 50 ms will make sure browser has enough time to update the sourcedoc and setup a message listener inside there,watch for postMessage attempt
  }, [code]);

  return (
    // iframe was not receiving drag event so wrap it with div
    <div className="preview-wrapper">
      <iframe
        srcDoc={html}
        title="preview"
        sandbox="allow-scripts"
        ref={iframe}
      />
      {error && (
        <div className="preview-error">
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default Preview;
