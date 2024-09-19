import React from 'react';
import { DayPilotScheduler } from 'daypilot-pro-react';

const Scheduler = () => {
  return (
    <div>
      <DayPilotScheduler
        startDate="2024-12-01"
        days={31}
        scale="Day"
        timeHeaders={[{ groupBy: 'Month' }, { groupBy: 'Day', format: 'd' }]}
        resources={[
          { name: 'Resource 1', id: 'R1' },
          { name: 'Resource 2', id: 'R2' },
          { name: 'Resource 3', id: 'R3' },
        ]}
      />
    </div>
  );
};

export default Scheduler;
