import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter, TablePagination } from '@material-ui/core';
import moment from 'moment';

export const getFormattedDateTime = (timestamp) => {
  if (timestamp === '' || timestamp === null || timestamp === undefined) {
    return timestamp
  }
  return moment(timestamp).utcOffset('+0100').format('DD-MMM-YYYY HH:mm:ss');
}

export default class AbsenceTable extends Component {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.state = {
      page: 0,
      rowsPerPage: 5,
      rows: this.props.data
    };
  }
  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage(event) {
    this.setState({ page: 0, rowsPerPage: +event.target.value })
  };

  render() {
    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage;
    const rows = this.state.rows;
    return (
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Member Note</TableCell>
            <TableCell>Confirmed At</TableCell>
            <TableCell>Rejected At</TableCell>
            <TableCell>Admitter Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.userId}</TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{getFormattedDateTime(row.createdAt)}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{moment(row.startDate).format('DD-MMM-YYYY')}</TableCell>
              <TableCell>{moment(row.endDate).format('DD-MMM-YYYY')}</TableCell>
              <TableCell>{row.memberNote}</TableCell>
              <TableCell>{getFormattedDateTime(row.confirmedAt)}</TableCell>
              <TableCell>{getFormattedDateTime(row.rejectedAt)}</TableCell>
              <TableCell>{row.admitterNote}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              count={rows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

