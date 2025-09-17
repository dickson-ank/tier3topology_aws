// src/components/Step.jsx
function Step({ title, text, onNext, onPrev, isFirst, isLast }) {
  return (
    <section id="steps" className="py-12">
      <h2 className="text-2xl font-semibold text-[#008080] mb-4">{title}</h2>
      <p className="mb-6">{text}</p>
      <div className="flex justify-between">
        {!isFirst && (
          <button
            onClick={onPrev}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {!isLast && (
          <button
            onClick={onNext}
            className="ml-auto px-4 py-2 bg-[#008080] text-white rounded hover:bg-teal-700"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}

export default Step;
