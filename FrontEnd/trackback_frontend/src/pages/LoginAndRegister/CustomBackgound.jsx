import React from 'react';
import { Box } from '@mui/material';

function CustomBackground({ children }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background circle */}
      <Box
        sx={{
          width: 400,
          height: 400,
          background: `linear-gradient(135deg, #6a1b9a, #8e24aa)`,
          borderRadius: '50%',
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          zIndex: 0,
        }}
      />
      
      {/* Login content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export default CustomBackground;
