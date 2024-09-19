import React, { useEffect } from 'react';

import FilterArray from '../FilterArray';
import service from '../service/service';
import useFetchData from './customFetchData';

export const FilterCommanFunction = (filterOptiondata: any) => {
  const { listData, getListData }: any = useFetchData();
  const modalListing = async () => {
    // Create dynamic API URL mappings
    const apiUrls = Object.keys(filterOptiondata).reduce((acc, key) => {
      if (key !== 'name' && key !== 'id') {
        acc[key] = service?.API_URL[key]?.listing;
      }
      return acc;
    }, {});
    // console.log("44444",apiUrls);
    const enable = true;
    await getListData(apiUrls, enable);
  };

  useEffect(() => {
    modalListing();
  }, []);

  return FilterArray[filterOptiondata.name]?.map((item: any, i: any) => {
    const shopData = filterOptiondata?.id?.includes(item.name);
    if (shopData && item.type === 'selectbox') {
      return {
        ...item,
        options: [
          {
            [item.keyField]: '',
            [item.valueField]: 'ALL',
          },
          ...(listData[item.api] ?? []),
        ],
      };
    }

    return item;
  });
};
