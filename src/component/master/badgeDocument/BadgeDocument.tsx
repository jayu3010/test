'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Upload,
  Popconfirm,
  Switch,
  Tag,
  Flex,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { openModal } from '@/utils/redux/features/reduxData';
import InputBox from '@/component/input/Input';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import SelectBox from '@/component/selectbox/selectbox';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import API_URL from '@/utils/apiUri';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const BadgeDocument = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [badgeDocumentId, setBadgeDocumentId] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const {
    updateData,
    addData,
    getItemById,
    getListData,
    listData,
  } = useFetchData(service?.API_URL?.badgeDocument.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.badgeDocumentFilter[0])}
          url={service?.API_URL?.badgeDocument?.listing}
          exportUrl={service?.API_URL?.badgeDocument?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Badge Name',
      dataIndex: 'hmiBadgeName',
      sorter: {
        compare: commonSorter('hmiBadgeName'),
        multiple: 3,
      },
    },
    {
      title: 'Document Name',
      dataIndex: 'docName',
      sorter: {
        compare: commonSorter('docName'),
        multiple: 3,
      },
    },
    {
      title: 'File',
      dataIndex: 'docName',
      render: (_, record: any) => (
        <DownloadOutlined onClick={() => handleDownload(record.badgeDocId)} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="badgeDocuments"
          idName="badgeDocId"
          idValue={record.badgeDocId}
          status={record.status}
          url={service?.API_URL?.badgeDocument.listing}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.badgeDocId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.badgeDocId} deleteUrl={service?.API_URL?.badgeDocument.listing} />
        </Flex>
      ),
    },
  ];

  const handleDownload = async (id: any) => {
    try {
      const editMachineRes = await axios({
        url: `${API_URL.base}${API_URL.badgeDocument.file}?badgeDocumentId=${id}`,
        method: 'GET',
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([editMachineRes.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'filename.ext');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('There was a problem with the download:', error);
    }
  };

  // const handleDownload = (base64: any, fileName: any, mimeType: any) => {
  //   const downloadUrl = generateDownloadUrl(base64, mimeType);
  //   const a = document.createElement('a');
  //   a.href = downloadUrl;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  function generateDownloadUrl(base64: any, mimeType: any) {
    const blob = base64ToBlob(base64, mimeType);
    return URL.createObjectURL(blob);
  }
  function base64ToBlob(base64: any, mimeType: any) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  }

  const handleEdit = async (id: any) => {
    try {
      setBadgeDocumentId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.badgeDocument.getbyid
      );
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes);
      } else {
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };
  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const formData: any = new FormData();
    formData.append('badgeId', data.badgeId);
    formData.append('badgeDocId', badgeDocumentId || 0);
    formData.append('file', imageUrl);
    formData.append('docName', data.docName);
    formData.append('status', data.status);
    formData.append('isDelete', false);
    const formDataCheck = true;
    if (badgeDocumentId) {
      const updateDataRes = await updateData(
        formData,
        service?.API_URL?.badgeDocument.update,
        formDataCheck
      );
      if (updateDataRes?.apiStatus) {
        setBadgeDocumentId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        formData,
        service?.API_URL?.badgeDocument.add,
        formDataCheck
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const getBase64 = (file, callback) => {
    setImageUrl(file);
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const beforeUpload = (file) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('You can only upload PDF files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must be smaller than 2MB!');
    }
    return isPdf && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file);

      // Get this URL from the response in the real world.
      getBase64(info.file.originFileObj, (fileUrl) => {
        setLoading(false);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const modalListing = async () => {
    const apiUrls = {
      hmiBadge: service?.API_URL?.hmiBadgeList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setBadgeDocumentId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Badge Document"
        exportUrl={service.API_URL.badgeDocument.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          badgeDocumentId ? 'Edit Badge Document' : 'Add Badge Document'
        }
        initialValues={{ status: true }}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SelectBox
              label="Badge"
              name="badgeId"
              keyField="hmiBadgeId"
              valueField="hmiBadgeName"
              mode={false}
              required
              selectOptions={listData?.hmiBadge}
              selectPlaceholder="Badge"
            />

            <Upload
              name="file"
              listType="picture-card"
              className="file-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>

            <InputBox
              label="Name of Document"
              name="docName"
              required
              inputPlaceholder="Name of Document"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <CommonSwitch
              label="Status"
              name="status"
              checkedChildren="Active"
              unCheckedChildren="InActive"
            />
          </div>
        }
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default BadgeDocument;
