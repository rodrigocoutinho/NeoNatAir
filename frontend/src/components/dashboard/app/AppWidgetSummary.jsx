import React from 'react';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../formatNumber';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));



// ----------------------------------------------------------------------

const colors  = 
{
  "temp_1": {
    bgcolor : "rgb(209,233,252)",
    color: "rgb(6, 27, 100)"
    },
  "temp_2": {
    bgcolor : "rgb(208, 242, 255)",
    color: "rgb(4, 41, 122)"
    },
  "temp_3": {
    bgcolor : "rgb(255, 247, 205)",
    color: "rgb(122, 79, 1)"
    },
  "temp_4": {
    bgcolor : "rgb(255, 231, 217)",
    color: "rgb(122, 12, 46)"
    }
}


const AppWidgetSummary = ({ title, total, icon, theme}) => {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        borderRadius: "16px",
        color: colors[theme].color,
        bgcolor: colors[theme].bgcolor,
        width: "80%",
        margin:"auto auto 15px auto"
      }}
     
    >
      <IconWrapperStyle
        sx={{
          color: colors[theme].color,
          backgroundImage: "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)"
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default AppWidgetSummary
