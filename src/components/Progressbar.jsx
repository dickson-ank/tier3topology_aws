// src/components/ProgressBar.jsx
function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;
  return (
    <div className="w-full bg-gray-300 h-2">
      <div
        className="bg-[#CC7722] h-2 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
