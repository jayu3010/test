import { Button } from 'antd';
import React from 'react';
import { CSVLink } from 'react-csv';

import { exportIcon } from '@/utils/icons/icons';

const ExportCSV = ({ columns, data }) => {
  const getCsvData = () => {
    return data.map((item) => {
      const row = {};
      columns.forEach((col) => {
        row[col.title] = item[col.dataIndex];
      });
      return row;
    });
  };
  const csvData = getCsvData();

  return (
    <Button icon={exportIcon} className="btn-outline">
      <CSVLink data={csvData} filename="export.csv">
        Export CSV
      </CSVLink>
    </Button>
  );
};

export default ExportCSV;
