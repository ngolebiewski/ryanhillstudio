// Dev note for org: could create a UTIL component for this if there are more helper functions

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const DateFormatter = ({ dateString }) => {
  const formattedDate = formatDate(dateString);

  return (
    <>
    { formattedDate }
    </>
  );
};

export default DateFormatter;
