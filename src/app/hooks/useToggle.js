import { useState, useCallback } from 'react';

/**
 * 불리언 상태를 관리하고 토글/설정 함수를 제공하는 커스텀 훅
 * @param {boolean} initialState - 초기 상태 (기본값: false)
 * @returns {[boolean, () => void, () => void, () => void, (value: boolean) => void]}
 *   [현재 상태, 토글 함수, true로 설정하는 함수, false로 설정하는 함수, 특정 값으로 설정하는 함수]
 */

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(prev => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  const setValue = useCallback((value) => setState(!!value), []); // value가 반드시 boolean이도록 강제

  return [state, toggle, setTrue, setFalse, setValue];
}

export default useToggle;