"use client";

import { useState } from "react";
import Modal from "./Modal";
import styles from "./MessageMapModal.module.scss";

export default function MessageMapModal({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    console.log("문자 발송:", cleanPhoneNumber);
    // 실제 문자 발송 API 호출
    alert("약도가 발송되었습니다.");
    onClose();
  };

  return (
    <Modal onClose={onClose} title="문자로 약도받기" size="small">
      <div className={styles.messageMapModal}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="phoneNumber" className={styles.label}>
              휴대폰번호
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className={styles.input}
              placeholder="연락처를 입력해주세요"
              value={phoneNumber}
              onChange={handlePhoneInput}
              maxLength={11}
              inputMode="numeric"
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>
              약도 전송하기
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
