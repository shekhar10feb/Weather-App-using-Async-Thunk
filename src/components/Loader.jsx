export default function Loader() {
  return (
    <div className="flex items-center justify-center h-20">
      <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-3 text-blue-600">Loading weather...</p>
    </div>
  );
}
