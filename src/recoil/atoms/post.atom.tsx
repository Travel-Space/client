import { Posting } from '@/@types';
import { atom, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist();


export const postState = atom<Posting>({
  key: 'post',
  default: {} as Posting, 
  effects_UNSTABLE: [persistAtom],
});

export const updateCommentState = selectorFamily({
  key: 'updateCommentState',
  get: (articleId: number) => ({ get }) => {
    const post = get(postState);
    return post.comments.filter(comment => comment.articleId === articleId);
  },

});