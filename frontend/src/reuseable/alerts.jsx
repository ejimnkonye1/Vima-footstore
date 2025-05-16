import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
export default function ColorAlerts() {
  return (
    <div className='fixed-top'>
      <Stack className='stack' sx={{ width: '30%', justifyContent: 'flex-end', marginLeft: 'auto' }} spacing={2}>
        <Alert 
        
        variant="filled" severity="success" className='mt-4'>
        Item has been added to the cart.
        <LinearProgress   color="inherit"/>

        </Alert>
      </Stack>
    </div>
  );
}
