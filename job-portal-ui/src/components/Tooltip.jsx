const Tooltip = ({ content, children }) => {
  return (
    <span className="relative group inline-block">
      {children}
      <span
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 rounded-xl shadow-lg border border-gray-700 bg-gray-800 text-gray-200 text-xs leading-relaxed opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 z-20"
      >
        {content}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-800 border-b border-r border-gray-700 rotate-45" />
      </span>
    </span>
  );
};

export default Tooltip;
