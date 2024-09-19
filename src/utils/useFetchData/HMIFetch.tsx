import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';

import {
  addCloseModal,
  closeModal,
  filterData,
  tableData,
} from '../redux/features/reduxData';
import service from '../service/service';
import API_URL from '../apiUri';
import { trimValues } from '../functions/commonFunction';

const HMIFetch = (apiUrl?: any, pageUrl?: any) => {
  const pagination = useSelector((state: any) => state.pagination);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageUrl) {
      getQueryFetch(pagination, apiUrl, pageUrl);
    }
  }, [pageUrl, pagination]);


  const getQueryFetch = async (
    queryParams: Record<string, any>,
    apiUrl: string,
    pageUrl?: any
  ) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl,
        query: queryParams,
      });

      if (response?.apiStatus) {
        if (pageUrl) {
          dispatch(filterData(response?.apiData || []));
          dispatch(tableData(response?.apiData || []));
        }
        return response.apiData || [];
      }
      setError('Failed to fetch item by ID');
    } catch (err) {
      setError('An error occurred while fetching item by ID');
    } finally {
      setLoading(false);
    }
  };

  const addData = async (
    newItem: any,
    apiUrl: string,
    formDataCheck?: boolean
  ) => {
    try {
      setLoading(true);
      const trimmedItem = formDataCheck ? newItem : trimValues(newItem);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl,
        body: trimmedItem,
      });

      if (response?.apiStatus) {
        return response;
      }else{
        let errorMessages = '';
        if (Array.isArray(response.apiErrorData)) 
        {
          errorMessages = response.apiErrorData
            .map((errorObject: any) => Object.values(errorObject).join(' '))
            .join(' ');
        } 
        else if (typeof response.apiErrorData=== 'string') {
          errorMessages = response.apiErrorData;
        }
        message.error(errorMessages || 'An error occurred.');
        return response;
      }

    } catch (err) {
      setError('An error occurred while adding data');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addData,
    getQueryFetch,
  };
};

export default HMIFetch;
