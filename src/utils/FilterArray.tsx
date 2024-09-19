const FilterArray = {
  unitMaster: [
    {
      name: 'city',
      displayName: 'City',
      type: 'text',
      placeholder: 'City',
    },
    {
      name: 'state',
      displayName: 'State',
      type: 'text',
      placeholder: 'State',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  machineshopofFilter: [
    {
      name: 'machineShopOfName',
      displayName: 'Machine Shop of',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  machineShop: [
    {
      displayName: 'Machine Shop Name',
      name: 'MachineShopName',
      type: 'text',
      placeholder: 'Machine Shop Name',
    },
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      api: 'unitList',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  machineLine: [
    {
      name: 'machineShopId',
      displayName: 'Machine Shop Name',
      keyField: 'machineShopId',
      valueField: 'machineShopName',
      type: 'selectbox',
      api: 'machineShop',
      placeholder: 'Select Machine Shop',
      options: [],
    },
    {
      name: 'lineName',
      displayName: 'Line Name',
      type: 'text',
      placeholder: 'Line Name',
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  manageMachineMake: [
    {
      displayName: 'Machine Make',
      name: 'machineMake',
      type: 'text',
      placeholder: 'Machine Make',
    },

    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  machineManageMainCategory: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      api: 'unitList',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  machineManageSubCategory: [
    {
      name: 'machineMainCategoryId',
      displayName: 'Main Category',
      type: 'selectbox',
      keyField: 'machineMainCategoryId',
      valueField: 'mainCategory',
      api: 'maincategories',
      placeholder: 'Select Main Category',
      options: [],
    },
    {
      name: 'subCategory',
      type: 'text',
      displayName: 'Sub Category',
      placeholder: 'Sub Category',
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  controllermasterFilter: [
    {
      name: 'machineControllerName',
      displayName: 'Machine controller name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'warrantyStatus',
      displayName: 'Warranty Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Yes',
        },
        {
          key: false,
          value: 'No',
        },
      ],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  palletmasterFilter: [
    {
      displayName: 'Pallet Name',
      name: 'palletName',
      type: 'text',
      placeholder: 'Pallet Name',
    },

    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  shiftmasterFilter: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  workCenter: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'machineShopId',
      displayName: 'Machine Shop',
      type: 'selectbox',
      keyField: 'machineShopId',
      valueField: 'machineShopName',
      api: 'machineShop',
      placeholder: 'Select Machine Shop',
      options: [],
    },
    {
      name: 'lineId',
      displayName: 'Line',
      type: 'selectbox',
      keyField: 'lineId',
      valueField: 'lineName',
      api: 'lineList',
      placeholder: 'Select Line',
      options: [],
    },
    {
      name: 'mainCategoryId',
      displayName: 'Main Category',
      type: 'selectbox',
      keyField: 'machineMainCategoryId',
      valueField: 'mainCategory',
      api: 'maincategories',
      placeholder: 'Select Main Category',
      options: [],
    },
    {
      name: 'workCenterTypeId',
      displayName: 'Work center Type',
      type: 'selectbox',
      keyField: 'workCenterTypeId',
      valueField: 'workCenterTypeName',
      api: 'workType',
      placeholder: 'Select Type',
      options: [],
    },
    {
      name: 'palletId',
      displayName: 'Pallet',
      type: 'selectbox',
      keyField: 'palletId',
      valueField: 'palletName',
      api: 'palletMaster',
      placeholder: 'Select Pallet',
      options: [],
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],

  manageMachine: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'machineShopId',
      displayName: 'Machine Shop',
      type: 'selectbox',
      keyField: 'machineShopId',
      valueField: 'machineShopName',
      api: 'machineShop',
      placeholder: 'Select Machine Shop',
      options: [],
    },
    {
      name: 'lineId',
      displayName: 'Line',
      api: 'lineList',
      type: 'selectbox',
      keyField: 'lineId',
      valueField: 'lineName',
      placeholder: 'Select Line',
      options: [],
    },

    {
      name: 'machineMakeId',
      displayName: 'Machine Make',
      type: 'selectbox',
      keyField: 'machineMakeId',
      valueField: 'machineMake',
      api: 'machineMake',
      placeholder: 'Select Machine Make',
      options: [],
    },
    {
      name: 'workCenterId',
      displayName: 'Work center',
      type: 'selectbox',
      keyField: 'workCenterId',
      valueField: 'workCenterName',
      api: 'manageworkcenter',
      placeholder: 'Select Work center',
      options: [],
    },
    {
      name: 'warranty',
      type: 'selectbox',
      displayName: 'Warranty',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select Warranty',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  manageCell: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'cellName',
      type: 'text',
      displayName: 'Cell Name',
      placeholder: 'Cell Name',
    },
    {
      name: 'workCenterId',
      displayName: 'Work center',
      type: 'selectbox',
      keyField: 'workCenterId',
      valueField: 'workCenterName',
      api: 'manageworkcenter',
      placeholder: 'Select Work center',
      options: [],
    },

    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  managedowntimecategory: [
    {
      displayName: 'Downtime Category',
      name: 'downtimeCategoryName',
      type: 'text',
      placeholder: 'Downtime Category',
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  manageDowntownReason: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      displayName: 'Downtime Reason',
      name: 'downtimeReason',
      type: 'text',
      placeholder: 'Downtime Reason',
    },
    {
      name: 'downtimeCategoryId',
      displayName: 'Downtime Category',
      type: 'selectbox',
      keyField: 'downtimeCategoryId',
      valueField: 'downtimeCategoryName',
      api: 'downTimeCategory',
      placeholder: 'Select Downtime Category',
      options: [],
    },

    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  ManageUnplannedProductionReason: [
    {
      name: 'reason',
      displayName: 'Unplanned Production Reason',
      type: 'text',
      placeholder: 'Unplanned Production Reason',
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  manageDispatch: [
    {
      name: 'locationName',
      displayName: 'Dispatch Name',
      type: 'text',
      placeholder: 'Dispatch Name',
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  manageDriver: [
    {
      name: 'empId',
      displayName: 'Employee Code',
      keyField: 'empId',
      valueField: 'empCode',
      api: 'employees',
      type: 'selectbox',
      placeholder: 'Employee Code',
      options: ['abc', 'ats'],
    },
    {
      name: 'driverName',
      displayName: 'Driver Name',
      type: 'text',
      placeholder: 'Driver Name',
    },

    {
      name: 'status',
      displayName: 'status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select Status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  vehicleFilter: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'vehicleName',
      displayName: 'Vehicle Name',
      type: 'text',
      placeholder: 'Vehicle Name',
    },
    {
      name: 'vehicleNumber',
      displayName: 'Vehicle Number',
      type: 'text',
      placeholder: 'Vehicle Number',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  breakManagementFilter: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'breakName',
      displayName: 'Break Name',
      type: 'text',
      placeholder: 'Break Name',
    },

    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],

  specialWorkingFilter: [
    {
      displayName: 'Day Name',
      name: 'dayName',
      type: 'text',
      placeholder: 'Day Name',
    },

    {
      displayName: 'Work Center',
      name: 'workCenterId',
      type: 'selectbox',
      api: 'manageworkcenter',
      keyField: 'workCenterId',
      valueField: 'workCenterName',
      placeholder: 'Select Work Center',
      options: [],
    },
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      api: 'unitList',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },

    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  holidayFilter: [
    {
      name: 'holidayName',
      displayName: 'Holiday Name',
      type: 'text',
      placeholder: 'Holiday Name',
    },
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      api: 'unitList',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'startDate',
      displayName: 'Start Date',
      type: 'date',
      placeholder: 'Select Date',
    },
    {
      name: 'endDate',
      displayName: 'End Date',
      type: 'date',
      placeholder: 'Select Date',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  manageweeklyoff: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      api: 'unitList',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'startDate',
      displayName: 'Start Date',
      type: 'date',
      placeholder: 'Select Start Date',
    },
    {
      name: 'endDate',
      displayName: 'End Date',
      type: 'date',
      placeholder: 'Select End Date',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  intermediateFilter: [
    {
      displayName: 'Process Name',
      name: 'processName',
      type: 'text',
      placeholder: 'Enter Process Name',
    },
    {
      displayName: 'Process Code',
      name: 'processCode',
      type: 'text',
      placeholder: 'Enter Process Name',
    },
    {
      name: 'materialCode',
      displayName: 'Material Code',
      type: 'selectbox',
      keyField: 'materialCode',
      api: 'materialsCode',
      valueField: 'materialName',
      placeholder: 'Select Material',
      options: [],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],

  materialCode: [
    {
      name: 'materialCode',
      displayName: 'Material Name',
      type: 'text',
      placeholder: 'Material Name',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  preProcessFilter: [
    // {
    //   name: 'description',
    //   type: 'text',
    //   displayName: 'Description',
    //   placeholder: 'Description',
    // },

    {
      name: 'procurementType',
      displayName: 'Procurement Type',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select Procurement Type',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: 'Process',
          value: 'Process',
        },
        {
          key: 'Inhouse',
          value: 'Inhouse',
        },
        {
          key: 'Purchase',
          value: 'Purchase',
        },
      ],
    },
    {
      name: 'materialId',
      displayName: 'Material',
      type: 'selectbox',
      keyField: 'materialId',
      api: 'materialsCode',
      valueField: 'materialCode',
      placeholder: 'Select Material',
      options: [],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  preFunctionFilter: [
    {
      name: 'functionName',
      type: 'text',
      displayName: 'Functions',
      placeholder: 'Functions',
    },
    {
      name: 'description',
      type: 'text',
      displayName: 'Description',
      placeholder: 'Description',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  dailyProductionMailFilter: [
    {
      name: 'planningType',
      displayName: 'Planning Type',
      type: 'text',
      placeholder: 'Planning Type',
    },
    {
      displayName: 'Mails',
      name: 'mails',
      type: 'text',
      placeholder: 'Mails',
    },
    {
      name: 'planningRunning',
      displayName: 'Planning Running',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select Planning Running',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  planningLogFilter: [
    {
      displayName: 'Planning Type',
      name: 'planningType',
      type: 'text',
      placeholder: 'Planning Type',
    },
    {
      name: 'doneById',
      displayName: 'Done By',
      type: 'text',
      placeholder: 'Done By',
    },
  ],
  hmiBudgeFilter: [
    {
      name: 'hmiBadge',
      displayName: 'Hmi Badge',
      type: 'text',
      placeholder: 'Hmi Badge',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  badgeDocumentFilter: [
    {
      name: 'badgeId',
      displayName: 'Badge',
      type: 'selectbox',
      keyField: 'hmiBadgeId',
      api: 'hmiBadgeList',
      valueField: 'hmiBadgeName',
      placeholder: 'Select Badge',
      options: [],
    },
    {
      name: 'docName',
      type: 'text',
      displayName: 'Name of Document',
      placeholder: 'Name of Document',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  supervisorGroupFilter: [
    {
      displayName: 'StatusSupervisor Group Name',
      name: 'supervisorGroupName',
      type: 'text',
      placeholder: 'Supervisor Group Name',
    },

    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],

  workcenterandcellmappingFilter: [
    {
      name: 'Cell Name',
      type: 'text',
      placeholder: 'Cell Name',
    },
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  workcenteranddowntimereasonmappingFilter: [
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    {
      name: 'Downtime Reason',
      type: 'text',
      placeholder: 'Downtime Reason',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],

  unitshiftandbreakmappingFilter: [
    {
      name: 'Unit',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'Shift Name',
      type: 'text',
      placeholder: 'Shift Name',
    },
    {
      name: 'Break Name',
      type: 'text',
      placeholder: 'Break Name',
    },
  ],

  unitandworkcentermappingFilter: [
    {
      name: 'Unit',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'Work Center',
      type: 'text',
      placeholder: 'Work Center',
    },
    // {
    //   name: 'status',
    //   type: 'selectbox',
    //   placeholder: 'Select status',
    //   options: ['Active', 'Inactive'],
    // },
  ],
  manageproductiondataFilter: [
    {
      name: 'HPriority',
      type: 'text',
      placeholder: 'HPriority',
    },
    {
      name: 'Order No.',
      type: 'text',
      placeholder: 'Order No.',
    },
    {
      name: 'Priority',
      type: 'text',
      placeholder: 'Priority',
    },
    {
      name: 'Part No.',
      type: 'text',
      placeholder: 'Part No.',
    },
    {
      name: 'Quantity',
      type: 'text',
      placeholder: 'Quantity',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  futureplusplanningFilter: [
    {
      name: 'Order No.',
      type: 'text',
      placeholder: 'Order No.',
    },
    {
      name: 'Part No',
      type: 'text',
      placeholder: 'Part No',
    },
    {
      name: 'Op. No',
      type: 'text',
      placeholder: 'Op. No',
    },
    {
      name: 'Start Time',
      type: 'time',
      placeholder: 'Start Time',
    },
    {
      name: 'End Time',
      type: 'time',
      placeholder: 'End Time',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  ordermaterailresourcepriorirtyFilter: [
    {
      name: 'Customer ID.',
      type: 'text',
      placeholder: 'Customer ID.',
    },
    {
      name: 'Order ID.',
      type: 'text',
      placeholder: 'Order ID.',
    },
  ],
  bomFilter: [
    {
      name: 'Part No.',
      type: 'text',
      placeholder: 'Part No',
    },
    {
      name: 'Part Name',
      type: 'text',
      placeholder: 'Part Name',
    },
    {
      name: 'Work Center',
      type: 'selectbox',
      placeholder: 'Work Center',
      options: ['Work 1', 'Work 2', 'Work 3'], // Example options
    },
    {
      name: 'Last Changed Date',
      type: 'selectbox',
      placeholder: 'Last Changed Date',
      options: [
        '2022-12-11 14:11:06',
        '2023-12-11 14:11:06',
        '2024-12-11 14:11:06',
      ], // Example options
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
    {
      name: 'Plan of',
      type: 'selectbox',
      placeholder: 'Select',
      options: ['Select 1', 'Select 2'],
    },
  ],
  machinePartsFilter: [
    {
      name: 'partNo',
      displayName: 'Part No.',
      type: 'text',
      placeholder: 'Part No.',
    },
    {
      name: 'partName',
      displayName: 'Part Name',
      type: 'text',
      placeholder: 'Part Name',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  machineshopplanning: [
    {
      name: 'poOrderNo',
      displayName: 'Order Number',
      type: 'text',
      placeholder: 'Order Number',
    },
    {
      name: 'partIds',
      displayName: 'Search By Part No./Part Name',
      type: 'text',
      placeholder: 'Part No./Part Name',
      showSearch: true,
    },
    {
      name: 'model',
      displayName: 'Model',
      type: 'selectbox',
      placeholder: 'Model',
      //  options: ['example'],  Example options
    },
    {
      name: 'subAssemblyCode',
      displayName: 'Sub Assm. Code',
      type: 'selectbox',
      placeholder: 'Sub Assm. Code',
      // options: ['Work 1', 'Work 2', 'Work 3'],  Example options
    },

    {
      name: 'Plan of',
      displayName: 'Plan of',
      type: 'selectbox',
      placeholder: 'Plan of',
      options: [
        {
          key: 'Machine Shop',
          value: 'Machine Shop',
        },
      ],
    },
    {
      name: 'startDate',
      displayName: 'Start Date',
      type: 'date',
      placeholder: 'Select Start Date',
    },
    {
      name: 'endDate',
      displayName: 'End Date',
      type: 'date',
      placeholder: 'Select End Date',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  operationmonitoringFilter: [
    {
      name: 'Date',
      type: 'date',
      placeholder: '04/06/2024',
    },
    {
      name: 'Supervisor',
      type: 'selectbox',
      placeholder: 'Select Supervisor',
      options: ['Supervisor 01', 'Supervisor 02', 'Supervisor 03'],
    },
    {
      name: 'Cell',
      type: 'selectbox',
      placeholder: 'Select cell',
      options: ['Cell 01', 'Cell 02', 'Cell 03'],
    },
    {
      name: 'Work center',
      type: 'text',
      placeholder: 'example',
    },
  ],
  futureplanningsimulatorFilter: [
    {
      name: 'Order No.',
      type: 'text',
      placeholder: 'Order No.',
    },
    {
      name: 'Part No. - Part Name',
      type: 'selectbox',
      placeholder: 'Search Part',
      options: ['Search Part 01', 'Search Part 02', 'Search Part 03'],
    },
    {
      name: 'Model',
      type: 'selectbox',
      placeholder: 'Search Model',
      options: ['Search Model 01', 'Search Model 02', 'Search Model 03'],
    },
    {
      name: 'Sub Assm. Code',
      type: 'selectbox',
      placeholder: 'example',
      options: ['example 01', 'example 02', 'example 03'],
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
    {
      name: 'Cell',
      type: 'selectbox',
      placeholder: 'Select cell',
      options: ['Cell 01', 'Cell 02', 'Cell 03'],
    },
  ],

  asstManagermaster: [
    {
      name: 'Asst.Manager Name',
      type: 'text',
      placeholder: 'Asst.Manager Name',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],

  documentType: [
    {
      name: 'documentTypeName',
      displayName: 'Document Type',
      type: 'text',
      placeholder: 'Document Type',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  workCenterTypeMaster: [
    {
      displayName: 'Work Center Type Master',
      name: 'workCenterTypeName',
      type: 'text',
      placeholder: 'Work Center Type Master',
    },
    {
      name: 'status',
      displayName: 'Status',
      type: 'selectbox',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Select status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
  downtimeReasonMappingWorkCenter: [
    {
      name: 'Downtime Reason Mapping Work Center',
      type: 'text',
      placeholder: 'Downtime Reason Mapping Work Center',
    },
    {
      name: 'Downtime Reason',
      type: 'text',
      placeholder: 'Downtime Reason',
    },
  ],
  breakWithWorkWorkCenter: [
    {
      name: 'Break With Work Center',
      type: 'text',
      placeholder: 'Break With Work Center',
    },
    {
      name: 'Shift',
      type: 'selectbox',
      placeholder: 'Select Shift',
      options: ['All', 'Pending', 'Accepted', 'Hold'],
    },
  ],

  manageEmployee: [
    {
      name: 'unitId',
      displayName: 'Unit',
      type: 'selectbox',
      keyField: 'unitId',
      valueField: 'unitName',
      api: 'unitList',
      placeholder: 'Select Unit',
      options: [],
    },
    {
      name: 'empType',
      type: 'selectbox',
      displayName: 'Emp Type',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'Emp Type',
      options: [
        {
          key: 'Supervisor',
          value: 'Supervisor',
        },
        {
          key: 'AssistantManager',
          value: 'AssistantManager',
        },
        {
          key: 'Operator',
          value: 'Operator',
        },
      ],
    },
    {
      name: 'status',
      type: 'selectbox',
      displayName: 'Status',
      keyField: 'key',
      valueField: 'value',
      placeholder: 'status',
      options: [
        {
          key: '',
          value: 'ALL',
        },
        {
          key: true,
          value: 'Active',
        },
        {
          key: false,
          value: 'InActive',
        },
      ],
    },
  ],
};

export default FilterArray;
