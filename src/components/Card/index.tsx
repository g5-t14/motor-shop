import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content, ...rest }) => {
  return (
    <div {...rest}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;