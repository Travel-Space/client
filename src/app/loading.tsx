export default function Loading() {
  return (
    <div
      style={{
        width: "100vw",
        position: "fixed",
        height: "100vh",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <img src="/assets/img/icons/loadingbar.gif" alt="로딩 아이콘" />
        </div>
      </div>
    </div>
  );
}
