import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 검색된 행성 목록을 위한 atom
export const planetListState = atom({
  key: 'planetListState',
  default: [], 
  effects_UNSTABLE: [persistAtom], 
});