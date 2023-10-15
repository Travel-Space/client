import * as S from "./index.styled";

export default function DeclarationModal({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <S.Background>
      <S.Container>
        <S.Top>
          <img src="/assets/img/icons/declaration.svg" />
          <span>게시글 신고하기</span>
        </S.Top>

        <S.Middle>
          <S.Description>
            <span>신고 내용</span>
            <textarea placeholder="신고 내용을 입력해 주세요." maxLength={"200"} />
          </S.Description>

          {title !== "채팅" && (
            <S.Reason>
              <span>신고 사유</span>
              <select>
                <option value="" selected>
                  신고 사유를 선택해 주세요.
                </option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
            </S.Reason>
          )}

          <S.Picture>
            <span>신고 사진</span>
            <S.File>
              <input readOnly placeholder="파일을 업로드해 주세요." />
              <S.ImgButton for="file">사진 첨부</S.ImgButton>
              <input accept="image/*" type="file" id="file" />
            </S.File>
          </S.Picture>
        </S.Middle>

        <S.Bottom>
          <S.CancelBtn>취소</S.CancelBtn>
          <S.CheckBtn>확인</S.CheckBtn>
        </S.Bottom>
      </S.Container>
    </S.Background>
  );
}
