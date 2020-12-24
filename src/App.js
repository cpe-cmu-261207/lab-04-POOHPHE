import { useState } from "react";
import Snowfall from 'react-snowfall'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import {CourseCard} from './components/CourseCard.js';

function App() {
  

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },

    },
    form: {
      maxWidth: 275,
    }
  }));

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
        <DialogTitle id="simple-dialog-title" color="secondary">{error}</DialogTitle>

      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const classes = useStyles();

  const grade = ["A", "B+", "B", "C+", "C", "D+", "D", "F", "W"];
  const credit = [1, 2, 3];

  const [myCourses, setMyCourse] = useState([]);
  const [GPA, setGPA] = useState(0.0)
  const [name, setName] = useState("");
  const [subID, setID] = useState("");
  const [gpaSub, setGPAsub] = useState("A");
  const [creDit, setCredit] = useState(1);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  /**
   * Calculate the GPA of current courses
   * @returns the GPA of current courses
   */
  function gradeCount(gpa) {
    if (gpa === "A") {
      return 4.0
    } else if (gpa === "B+") {
      return 3.5
    } else if (gpa === "B") {
      return 3.0
    } else if (gpa === "C+") {
      return 2.5
    } else if (gpa === "C") {
      return 2.0
    } else if (gpa === "D+") {
      return 1.5
    } else if (gpa === "D") {
      return 1.0
    } else if (gpa === "F") {
      return 0.0
    } else if (gpa === "W") {
      return 0.0
    }
  }

  function calculateGPA(e) {
    // TODO

    const courses = [...e]

    let gpax = 0, credit = 0
    courses.forEach(e => {
      gpax = gpax + gradeCount(e.gpa) * parseFloat(e.credit)
      if (e.gpa !== "W")
        credit = credit + parseFloat(e.credit)
        console.log(e.gpa)
        console.log(e.credit)
    })
    //setGPA(parseFloat(gpax/credit))
    if (credit === 0) return 0
    return parseFloat(gpax / credit)


  }

  /**
   * Should be called when a course is to be added to the list.
   * After adding the course to the list, the displayed GPA should be updated.
   * @param {*} event 
   */

  function addCourse(event) {
    event.preventDefault();
    // TODO
    if (name !== "" && subID !== "") {
      if (subID.length !== 6) {
          setError("Subject ID must be 6 digits")
          handleClickOpen()
      } else if (isNaN(subID)) {
          setError("Subject ID must be a number")
          handleClickOpen()
      } else {

        const course = [...myCourses]
        if (course.filter(e => e.subId === subID).length > 0) {
          setError("It already has this subject ID")
          handleClickOpen()
        } else {
          course.push({
            id: Date.now(),
            name: name,
            gpa: gpaSub,
            credit: creDit,
            subId: subID,
          })

          setMyCourse(course)

          // recalculate GPA
          setGPA(calculateGPA(course))
        }
      }
    } else {
      if (subID === "")
        setError("Subject ID must be entered")
      else if (name === "")
        setError("Subject Name must be entered")
      handleClickOpen()
    }
    setName("")
    setID("")
  }

  /**
   * Should be called when a course is to be removed from the list.
   * After removing the course from the list, the displayed GPA should be updated.
   * @param {*} id 
   */
  function onDeleteCourse(id) {
    // TODO
    console.log("DEL")
    const course = myCourses.filter(e => e.id !== id)
    setMyCourse(course)
    // recalculate GPA
    setGPA(calculateGPA(course))
  }

  return (

    <div className="container mx-auto h-screen">
      <Snowfall
        snowflakeCount={250}
      />

      <h1 class="glow">
        GPA CALCULATOR
      </h1>

      <SimpleDialog open={open} onClose={handleClose} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div align="center">
            <br />
            <Card variant="outlined" className={classes.form}>
              <Paper elevation={3} />
              <h1 className="text-center text-4xl p-3 tracking-widest">
                Add Course
              </h1>
              <form className={classes.root} noValidate autoComplete="off" onSubmit={addCourse} width="300px">
                <TextField value={subID} id="outlined-basic" label="Subject ID" variant="outlined" onChange={e => setID(e.target.value)} />
                <br/><br/>
                <TextField value={name} id="outlined-basic" label="Subject Name" variant="outlined" onChange={e => setName(e.target.value)} />
                <InputLabel id="demo-simple-select-label">GPA</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gpaSub}
                  onChange={e => { setGPAsub(e.target.value); }}
                >
                  {grade.map(e => (
                    <MenuItem value={e}>{e}</MenuItem>
                  ))}
                </Select>
                <InputLabel id="demo-simple-select-label">Credit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={creDit}
                  onChange={e => { setCredit(e.target.value); }}
                >
                  {credit.map(e => (
                    <option value={e}>{e}</option>
                  ))}
                </Select>

                <Button variant="contained" color="primary" type="submit">Add</Button>
              </form>
            </Card>
            <br />

            <Card variant="outlined" className={classes.form}>
              <Paper elevation={3} />
              <h2 className="text-center text-4xl p-3 tracking-widest">GPA: {GPA.toFixed(2)}</h2>
            </Card>
          </div>

        </Grid>
        <Grid item xs={12} sm={6}>
          <div align="center">

            <h3 class="small-glow">My courses</h3>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Subject Name</TableCell>
                    <TableCell align="left">Subject ID</TableCell>
                    <TableCell align="left">GPA</TableCell>
                    <TableCell align="left">Credit</TableCell>
                    <TableCell align="left">Delete Button</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {myCourses.map((value) => {
                    return (
                      CourseCard(value, onDeleteCourse)
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

          </div>
        </Grid>
      </Grid>

    </div>

  );
}

export default App;
