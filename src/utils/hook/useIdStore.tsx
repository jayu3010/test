import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

function useIdStore() {
  const [storedId, setStoredId] = useState(null);
  const openAddModal = useSelector((state: any) => state.isModalOpen);

  // Handler to store the ID
  const storeId = useCallback((id: any) => {
    setStoredId(id);
  }, []);

  // Handler to remove the stored ID on click
  const removeId = useCallback(() => {
    setStoredId(null);
  }, []);

  useEffect(() => {
    if (!openAddModal) {
      const timeoutId = setTimeout(() => {
        removeId();
      }, 1000); // Set the delay to 5 seconds (5000 ms)
  
      // Clean up the timeout if the modal reopens before the timeout finishes
      return () => clearTimeout(timeoutId);    }
  }, [openAddModal]);

  return {
    storedId,
    storeId,
    removeId,
  };
}

export default useIdStore;
