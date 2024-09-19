import React, { useRef, Dispatch, SetStateAction, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { deleteIcon } from '@/utils/icons/icons';

interface Task {
  id: number;
  name: string;
  column: string;
}

interface DragItem {
  index: number;
  name: string;
  currentColumnName: string;
  type: string;
}

enum ItemType {
  CARD = 'CARD',
}

type MovableItemProps = {
  key: any;
  name: string;
  currentColumnName: string;
  setItems: Dispatch<SetStateAction<Task[]>>;
  index: number;
  moveCardHandler: any;
  handleDelete: any;
  handleMultipleMove?: any;
};

const MovableItem: React.FC<MovableItemProps> = ({
  key,
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
  handleDelete,
  handleMultipleMove,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { index, name, currentColumnName, type: ItemType.CARD },
    end: (item: DragItem, monitor) => {
      const dropResult = monitor.getDropResult<{ name: string }>();
      if (dropResult) {
        const { name: columnName } = dropResult;
        setItems((prevState) =>
          prevState.map((e) => ({
            ...e,
            column: e.name === item.name ? columnName : e.column,
          }))
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="relative p-2 bg-blue-200 w-full h-10 flex items-center justify-center rounded-lg"
      style={{ opacity }}
    >
      <input
        id={`checkbox_${currentColumnName.split(' ').join('')}`}
        type="checkbox"
        onChange={handleMultipleMove}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />

      <div className="absolute top-0 right-0 p-1">
        <svg
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentcolor"
          viewBox="0 0 1024 1024"
          className="delete"
        >
          <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32z m-200 0H360v-72h304v72z" />
        </svg>
      </div>
      {name}
    </div>
  );
};

export default MovableItem;
