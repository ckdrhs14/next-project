"use client";

import Modal from "./Modal";
import styles from "./CostConsultationModal.module.scss";

export default function CostConsultationModal({ onClose }) {
  return (
    <Modal onClose={onClose} title="개인정보수집・이용에 관한 내용">
      <div className={styles.costConsultationModal}>
        <div className={styles.content}>
          <h3 className={styles.subTitle}>&lt; 밝은성모안과 &gt;(이하 ‘병원’)는 고객의 비용 상담 서비스 이용을 위해 다음과 같이 고객의 정보를 수집 및 이용합니다.</h3>

          <ul className={styles.list}>
            <li>1. 개인정보 수집/이용목적 - 비용 상담 등록 및 안내 등</li>
            <li>2. 수집하는 개인정보의 항목 - 이름, 연락처</li>
            <li>3. 개인정보의 보유/이용기간<br />
              <p>수집된 개인정보는 원칙적으로 상담등록 후 목적 달성 시 지체 없이 파기합니다. 단, 소비자 불만/분쟁 처리 기록의 경우 전자상거래 등에서의 소비자 보호에 관한 법률에 의하여 3년 동안 정보를 보관합니다.</p>
            </li>
          </ul>

          <p className={styles.text} style={{ marginTop: '3rem' }}>병원의 개인정보수집 및 이용에 대한 동의를 거부할 수 있으며, 동의 거부시 비용상담 서비스를 이용할 수 없습니다.</p>
        </div>
      </div>
    </Modal>
  );
}
