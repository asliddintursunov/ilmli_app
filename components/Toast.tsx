type Params = {
  toastInfo: string;
  toastType: string;
};

function Toast({ toastInfo, toastType }: Params) {
  return (
    <div className="toast toast-top toast-end mt-20 z-50">
      <div className={`alert ${toastType}`}>
        <span className="text-white">{toastInfo}</span>
      </div>
    </div>
  );
}

export default Toast;
