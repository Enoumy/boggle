import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Notification(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={props.notificationOpen}
        autoHideDuration={2000}
        onClose={props.handleClose}
        style={{ marginLeft: 240 }}
      >
        <Alert severity={props.severity}>{props.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default Notification;
