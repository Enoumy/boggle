import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Notification(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={props.notificationOpen}
      autoHideDuration={2000}
      onClose={props.handleClose}
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
}

export default Notification;
