
import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const CourseCard = (value,func) => {
  // TODO: design HTML component that displays a course as a "card" on the webpage.
  return (
    <TableRow key={value.id}>

                        <TableCell align="left">{value.name}</TableCell>
                        <TableCell align="center">{value.subId}</TableCell>
                        <TableCell align="center">{value.gpa}</TableCell>
                        <TableCell align="center">{value.credit}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => func(value.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>

                      </TableRow>
  );
};
