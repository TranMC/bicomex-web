import { useState, useEffect } from 'react';

/**
 * Custom hook để lưu trữ và đồng bộ state với localStorage
 * @param {string} key - Khóa để lưu trong localStorage
 * @param {any} initialValue - Giá trị ban đầu nếu không có dữ liệu trong localStorage
 * @returns {Array} - [storedValue, setValue] tương tự useState
 */
const useLocalStorage = (key, initialValue) => {
  // Khởi tạo state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Lấy từ localStorage theo key
      const item = localStorage.getItem(key);
      // Parse dữ liệu JSON hoặc trả về initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Cập nhật localStorage khi state thay đổi
  useEffect(() => {
    try {
      // Lưu state vào localStorage
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;