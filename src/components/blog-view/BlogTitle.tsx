import React, { FC } from "react";
import { Alert } from "reactstrap";
interface BlogTitleProps {
  onChange: (field: string) => void;
  value: string;
  error?: string;
}
const BlogTitle: FC<BlogTitleProps> = ({ value, error, onChange }) => {
  console.log("Eror in title", error);
  return (
    <div className="group">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <Alert color="danger" style={{ width: "40%" }}>
          <h4>{error}</h4>
        </Alert>
      )}
    </div>
  );
};

export default BlogTitle;
