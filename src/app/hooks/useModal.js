import { useModalContext } from '@/app/contexts/ModalContext';

/**
 * 모달 관리를 위한 커스텀 훅 (Context 사용)
 * @returns {[string | null, (modalName: string) => void, () => void]}
 *   [현재 열린 모달 이름, 모달 열기 함수, 모달 닫기 함수]
 */
function useModal() {
  const { openModal, openModalHandler, closeModal } = useModalContext();
  return [openModal, openModalHandler, closeModal];
}

export default useModal;
