"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [openModal, setOpenModal] = useState(null);

  const openModalHandler = useCallback((modalName) => {
    setOpenModal(modalName);
    // 기존 window 함수들도 호출 (하위 호환성)
    if (typeof window !== "undefined") {
      if (window.openOverModal) {
        window.openOverModal(modalName);
      }
      if (window.openModal) {
        window.openModal(modalName);
      }
    }
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, openModalHandler, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
}
