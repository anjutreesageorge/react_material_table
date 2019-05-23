import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

/*let id = 0;*/
function createData(iATA_IDA1,name,wMO_ID,mSC_ID,latitude,longitude,elevation,data_Provider,dataset_N,aUTO_MA,province_Territory) {
 /* id += 1;*/
  return { 
	 iATA_IDA1,name,wMO_ID,mSC_ID,latitude,longitude,elevation,data_Provider,dataset_N,aUTO_MA,province_Territory,
  };
}
// TO DO fetch from  api
// TO DO create sortable table
function SimpleTable(props) {
  const { classes } = props;
  const [initialized, setInitialized] = useState(false);
  const [rows, setRows] = useState(false);

  useEffect(() => {
    if (!initialized) {
      axios
        .get(
          'http://localhost:8080/demo'
        )
        .then(({ data }) => {
          // eslint-disable-next-line no-console
          console.log('>>>>>>>.', data);
          data.forEach(element => {
            setRows([
              createData(element.iATA_IDA1,element.name,element.wMO_ID,element.mSC_ID,element.latitude,element.longitude,element.elevation,element.data_Provider,
                element.dataset_N,element.aUTO_MA,element.province_Territory)
              
            ]); 
          });
          
        });
      setInitialized(true);
    }
  },[initialized]);
  return rows && (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
           <TableCell align="right">IATA_IDA1</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">WMO_ID</TableCell>
            <TableCell align="right">MSC_ID</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Elevation</TableCell>
            <TableCell align="right">Data_Provider</TableCell>
            <TableCell align="right">Dataset/N</TableCell>
            <TableCell align="right">AUTO/MA</TableCell>
            <TableCell align="right">Province/Territory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {rows.map(row => (
          <TableRow>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.iATA_IDA1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.wMO_ID}</TableCell>
              <TableCell align="right">{row.mSC_ID}</TableCell>
              <TableCell align="right">{row.latitude}</TableCell>
              <TableCell align="right">{row.longitude}</TableCell>
              <TableCell align="right">{row.elevation}</TableCell>
              <TableCell align="right">{row.data_Provider}</TableCell>
              <TableCell align="right">{row.dataset_N}</TableCell>
              <TableCell align="right">{row.aUTO_MA}</TableCell>
              <TableCell align="right">{row.province_Territory}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};
// http://codekirei.com/posts/currying-with-arrow-functions/
export default withStyles(styles)(SimpleTable);
