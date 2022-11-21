import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";
import axios from "axios";
import './App.css'

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(true);
  const [catt, setCatt] = React.useState(0);
  const verticlePos=['top','top','bottom','bottom','bottom','top'];
  const horizontalPos=['center','right','right','center','left','left'];
  const [vpos,setVpos]=React.useState(verticlePos[0]);
  const [hpos,setHpos]=React.useState(horizontalPos[0]);
  
  const randomNumber=(min, max)=> {
    const x=Math.floor(Math.random() * (max - min) + min);
    return x;
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/api/v1/attendanceCount').then(res => { 
    setCatt(res.data.attendanceCount[0].attendance);
    });
  },[])
  
    
  useEffect(() => {
    const interval = setInterval(() => {
      const x=Math.floor(Math.random()*6);
      setVpos(verticlePos[x]);
      setHpos(horizontalPos[x]);
      setOpen(true);
    }, randomNumber(6000,10000));
    return () => clearInterval(interval);
  }, [catt]);
  
  const clickAttendance = () => {
    axios.post('http://localhost:4000/api/v1/attendanceCount/new', { attendance: catt+1 }).then(res => {
      // console.log(res.data);
    });
    setCatt(catt + 1);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button variant="contained" color="error" size="large" onClick={clickAttendance}>
        Give Attendance
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        sx={{
          width: 400,
          color: "secondary",
          //backgroundColor: "green", This doesn't work
          "& .MuiSnackbarContent-root": { backgroundColor: "#8c05ed" }
        }}
        open={open}
        anchorOrigin={{ vertical: vpos, horizontal: hpos}}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Hello"
        action={action}
      />
      <h1>{catt}</h1>
      <h1>{}</h1>
    </div>
  );
}
