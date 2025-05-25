import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ currentPage, totalPages, prevPage, nextPage }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        shape="rounded"
        onChange={(event, page) => {
          if (page < currentPage) {
            prevPage();
          } else if (page > currentPage) {
            nextPage();
          }
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
