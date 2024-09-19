import service from '../service/service';

export const filterOptiondata = {
  unitMaster: [
    {
      name: 'unitMaster',
    },
  ],
  machineShop: [
    {
      name: 'machineShop',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  machineShopOf: [
    {
      name: 'machineshopofFilter',
    },
  ],
  machineLine: [
    {
      name: 'machineLine',
      id: ['machineShopId'],
      machineShop: service?.API_URL?.machineShop?.listing,
    },
  ],
  manageMachineMake: [
    {
      name: 'manageMachineMake',
    },
  ],
  machineManageMainCategory: [
    {
      name: 'machineManageMainCategory',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  machineManageSubCategory: [
    {
      name: 'machineManageSubCategory',
      id: ['machineMainCategoryId'],
      maincategories: service?.API_URL?.maincategories?.listing,
    },
  ],
  controllermasterFilter: [
    {
      name: 'controllermasterFilter',
    },
  ],
  palletmasterFilter: [
    {
      name: 'palletmasterFilter',
    },
  ],
  shiftmasterFilter: [
    {
      name: 'shiftmasterFilter',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  breakManagementFilter: [
    {
      name: 'breakManagementFilter',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  workCenterTypeMaster: [
    {
      name: 'workCenterTypeMaster',
    },
  ],
  workCenter: [
    {
      name: 'workCenter',
      id: [
        'unitId',
        'palletId',
        'machineShopId',
        'lineId',
        'workCenterTypeId',
        'mainCategoryId',
      ],
      maincategories: service?.API_URL?.maincategories?.listing,
      unitList: service?.API_URL?.unitList?.listing,
      lineList: service?.API_URL?.lineList?.listing,
      machineShop: service?.API_URL?.machineShop?.listing,
      workType: service?.API_URL?.workType?.listing,
      palletMaster: service?.API_URL?.palletMaster.listing,
    },
  ],
  manageMachine: [
    {
      name: 'manageMachine',
      id: [
        'machineShopId',
        'unitId',
        'lineId',
        'workCenterId',
        'machineMakeId',
      ],
      machineShop: service?.API_URL?.machineShop?.listing,
      unitList: service?.API_URL?.unitList?.listing,
      lineList: service?.API_URL?.lineList?.listing,
      manageworkcenter: service?.API_URL?.manageworkcenter?.listing,
      machineMake: service?.API_URL?.machineMake?.listing,
    },
  ],
  manageCell: [
    {
      name: 'manageCell',
      id: ['workCenterId', 'unitId'],
      manageworkcenter: service?.API_URL?.manageworkcenter?.listing,
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  managedowntimecategory: [
    {
      name: 'managedowntimecategory',
    },
  ],
  manageDowntownReason: [
    {
      name: 'manageDowntownReason',
      id: ['downtimeCategoryId', 'unitId'],
      downTimeCategory: service?.API_URL?.downTimeCategory?.listing,
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  holidayFilter: [
    {
      name: 'holidayFilter',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  manageweeklyoff: [
    {
      name: 'manageweeklyoff',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  specialWorkingFilter: [
    {
      name: 'specialWorkingFilter',
      id: ['unitId', 'workCenterId'],
      unitList: service?.API_URL?.unitList?.listing,
      manageworkcenter: service?.API_URL?.manageworkcenter?.listing,
    },
  ],
  supervisorGroupFilter: [
    {
      name: 'supervisorGroupFilter',
    },
  ],
  hmiBudgeFilter: [
    {
      name: 'hmiBudgeFilter',
    },
  ],
  ManageUnplannedProductionReason: [
    {
      name: 'ManageUnplannedProductionReason',
    },
  ],
  materialCode: [
    {
      name: 'materialCode',
    },
  ],
  manageDispatch: [
    {
      name: 'manageDispatch',
    },
  ],
  manageDriver: [
    {
      name: 'manageDriver',
      id: ['empId'],
      employees: service?.API_URL?.employees?.listing,
    },
  ],

  vehicleFilter: [
    {
      name: 'vehicleFilter',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
  intermediateFilter: [
    {
      name: 'intermediateFilter',
      id: ['materialCode'],
      materialsCode: service?.API_URL?.materialsCode?.listing,
    },
  ],
  preProcessFilter: [
    {
      name: 'preProcessFilter',
      id: ['materialId'],
      materialsCode: service?.API_URL?.materialsCode?.listing,
    },
  ],
  badgeDocumentFilter: [
    {
      name: 'badgeDocumentFilter',
      id: ['badgeId'],
      hmiBadgeList: service?.API_URL?.hmiBadgeList?.listing,
    },
  ],
  preFunctionFilter: [
    {
      name: 'preFunctionFilter',
    },
  ],
  dailyProductionMailFilter: [
    {
      name: 'dailyProductionMailFilter',
    },
  ],
  documentType: [
    {
      name: 'documentType',
    },
  ],
  planningLogFilter: [
    {
      name: 'planningLogFilter',
    },
  ],
  machinePartsFilter: [
    {
      name: 'machinePartsFilter',
    },
  ],

  machineshopplanning: [
    {
      name: 'machineshopplanning',
    },
  ],
  manageEmployee: [
    {
      name: 'manageEmployee',
      id: ['unitId'],
      unitList: service?.API_URL?.unitList?.listing,
    },
  ],
};
