const formatDate = (dateString) => {
  console.log(dateString)
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
