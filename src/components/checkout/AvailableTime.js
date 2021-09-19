import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    minWidth: "100%",
    marginBottom: 40
  }
}));

const timeArray = [
  {
    10: "Today 12pm"
  },
  {
    20: "Today 2pm"
  },
  {
    30: "Today 5pm"
  },
  {
    40: "Tomorrow 12pm"
  },
  {
    50: "Tomorrow 2pm"
  },
  {
    60: "Tomorrow 5pm"
  }
];

export default function AvailableTime() {
  const classes = useStyles();
  const [time, setTime] = React.useState(Object.keys(timeArray[0])[0]);
  const handleChange = event => {
    setTime(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <Select
          labelId="available-time"
          id="select-available-time"
          value={time}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {timeArray.map((array, i)=>{
            const key = Object.keys(array)[0];
            return  <MenuItem value={key} key={i}>{array[key]}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

// <InputLabel id="demo-customized-select-label">Age</InputLabel>
