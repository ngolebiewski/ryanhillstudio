const Spinner = ({ size = '8', color = 'gray-800', ariaLabel = 'Loading' }) => {
  return (
    <div className="flex items-center justify-center mt-4 relative">
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent border-solid rounded-full animate-spin`}
        aria-label={ariaLabel}
        role="status" // Indicates a loading state
      ></div>
      <span className="sr-only">{ariaLabel}</span> {/* Visually hidden text */}
    </div>
  );
};

export default Spinner;

/////////////////
// Usage example:
/////////////////

// import Spinner from './Spinner';

// const YourComponent = () => {
//   return (
//     <div>
//       {/* Other content */}
//       <Spinner size="12" color="blue-500" ariaLabel="Loading images..." />
//       {/* Other content */}
//     </div>
//   );
// };

// export default YourComponent;
