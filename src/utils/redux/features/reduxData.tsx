import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface ReduxStateData {
  reduxData: any;
  isModalOpen: boolean;
  isConfirmation: boolean;
  modals: {};
  filterData: any;
  exportFilterData: any;
  tableData: any;
  pagination: any;
  activeSequenceIndex:any
  isPaused:boolean
}

// Define the initial state
const initialState: ReduxStateData = {
  reduxData: {},
  isConfirmation: false,
  isModalOpen: false, // New state for modal open/close
  modals: {},
  filterData: [],
  exportFilterData: [],
  tableData: [],
  pagination: [],
  activeSequenceIndex: 0,
  isPaused: false,
};

// Create the sign up slice
const reduxDataSlice = createSlice({
  name: 'reduxData',
  initialState,
  reducers: {
    // Action to add sign up data
    reduxSliceData: (
      state,
      action: PayloadAction<{ key: string; data: any; id?: any }>
    ) => {
      state.reduxData[action.payload.key] = action.payload.data;
    },
    clearAll: () => initialState,
    openModal: (state) => {
      state.isModalOpen = true;
    },
    confirmationOpen: (state) => {
      state.isConfirmation = true;
    },
    confirmationClose: (state) => {
      state.isConfirmation = false;
    },
    // Action to close the modal
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    filterData: (state, action) => {
      state.filterData = action.payload;
    },
    pagination: (state, action) => {
      state.pagination = action.payload;
    },

    exportFilterData: (state, action) => {
      state.exportFilterData = action.payload;
    },
    tableData: (state, action) => {
      state.tableData = action.payload;
    },
    addOpenModal: (state: any, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    // Action to close a specific modal
    addCloseModal: (state: any, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
    setActiveSequenceIndex(state, action: PayloadAction<number>) {
      state.activeSequenceIndex = action.payload;
    },
    setIsPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  reduxSliceData,
  clearAll,
  openModal,
  closeModal,
  addOpenModal,
  addCloseModal,
  confirmationOpen,
  confirmationClose,
  filterData,
  exportFilterData,
  tableData,
  pagination,
  setActiveSequenceIndex, setIsPaused
} = reduxDataSlice.actions;
export default reduxDataSlice.reducer;
