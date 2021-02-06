import moment from "moment";
import React from "react";

interface AvatarProps {
  image: string;
  title: string;
  date: Date;
}

const Avatar: React.FC<AvatarProps> = ({ image, title, date }) => (
  <div className="media avatar-box mb-2">
    <img className="mr-2" src={image} />
    <div className="media-body align-self-center">
      <h5 className="mt-0 mb-0">{title}</h5>
      <p className="mt-0 subtitle">{moment(date).format("LLLL")}</p>
    </div>
  </div>
);

export default Avatar;
