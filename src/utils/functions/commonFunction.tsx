import dayjs from 'dayjs';

export const setCookie = (name: string, value: string, days?: number): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/; localhost`; // Simplified concatenation
};

export const onlyAllowNumber = (evt: string): string => {
  const numValue = evt.replace(/[^0-9.]/g, '');
  return numValue;
};
export const formatDateTime = (dateTime: string | null | undefined) => {
  // Check if dateTime is null, undefined, or an empty string and return ''
  if (!dateTime) {
    return '';
  }
  
  return dayjs(dateTime).format('DD-MMM-YYYY HH:mm');
};

export const extractTime = (datetime: string) => {
  return dayjs(datetime).format('HH:mm:ss');
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // Add leading zero
  const day = `0${date.getDate()}`.slice(-2); // Add leading zero
  return `${year}-${month}-${day}`;
};

export const CurrentDate = (date: any) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2); // Add 1 to month since getMonth() is zero-based
  const day = `0${d.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};

export const trimValues = (obj: any) => {
  const trimmedObj: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      trimmedObj[key] = obj[key].trim();
    } else if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      trimmedObj[key] = trimValues(obj[key]); // Recursively trim nested objects
    } else {
      trimmedObj[key] = obj[key];
    }
  }
  return trimmedObj;
};
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  if (typeof document !== 'undefined') {
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
  }
  // Return null if the cookie with the given name is not found
  return null;
};
export const clearCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const formatPathname = (pathname: any) => {
  return pathname
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/-/g, ' ') // Replace all hyphens with spaces
    .split(' ')
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


// Function to convert ISO date-time string to the desired format
export function convertDateTime(dateTimeString:any) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Determine AM/PM
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format

  // Format the date and time
  return `${day}/${month}/${year} ${displayHours}:${minutes} ${amPm}`;
}
export function getFutureDate(daysToAdd:any){
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysToAdd);

  // Format the date in 'YYYY-MM-DD' format
  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(futureDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export function getCurrentMonthDates(){
  const today = new Date();
  
  // Start of the month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // End of the month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 0th day of next month
  
  // Format dates as 'YYYY-MM-DD'
  const formatDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(startOfMonth),
    endDate: formatDate(endOfMonth),
  };
};


export const StatusColumn: React.FC<{
  row: {
    id: number;
    status: boolean;
  };
  onStatusChange?: (id: number) => void;
}> = ({ row, onStatusChange }: any) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={row?.status}
      onChange={() => onStatusChange(row?.id)}
    />
    <div className="relative w-11 h-6 mt-2 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
  </label>
);

export const showFormattedDate = (date: any) => {
  return date ? dayjs(date).format('DD-MMM-YYYY') : null;
};

