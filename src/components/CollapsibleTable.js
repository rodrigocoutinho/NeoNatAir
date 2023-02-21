import * as React from 'react';
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
import { useState, useEffect } from 'react';
import { getLeitos } from '../services/serviceApi';



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
          {row.nome}
        </TableCell>
        <TableCell align="center"> <strong> id : </strong>{row.idAirPure}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="body" gutterBottom component="div" sx={{textAlign:"center", mt:5,mb:2}}>
                <strong>Dados de criação dos leitos com parâmetros limites para alertas de não conformidades</strong>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell align="right">Limite Co2</TableCell>
                    <TableCell align="right">Limite COVT</TableCell>
                    <TableCell align="right">Limite Luminosidade</TableCell>
                    <TableCell align="right">Limite Ruido sonoro</TableCell>
                    <TableCell align="right">Limite Temperatura</TableCell>
                    <TableCell align="right">Limite Umidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {row.createdAt}
                      </TableCell>
                      <TableCell align="center">{row.limitCo2}</TableCell>
                      <TableCell align="center">{row.limitCOVT}</TableCell>
                      <TableCell align="center">{row.limitLuminosidade}</TableCell>
                      <TableCell align="center">{row.limitRuidoSonoro}</TableCell>
                      <TableCell align="center">{row.limitTemperatura}</TableCell>
                      <TableCell align="center">{row.limitUmidade}</TableCell>

                    </TableRow>
               
                </TableBody>
              </Table>
            </Box>

            
          </Collapse>
        </TableCell>
      </TableRow>

    </>
  );
}



export default function CollapsibleTable() {
  const [leitos, setLeitos] = useState([]);

  const getLeitosCreated = async () => {
    let response = await getLeitos();
    return setLeitos(response.data);
  }

  useEffect(() => {
    getLeitosCreated();
  }, [])

  const rows = leitos.map((row, index) => ({
    id: index,
    idLeito: row.idLeito,
    idAirPure: row.idAirPure,
    nome: row.nome,
    limitCo2: row.limitCo2,
    limitCOVT: row.limitCOVT,
    limitLuminosidade: row.limitLuminosidade,
    limitRuidoSonoro: row.limitRuidoSonoro,
    limitTemperatura: row.limitTemperatura,
    limitUmidade: row.limitUmidade,
    createdAt: row.createdAt


  }));

  const qnt = leitos.length;
  console.log(qnt);


  return (

    <TableContainer component={Paper} sx={{ height: 400, width: '100%' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><strong>Nome Leitos</strong></TableCell>
            <TableCell align="center"><strong>IdAirpure</strong></TableCell>
             

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row  key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>


  );
}