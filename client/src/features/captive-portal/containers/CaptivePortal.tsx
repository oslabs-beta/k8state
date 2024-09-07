import * as React from 'react';
import Stack from '@mui/material/Stack';

import CaptiveForm from "../components/CaptiveForm";
import CaptiveFormContent from "../components/CaptiveFormContent"

export default function CaptivePortal() {

    return(
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <CaptiveFormContent/>
        <CaptiveForm/>
      </Stack>
    );
}