export const showFormattedTime = (time: string) => {
  return time ? dayjs(time, 'HH:mm:ss').format('HH:mm') : null;
};
export const commonSorter = (key: string) => (a: any, b: any) => {
  const valueA = a[key] ? String(a[key]) : '';
  const valueB = b[key] ? String(b[key]) : '';
  return valueA.localeCompare(valueB);
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Convert hours to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const ActiveDataGet = (data: any, id: any, name: any) => {
  return data
    ?.filter((cell: any) => cell?.status === true)
    .map((cell: any) => ({
      [id]: cell[id],
      [name]: cell[name],
    }));
};

export const convertPathToTitle = (path: any) => {
  const parts = path.replace(/^\//, '').split('-');
  const title = parts
    .map((part: any) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return title;
};
export const capitalizeFirstLetter = (string: string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const convertNumericStringsToNumbers = (obj: any) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Skip File objects
      if (obj[key] instanceof File) continue;
      convertNumericStringsToNumbers(obj[key]);
    } else if (!isNaN(obj[key]) && obj[key] !== null && obj[key] !== '') {
      if (key === 'programName' || key === 'partNo') {
        obj[key] = obj[key].toString();
      } else {
        obj[key] = Number(obj[key]);
      }
    }
  }
};

export const partPreProcessesArray = (arr: any) => {
  if (!Array.isArray(arr)) return [];

  const allFieldsEmpty = arr.every((obj: any) => {
    if (obj && typeof obj === 'object') {
      return Object.values(obj).every(
        (value) => value === '' || value === undefined
      );
    }
    return false;
  });

  if (allFieldsEmpty) return [];

  return arr.map((obj: any) => {
    const { preProcessName, functionName, ...rest } = obj;
    return rest;
  });
};

export const transformData = (data: any) => {
  const ensureArray = Array.isArray(data) ? data : [data];
  return ensureArray.map((part) => ({
    ...part,
    cellId: part.cellId ? part.cellId : 0,
    partOperations: part?.partOperations?.map((operation: any) => ({
      ...operation,
      drawingFile: operation?.drawingFile ? operation?.drawingFile : '',
    })),
    partOperationWorkCenters: part?.partOperationWorkCenters?.map(
      (workCenter: any) => ({
        ...workCenter,
        poWorkCenterId: 0,
        partOperationId: 0,
      })
    ),
    partPreProcesses: partPreProcessesArray(part?.partPreProcesses),
  }));
};

export const transformedData = (data: any) => {
  return data.map((item: any, index: any) => ({
    key: index + 1,
    ...item,
  }));
};

export const batchTransformData = (data: any, batchArray: any) => {
  const transformedShifts = data?.batchTimeSchedulingShifts?.map(
    (shift: any) => {
      const foundShift = batchArray?.batchTimeSchedulingShifts.find(
        (v: any) => v?.shiftName === shift?.shiftName
      );
      return {
        ...shift,
        shiftId: foundShift ? foundShift.shiftId : shift?.shiftId,
        startBeforeTime: Number(shift?.startBeforeTime),
      };
    }
  );

  return {
    ...data,
    schedulerId2: data.schedulerId2 === 0 ? null : data?.schedulerId2,
    isDelete: false,
    batchTimeSchedulingShifts: transformedShifts?.map(
      ({ shiftName, ...shift }) => shift
    ),
  };
};

const getTextFromLabel = (label: any): string => {
  if (typeof label === 'string') {
    return label;
  }
  if (label?.props?.children) {
    return getTextFromLabel(label.props.children);
  }
  return '';
};

export const searchMenu = (menuItems: any, term: string): any => {
  return menuItems
    .map((menuItem: any) => {
      const labelText = getTextFromLabel(menuItem.label);
      const titleMatch = labelText.toLowerCase().includes(term.toLowerCase());

      const childrenMatch = menuItem?.children
        ? searchMenu(menuItem.children as any, term)
        : [];

      if (titleMatch || (childrenMatch && childrenMatch.length > 0)) {
        return {
          ...menuItem,
          children:
            childrenMatch.length > 0 ? childrenMatch : menuItem.children,
        };
      }
      return null;
    })
    .filter(Boolean) as any;
};

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
export const validateNonNegativeInteger = (_:any, value:any) => {
  if (value === '') {
    return Promise.resolve(); // Allow empty value
  }
  const isInteger = /^\d+$/.test(value);
  const isNegative = /^-/.test(value);
  if (!isInteger || isNegative) {
    return Promise.reject(new Error('The value must be a positive whole number greater than zero.'));
  }
  return Promise.resolve();
};


export const dynamicMergeTime = (processTimes: any, times: any) => {
  if (!Array.isArray(processTimes) || processTimes.length === 0) {
    console.error('Invalid processTimes data');
    return []; // Return an empty array or handle the error as needed
  }

  const timeValues = processTimes[0]; // Access the first object in the array
  return times.map((time: any) => {
    return {
      ...time,
      value: timeValues[time?.name] || 0,
      seqNo : timeValues?.seqNo || 1
    };
  });
};


export const  partWiseTimeCreate = (processTimesArray:any,seqNo:any)=>
{
  const timeFields = [
    { name: 'fixtureSetupTime', display: 'Fixture Setup Time', status:false },
    { name: 'toolSetupTime', display: 'Tool Setup Time',status:false },
    { name: 'partLoadingTime', display: 'Part Loading Time',status:false },
    { name: 'cycleTime', display: 'Cycle Time',status:false },
    { name: 'partUnloadingTime', display: 'Part Unloading Time',status:false },
    { name: 'fixtureUnloadingTime', display: 'Fixture Unloading Time',status:false },
    { name: 'transitTime', display: 'Transit Time',status:false},
  ];

  const FilterTime = processTimesArray?.flatMap(({ seqNo, ...times }:any) => 
    timeFields
      .map(({ name, display }) => ({
        name,
        display,
        status: false,
        value: times[name],
        seqNo
      }))
      .filter(item => item?.value !== 0)
  );
  return FilterTime?.filter((item: any) => item?.seqNo === seqNo);

  

}