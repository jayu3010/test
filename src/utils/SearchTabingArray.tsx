interface TabArrayProps {
  url?: string;
  type?: boolean;
  showTab?: boolean;
  tab?: string[]; // Added tab property to the interface
}

const TabArray: TabArrayProps[] = [
  {
    url: '/manage-work-center',
    type: false,
    showTab: true,
    tab: ['Active', 'Deactivated', 'Deleted'],
  },
  {
    url: '/manage-downtime-reason',
    type: false,
    showTab: true,
    tab: ['Active', 'Deactivated', 'Deleted'],
  },
  {
    url: '/manage-supervisor-group',
    type: false,
    showTab: true,
    tab: ['Active', 'Deactivated', 'Deleted'],
  },
  {
    url: '/future-plus-planning',
    type: false,
    showTab: true,
    tab: [
      'Order Wise Planning',
      'Cell Planning',
      'Cell Load Analysis',
      'Work Center Load Analysis',
      'Sub. Assm. Wise',
    ],
  },
  {
    url: '/operation-monitoring',
    type: false,
    showTab: true,
    tab: ['Operation Wise', 'Work Center Wise', 'Supervisor Wise'],
  },
  {
    url: '/operation-monitoring-work-center-wise',
    type: false,
    showTab: true,
    tab: ['Operation Wise', 'Work Center Wise', 'Supervisor Wise'],
  },
  {
    url: '/future-planning-simulator',
    type: false,
    showTab: true,
    tab: [
      'Order Wise Planning',
      'Cell Planning',
      'Cell Load Analysis',
      'Work Center Load Analysis',
      'Sub. Assm. Wise',
    ],
  },
  {
    url: '/machine-shop-planning',
    type: false,
    showTab: true,
    tab: [
      'Pending',
      'Running',
      'Completed',
      'Hold',
      'Cell',
      'Cell Load Analysis',
      'Work Center Load Analysis',
      'Queue',
      'Unplanned PO',
    ],
  },
  {
    url: '/future-load-balancer',
    type: false,
    showTab: false,
    tab: ['Pending', 'dfdffdfdfd', ''],
  },
];

export default TabArray;
