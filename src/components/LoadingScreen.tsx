export default function LoadingScreen() {
  return (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-coal text-ivory">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-brass border-t-transparent" />
        <p className="text-sm uppercase tracking-[0.24em] text-brass">
          Đang tải bảo tàng 3D
        </p>
      </div>
    </div>
  );
}
