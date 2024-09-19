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

const useFetchData = (apiUrl?: any, pageUrl?: any) => {
  const [listData, setListData] = useState<any[]>([]);
  const FilterDataRexux = useSelector((state: any) => state.exportFilterData);
  const pagination = useSelector((state: any) => state.pagination);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchData = async (url?: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl: url || apiUrl,
      });
      if (response?.apiStatus) {
        dispatch(filterData(response?.apiData || []));
        dispatch(tableData(response?.apiData || []));
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (apiUrl && !pageUrl) {
      fetchData();
    }
  }, [apiUrl, pageUrl]);
  useEffect(() => {
    if (pageUrl) {
      getQueryFetch(pagination, apiUrl, pageUrl);
    }
  }, [pageUrl, pagination]);

  const getListData = async (
    apiUrls: { [key: string]: string },
    enable?: boolean
  ) => {
    try {
      setLoading(true);
      const responses: any = await Promise.all(
        Object.entries(apiUrls).map(async ([key, url]) => {
          const response = await service.makeAPICall({
            methodName: service.Methods.GET,
            apiUrl: url,
          });
          return { key, response };
        })
      );
      // let enable = false;
      responses.forEach(({ key, response }: any) => {
        if (response?.apiStatus) {
          const filteredData = enable
            ? response.apiData // Include all data if enable is true
            : response.apiData.filter((item: any) => item?.status); // Filter by status if enable is false

          setListData((prevData: any) => ({
            ...prevData,
            [key]: filteredData,
          }));
        } else {
          setError(`Failed to fetch data for ${key}`);
        }
      });
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const getItemById = async (id: any, apiUrl: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl,
        params: id,
      });
      if (response?.apiStatus) {
        return response.apiData;
      }
      setError('Failed to fetch item by ID');
    } catch (err) {
      setError('An error occurred while fetching item by ID');
    } finally {
      setLoading(false);
    }
  };

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
      // if (modelClose) {
      //   fetchData(fetchUrl);
      //   dispatch(addCloseModal('import'))
      // }

      if (response?.apiStatus) {
        if(response?.apiData?.length<0)
        {
          message.success(response.apiMessage);
        }
        dispatch(closeModal());
        fetchData();
        return response;
      }
      let errorMessages = '';
      if (Array.isArray(response.apiErrorData)) {
        errorMessages = response.apiErrorData
          .map((errorObject: any) => Object.values(errorObject).join(' '))
          .join(' ');
      } else if (typeof response.data.apiErrorData === 'string') {
        errorMessages = response.data.apiErrorData;
      }
      message.error(errorMessages || 'An error occurred.');
      return response;
    } catch (err) {
      setError('An error occurred while adding data');
    } finally {
      setLoading(false);
    }
  };
  const getShopData = async (
    body?: any,
    apiUrl?: any,
    modelClose?: boolean
  ) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl,
        body,
      });

      if (response?.apiStatus) {
        dispatch(addCloseModal('addBulkPO'));
        if (modelClose) {
          message.success(response.apiMessage || 'Upload Success');
        }
        return response.apiData;
      }
      let errorMessages = '';
      if (Array.isArray(response.apiErrorData)) {
        errorMessages = response.apiErrorData
          .map((errorObject: any) => Object.values(errorObject).join(' '))
          .join(' ');
      } else if (typeof response.data.apiErrorData === 'string') {
        errorMessages = response.data.apiErrorData;
      }

      message.error(errorMessages || 'An error occurred.');
      return response;
    } catch (err) {
      message.error('An error occurred while fetching item by ID');
    }
  };
  const updateShopData = async (
    updatedItem: any,
    apiUrl: string,
    shopUpdate?: boolean
  ) => {
    try {
      setLoading(true);
      const trimmedItem = trimValues(updatedItem);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.PUT,
        apiUrl: `${apiUrl}`,
        body: trimmedItem,
      });

      if (response?.apiStatus) {
        getShopData();
        return response;
      }
      let errorMessages = '';
      if (Array.isArray(response.apiErrorData)) {
        errorMessages = response.apiErrorData
          .map((errorObject: any) => Object.values(errorObject).join(' '))
          .join(' ');
      } else if (typeof response.data.apiErrorData === 'string') {
        errorMessages = response.data.apiErrorData;
      }

      message.error(errorMessages || 'An error occurred.');
    } catch (err) {
      setError('An error occurred while updating data');
    } finally {
      setLoading(false);
    }
  };
  const updateData = async (updatedItem: any, apiUrl: string) => {
    try {
      setLoading(true);
      const trimmedItem = trimValues(updatedItem);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.PUT,
        apiUrl: `${apiUrl}`,
        body: trimmedItem,
      });

      if (response?.apiStatus) {
        const dataFilter = await getQueryFetch(FilterDataRexux, apiUrl);
        dispatch(filterData(dataFilter || []));
        message.success(response.apiMessage);
        dispatch(closeModal());
        return response;
      }
      let errorMessages = '';
      if (Array.isArray(response.apiErrorData)) {
        errorMessages = response.apiErrorData
          .map((errorObject: any) => Object.values(errorObject).join(' '))
          .join(' ');
      } else if (typeof response.data.apiErrorData === 'string') {
        errorMessages = response.data.apiErrorData;
      }

      message.error(errorMessages || 'An error occurred.');
      return response;
    } catch (err) {
      setError('An error occurred while updating data');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: any, deleteUrl?: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.DELETE,
        apiUrl: deleteUrl || apiUrl,
        params: id,
      });

      if (response?.apiStatus) {
        fetchData(deleteUrl || apiUrl);
        message.success(response.apiMessage);
        // dispatch(confirmationClose())
      } else {
        let errorMessages = '';
        if (Array.isArray(response.apiErrorData)) {
          errorMessages = response.apiErrorData
            .map((errorObject: any) => Object.values(errorObject).join(' '))
            .join(' ');
        } else if (
          typeof response.apiErrorData === 'string' ||
          typeof response.data.apiErrorData === 'string'
        ) {
          errorMessages = response.apiErrorData || response.data.apiErrorData;
        }
        message.error(errorMessages || 'An error occurred.');
      }
      dispatch(addCloseModal('deleteModal'));
    } catch (err) {
      setError('An error occurred while deleting item');
    } finally {
      setLoading(false);
    }
  };

  const commonAPI = async (newItem: any, apiUrl: string, reset?: any) => {
    try {
      setLoading(true);

      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl,
        body: newItem,
      });

      if (response) {
        return response;
        // reset()
        // dispatch(closeModal())
        // fetchData();
      }
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join(' ');
      setError('Failed to add data');
      message.error(errorMessages);
    } catch (err) {
      setError('An error occurred while adding data');
    } finally {
      setLoading(false);
    }
  };
  const importFile = async (newItem: any, apiUrl: string, fetchUrl: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl,
        body: newItem,
      });

      if (response?.apiStatus) {
        message.success(response.apiMessage);
        fetchData(fetchUrl);
        dispatch(addCloseModal('import'));
        return response;
      }
      let errorMessages = '';

      const apiErrorData =
        response?.data?.apiErrorData || response.apiErrorData;

      if (typeof apiErrorData === 'string') {
        // If apiErrorData is a string, use it directly
        errorMessages = apiErrorData;
      } else if (typeof apiErrorData === 'object' && apiErrorData !== null) {
        // If apiErrorData is an object, format the error messages
        errorMessages = Object.entries(apiErrorData)
          ?.map(([rowNumber, errors]: [string, string[]]) => {
            // Extract just the error message part after '='
            const formattedErrors = errors
              ?.map((error) => error.split('= ')[1])
              .join(' ');
            return `${rowNumber} ${formattedErrors}`;
          })
          .join(' | ');
      }

      message.error(errorMessages || 'An error occurred.');
      return response;
    } catch (error) {
      message.error('An error occurred while processing your request.');
    }
  };

  const fileDownload = async (
    queryParams: Record<string, any>,
    apiUrl: string
  ) => {
    try {
      // const url = `${apiUrl}?${queryParams}`;
      // const editMachineRes = await axios({
      //   url: url, // Include the ID as a query parameter
      //   method: 'GET',
      //   responseType: 'blob', // Important to handle binary data
      // });

      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl,
        query: queryParams,
      });
    } catch (err) {
      setError('An error occurred while fetching item by ID');
    } finally {
      setLoading(false);
    }
  };

  const commonSwitch = async (newItem: any, apiUrl: string, url: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl,
        body: newItem,
      });
      if (response?.apiStatus) {
        const dataFilter = await getQueryFetch(FilterDataRexux, url);
        dispatch(addCloseModal('switch'));
        dispatch(filterData(dataFilter || []));
        return response;
      }
      let errorMessages = '';
      if (Array.isArray(response.apiErrorData)) {
        errorMessages = response.apiErrorData
          .map((errorObject: any) => Object.values(errorObject).join(' '))
          .join(' ');
      } else if (typeof response.data.apiErrorData === 'string') {
        errorMessages = response.data.apiErrorData;
      }
      message.error(errorMessages || 'An error occurred.');
      return response;
    } catch (err) {
      setError('An error occurred while adding data');
    } finally {
      setLoading(false);
    }
  };
  const getExport = async (apiUrl: string, filterExport?: any) => {
    try {
      setLoading(true);
      const queryString = new URLSearchParams(filterExport).toString();
      const urlWithParams = queryString
        ? `${API_URL.base}${apiUrl}?${queryString}`
        : `${API_URL.base}${apiUrl}`;
      const response = await axios({
        url: urlWithParams,
        method: 'GET',
        responseType: 'blob',
      });
      if (response?.data) {
        return response;
      }
      setError('Failed to fetch item by ID');
    } catch (err) {
      setError('An error occurred while fetching item by ID');
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    listData,
    getListData,
    fetchData,
    getItemById,
    addData,
    updateData,
    deleteItem,
    commonAPI,
    getQueryFetch,
    getShopData,
    updateShopData,
    importFile,
    fileDownload,
    commonSwitch,
    getExport,
  };
};

export default useFetchData;
