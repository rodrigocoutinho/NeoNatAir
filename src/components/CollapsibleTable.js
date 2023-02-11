import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

function createData(name, idAirpures, qntAlertas) {
  return {
    name,
    idAirpures,
    qntAlertas,
    
    history: [
      {
        date: '2020-01-05',
        hora: '23:00',
        co2: '0',
        tvoc: '0',
        umidade: '0',
        temperatura:'0'
      },
      {
        date: '2020-01-05',
        hora: '23:00',
        co2: '0',
        tvoc: '0',
        umidade: '0',
        temperatura:'0'
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.idAirpures}</TableCell>
        <TableCell align="right">{row.qntAlertas}</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell align="right">Co2</TableCell>
                    <TableCell align="right">tvoc</TableCell>
                    <TableCell align="right">Umidade</TableCell>
                    <TableCell align="right">Temperatura</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.hora}</TableCell>
                      <TableCell align="right">{historyRow.co2}</TableCell>
                      <TableCell align="right">{historyRow.tvoc}</TableCell>
                      <TableCell align="right">{historyRow.umidade}</TableCell>
                      <TableCell align="right">{historyRow.temperatura}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    idAirpures: PropTypes.number.isRequired,
    qntAlertas: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Recepção', 159, 6),
  createData('Consultório-01', 237,0),
  createData('Triagem-sala-04', 262, 16),
  createData('UTI-sala-03', 305, 3.7),
  createData('Consultório-10', 356, 16),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ambientes</TableCell>
            <TableCell align="right">IdAirpure</TableCell>
            <TableCell align="right">Qnt-Alertas</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}