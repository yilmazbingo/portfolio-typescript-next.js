import moment from "moment";
import React from "react";

interface AvatarProps {
  image: string;
  author: string;
  date: Date;
  field?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, author, date, field }) => {
  return (
    <div className="media avatar-box mb-2">
      <img className="mr-2" src={image} alt={`${author} blog`} />
      <div className="media-body align-self-center">
        <h5 className="mt-0 mb-0 title">{author}</h5>
        <p className="mt-0 subtitle">{moment(date).format("LLLL")}</p>
      </div>
      <div className="algorithm-lang">{field}</div>
    </div>
  );
};

export default Avatar;
