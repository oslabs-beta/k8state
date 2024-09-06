import type React from "react";
import { useState } from "react";
import { useAppDispatch } from '../../../app/hooks';
import { setAddress, setKey } from '../captivePortalSlice';
import { TextField, Button } from "@mui/material";
import { Navigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


export default function CaptiveForm() {
  const dispatch = useAppDispatch()
  const [dest, setDest] = useState('');
  const [bearer, setBearer] = useState('');
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState('');
  
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      fetch("http://localhost:8080/api/checkAPI", {
          method: 'POST',
          body: JSON.stringify({
              key: bearer,
              address: dest
          }),
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(response => response.json())
      .then(data => {
          if(data.message !== 'ok'){
              setError(JSON.stringify(data));
          }
          else{
              setSubmit(true);
              dispatch(setAddress(dest));
              dispatch(setKey(bearer));
          }
      })
  };

  
  const invalidKeyError = <p>The URL of the Bearer Token entered is invalid. </p>
  
    
    
  
  
  if(submit === true){
      return <Navigate to="/clusterui"/>
  }



  return(
      <>
      <form onSubmit={submitHandler}> {/* Form wrapper with submit handler */}
    <Stack
      direction={{ xs: 'column-reverse', md: 'row' }}
      sx={{
        justifyContent: 'center',
        gap: { xs: 6, sm: 12 },
        p: 2,
        m: 'auto',
      }}
    >
      <Card variant="outlined">
        {/* <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Input Cluster Credentials
        </Typography> */}

        <FormControl>
          <FormLabel htmlFor="ip_or_url">IP Address or URL</FormLabel>
          <TextField
            id="ip_or_url"
            type="url"
            name="ip_or_url"
            placeholder="http://192.168.1.1 or http://yourURL.com"
            onChange={(input) => setDest(input.target.value)}
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!error}
            sx={{ ariaLabel: 'ip_or_url' }}
          />
        </FormControl>

        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="bearer_token">Bearer Token</FormLabel>
          </Box>
          <TextField
            name="bearer_token"
            placeholder="Bearer Token"
            type="text"
            id="password"
            required
            fullWidth
            variant="outlined"
            error={!!error}
            onChange={(input) => setBearer(input.target.value)}
          />
        </FormControl>

        <Button 
          type="submit" 
          fullWidth 
          variant="contained"
          color="error"
        >
          View Cluster
        </Button>
          {error && invalidKeyError}
      </Card>
    </Stack>
  </form>
      </>
  );
}