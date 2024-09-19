import React, { useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
// import { COLUMN_NAMES } from "./constants";
// import { ItemType, DragItem } from "./types";

const COLUMN_NAMES = {
  DO_IT: 'Doit',
  IN_PROGRESS: 'In Progress',
};

interface DragItem {
  index: number;
  name: string;
  currentColumnName: string;
  type: string;
}

enum ItemType {
  CARD = 'CARD',
}

interface ColumnProps {
  children: React.ReactNode;
  className: string;
  title: string;
  setWorkCenterIds: any;
}

const Column: React.FC<ColumnProps> = ({
  children,
  className,
  title,
  setWorkCenterIds,
}) => {
  const allIds = useMemo(() => {
    if (children.mappedItems && Array.isArray(children.mappedItems)) {
      return children.mappedItems.map((child: any) => child.key);
    }
    return [];
  }, [children.mappedItems]);

  useEffect(() => {
    setWorkCenterIds(allIds);
  }, [allIds]);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemType.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item: DragItem) => {
      const { DO_IT, IN_PROGRESS } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === DO_IT && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS && title === DO_IT)
      );
    },
  });

  return (
    <div ref={drop} className={className}>
      {children?.mappedItems}
    </div>
  );
};

export default Column;
