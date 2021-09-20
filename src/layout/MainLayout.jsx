import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withWidth } from '@material-ui/core';
import Loading from '../components/loading';
import { Link } from 'react-router-dom';
import { fetchLoading } from '../actions/general/actions';

function MainLayout(props) {

  return (
    <div>
      {props.loading.show && <Loading open={props.loading.show} />}
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar
          variant="dense"
        >
         
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: '12px' }} >
            <Button color="inherit" to="/" component={Link} style={{fontSize: '12px'}} >INÍCIO</Button>
          </Typography>

        </Toolbar>
      </AppBar>

      <main>{props.children}</main>
    </div>
  );

}

const mapStateToProps = state => ({ loading: state.loading });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchLoading }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(MainLayout));