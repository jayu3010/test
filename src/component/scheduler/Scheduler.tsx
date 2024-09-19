'use client'
import React, { useState } from 'react';
import Timeline, { TimelineHeaders, DateHeader } from 'react-calendar-timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import { groups as initialGroups, items as initialItems } from './items';

const Scheduler: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  const handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      const updatedItem = {
        ...item,
        start_time: moment(dragTime),
        end_time: moment(dragTime).add(item.end_time.diff(item.start_time)),
        group: newGroupOrder,
      };

      const updatedItems = items.map((item) =>
        item.id === itemId ? updatedItem : item
      );
      setItems(updatedItems);
    }
  };

  const handleItemResize = (itemId: number, time: number, edge: 'left' | 'right') => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      const updatedItem = {
        ...item,
        start_time: edge === 'left' ? moment(time) : item.start_time,
        end_time: edge === 'right' ? moment(time) : item.end_time,
      };

      const updatedItems = items.map((item) =>
        item.id === itemId ? updatedItem : item
      );
      setItems(updatedItems);
    }
  };

  return (
    <Timeline
      groups={initialGroups}
      items={items}
      minZoom={60 * 60 * 1000} // 1 hour
      maxZoom={365.24 * 86400 * 1000 * 5} // 5 years
      defaultTimeStart={moment().startOf('month')}
      defaultTimeEnd={moment().endOf('month')}
      canMove={true}
      canResize="both"
      itemTouchSendsClick={false}
      onItemMove={handleItemMove}
      onItemResize={handleItemResize}
    >
      <TimelineHeaders>
        <DateHeader unit="primaryHeader" labelFormat="MMMM YYYY" />
        <DateHeader unit="day" />
        <DateHeader unit="hour" labelFormat="HH:mm" />
      </TimelineHeaders>
    </Timeline>
  );
};

export default Scheduler;
