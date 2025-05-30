import React from 'react';

interface ICentrePageLayoutProps extends
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isCustomCursor?: boolean
}

export const CentrePageLayout: React.FC<ICentrePageLayoutProps> = (props) => {
  const { onClick } = props;
  return (
    <div 
      className={`flex justify-center items-center w-screen h-screen ${props.isCustomCursor ? 'cursor-[url("../../../../resources/svgs/mouse.svg")_17_0,auto]' : ''}`} 
      onClick={onClick}
    >
      <div className="flex justify-evenly w-full items-center h-full">
        {props.children}
      </div>
    </div>
  );
}
