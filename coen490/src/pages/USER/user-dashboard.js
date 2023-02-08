import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingRight: 20
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: '50%',
    width: 60,
    height: 60,
    margin: 20
  }
}));

function UserDashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={handleClick}
        variant="contained"
        className={classes.button}
      >
        <Avatar src="https://via.placeholder.com/100x100" />
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button>
            <ListItemText primary="View Appointments" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Chat/Call" />
          </ListItem>
        </List>
      </Collapse>
      <div className={classes.mainContainer}>
        <h1>Next Appointment:</h1>
        <p>Monday, January 17, 2pm</p>
        <h2>Good News of the Day:</h2>
        <p>You were just promoted!</p>
      </div>
    </div>
  );
}

export default UserDashboard;
