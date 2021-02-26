import React, { useState, FC } from "react";
import { Alert } from "reactstrap";

interface BlogFieldProps {
  onChange: (field: string) => void;
  value: string;
  error?: string;
}

const BlogField: FC<BlogFieldProps> = ({ onChange, value, error }) => {
  return (
    <div className="blog-field">
      <div className="group">
        <label htmlFor="field">Field</label>
        <select
          id="field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="javascript">Javascript</option>
          <option value="react">React</option>
          <option value="python">Python</option>
          <option value="angular">Angular</option>
          <option value="node.js">Node.js</option>
          <option value="blockchain">Blockchain</option>
        </select>
      </div>
      {error && (
        <Alert color="danger" style={{ width: "40%" }}>
          <h4>{error}</h4>
        </Alert>
      )}
    </div>
  );
};

export default BlogField;
