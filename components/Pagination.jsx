const Pagination = ({ setPage, page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage)
  }
  return (
    <section class="container mx-auto flex justify-center items-center my-8">
      <button onClick={() => handleChangePage(page - 1)} class="mr-2 px-2 py-1 border border-gray-300 rounded">
        Previous
      </button>
      <span class="mx-2"> Page {page} of {totalPages} </span>
      <button onClick={() => handleChangePage(page + 1)} class="ml-2 px-2 py-1 border border-gray-300 rounded">
        Next
      </button>
    </section>
  )
}

export default Pagination