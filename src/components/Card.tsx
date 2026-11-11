import { ReactElement } from "react";
import { Heading } from "./Heading";

export type CardProps = {
  title: string;
  content: string;
  highlight?: string
}

export const Card = ({title, content, highlight}: CardProps): ReactElement => {
  return <div 
    className="Card"
    data-animate="content"
  >
    {highlight && <span className="--highlight">{highlight}</span>}
    <Heading level={3} size="card" text={title}/>
    <p>{content}</p>
  </div>
}