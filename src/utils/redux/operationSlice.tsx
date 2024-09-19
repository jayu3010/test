import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OperationState {
  activeOperation: number | null;
  isPaused: boolean;
  sequences: string[];  // List of sequence names or IDs
}

const initialState: OperationState = {
  activeOperation: null,  // Start with no active operation
  isPaused: false,
  sequences: [],  // Fill this with the correct sequence array
};

const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    startOperation: (state, action: PayloadAction<number>) => {
      state.activeOperation = action.payload;
      state.isPaused = false;
    },
    pauseOperation: (state) => {
      state.isPaused = true;
    },
    stopOperation: (state) => {
      state.activeOperation = null;  // Reset when operation stops
      state.isPaused = false;
    },
    moveToNextOperation: (state) => {
      if (state.activeOperation !== null && state.activeOperation + 1 < state.sequences.length) {
        state.activeOperation += 1;
        state.isPaused = false;
      } else {
        state.activeOperation = null;  // No more sequences, reset
      }
    },
    setSequences: (state, action: PayloadAction<string[]>) => {
      state.sequences = action.payload;
    }
  },
});

export const {
  startOperation,
  pauseOperation,
  stopOperation,
  moveToNextOperation,
  setSequences,
} = operationSlice.actions;

export default operationSlice.reducer;
