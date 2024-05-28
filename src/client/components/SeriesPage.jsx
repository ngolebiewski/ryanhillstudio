const SeriesPage = ({ seriesFocus }) => {
  console.log(`series page focus: ${seriesFocus}`)
  return (
    <>
      <h1>This is the SERIES PAGE.<br />
        {seriesFocus}
      </h1>
    </>
  )
}

export default SeriesPage;