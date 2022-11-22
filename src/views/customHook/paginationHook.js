import React, { useState } from 'react'

function usePagination(data, pageRange, currentPage) {
  function currentData() {
    const begin = (currentPage - 1) * pageRange
    const end = begin + pageRange
    return data.slice(begin, end)
  }
  return { currentData }
}

export default usePagination
