import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { BoardHeight, BoardWidth } from '../../config';
import { selectGameConfig } from '../../gameSlice';

export const CentralPlaceholder: React.FC<PropsWithChildren> = ({ children }) => {
  const config = useSelector(selectGameConfig) as import('../../interfaces').GameConfig;
  return (
    <div className="border-2 border-dashed border-[var(--primary-fg-11)] rounded-[2.875rem] p-5">
      <div 
        className="relative bg-[var(--secondary-bg-43)] shadow-[0px_3px_6px_#000000DD] rounded-[2.875rem]" 
        style={{ height: `${BoardHeight(config)}px`, width: `${BoardWidth(config)}px` }}
      >
        {children}
      </div>
    </div>
  );
};
