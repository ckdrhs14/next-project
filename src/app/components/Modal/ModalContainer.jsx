"use client";

import { useModalContext } from "@/app/contexts/ModalContext";
import MessageMapModal from "./MessageMapModal";
import CostConsultationModal from "./CostConsultationModal";

// 모달 이름 키
const modalComponents = {
  messageMap: MessageMapModal,
  costConsultation: CostConsultationModal,
};

export default function ModalContainer() {
  const { openModal, closeModal } = useModalContext();

  if (!openModal) return null;

  const ModalComponent = modalComponents[openModal];

  if (!ModalComponent) {
    return null;
  }

  return <ModalComponent onClose={closeModal} />;
}
