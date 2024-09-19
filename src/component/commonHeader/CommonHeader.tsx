'use client'
import { Button, Dropdown, Flex, message, } from 'antd'
import React, { useState } from 'react'
import BreadcrumbMain from '../breadcrumbMain/breadcrumbMain'
import { useDispatch, useSelector } from 'react-redux'
import { addOpenModal, openModal } from '@/utils/redux/features/reduxData'
import { addIcon, historyIcon, exportIcon } from '@/utils/icons/icons'
import { usePathname } from 'next/navigation'
import useFetchData from '@/utils/useFetchData/customFetchData'
import { DownOutlined } from '@ant-design/icons'
import ImportFormatButton from './ImportFormatButton'

interface MachineShopTableProps {
  title?: string;
  addBtnTitle?: string;
  breadCum?: string;
  exportUrl?: string

}
const CommonHeader: React.FC<MachineShopTableProps> = ({ addBtnTitle, breadCum, exportUrl }: any) => {
  const pathname = usePathname();
  const dispatch = useDispatch()
  const exportFilterData = useSelector((state: any) => state.exportFilterData)
  const filterData = useSelector((state: any) => state.filterData)

  const { getExport } = useFetchData();
  const [buttonLabel, setButtonLabel] = useState('Add PO to Queue'); // Default label
  const [exportButtonLabel, setExportButtonLabel] = useState('XLSX'); // Default label

  const showDrawer = () => {
    dispatch(openModal())
  };
  const handleMenuClick = (label, action) => {
    setButtonLabel(label);
    handleDropDownModal(action);
  };

  const handleDropDownModal = (name) => {
    dispatch(addOpenModal(name));
  };
 
  const items = [
    {
      label: 'Add PO to Queue',
      key: '1',
      icon: addIcon,
      onClick: () => handleMenuClick('Add PO to Queue', 'addPOtoQueue'),
    },

    {
      label: 'Add Bulk PO',
      key: '2',
      icon: addIcon,
      onClick: () => handleMenuClick('Add Bulk PO', 'addBulkPO'),
    },
    {
      label: 'Add Unplanned PO',
      key: '3',
      icon: addIcon,
      onClick: () => handleMenuClick('Add Unplanned PO', 'addUnplannedPO'),
    },
    {
      label: 'Add Bulk unplanned PO',
      key: '4',
      icon: addIcon,
      onClick: () => handleMenuClick('Add Bulk unplanned PO', 'addBulkUnplannedPO'),
    },
    // {
    //   label: 'Update Qty./ Priority',
    //   key: '4',
    //   icon: addIcon,
    //   onClick: () => handleMenuClick('Update Qty./ Priority', 'updateQtyPriority'),
    // },

    // {
    //   label: 'Add Cell Planned PO',
    //   key: '6',
    //   icon: addIcon,
    //   onClick: () => handleMenuClick('Add Cell Planned PO', 'addCellPlannedPO'),
    // },
  ];
  const menuProps = {
    items,
  };
  const handleExport = async (label: string, type: string) => {
    try {
      setExportButtonLabel(label);
      if(filterData?.length>0){
        let requestData: any = { exportOption: type };
        if (exportFilterData && (Array.isArray(exportFilterData) ? exportFilterData.length > 0 : Object.keys(exportFilterData).length > 0)) {
          requestData = {
            ...requestData,
            ...exportFilterData
          };
        }
        const exportRes: any = await getExport(exportUrl, requestData);
        if (type === 'xlsx') {
          const currentDate = new Date();
          const day = String(currentDate.getDate()).padStart(2, '0');
          const month = currentDate.toLocaleString('default', { month: 'short' });
          const year = currentDate.getFullYear();
          const formattedDate = `${day}-${month}-${year}.xlsx`;
          const url = window.URL.createObjectURL(new Blob([exportRes?.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', formattedDate);
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
        else {
          const blob = new Blob([exportRes?.data], { type: 'text/csv' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'exported-data.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }else{
        message.error('There is no data to export.')
      }
    } catch (error) {
      console.error('There was a problem with the download:', error);
    }
  }

  const exportItems = [
    {
      label: 'XLSX',
      key: 'xlsx',
      onClick: () => handleExport('XLSX', 'xlsx'),

    },
    {
      label: 'CSV',
      key: 'csv',
      onClick: () => handleExport('CSV', 'csv'),
    },
  ];
  return (
    <>

      <Flex wrap className='gap-4 items-center justify-between'>
        <BreadcrumbMain breadCum={breadCum} />
        <div className='block-main__top-right pb-5'>
          {pathname === '/machine-shop-planning'?
            <>
              <div className='block-right-btns flex'>
                <Dropdown.Button menu={menuProps} className="queue-btn">
                  {addIcon} {buttonLabel}
                </Dropdown.Button>
                <Button className='history-btn'>{historyIcon}Unplanned History</Button>
              </div>
            </>
            :
            <> 
              {
                  (pathname !== '/hmi-production' && pathname !==  '/role-permission' && pathname !==  '/user-permission' && pathname !==  '/user-and-role-management' && pathname !==  '/fields-management')?
                    <Flex wrap className='gap-4 '>
                    <ImportFormatButton pathname={pathname} />
                    <div className='flex export-dp-btn'>
                    <Dropdown.Button
                      icon={<DownOutlined />}
                      menu={{ items: exportItems }}
                      className="btn-outline"
                      onClick={() => handleExport(exportButtonLabel, exportButtonLabel.toLowerCase())} // Trigger export with current label when the button is clicked
                    >
                    {exportIcon} {exportButtonLabel}
                    </Dropdown.Button>
                    </div>
                    {/* <Button icon={exportIcon} className='btn-outline'> Export CSV </Button> */}

                    {
                      addBtnTitle &&
                      <Button type="primary" onClick={showDrawer} className='btn-main'>{addIcon} {addBtnTitle} </Button>
                    }
                  </Flex> : ''
              }
            
            </>
            
          }

        </div>
      </Flex>
    </>
  )
}

export default CommonHeader