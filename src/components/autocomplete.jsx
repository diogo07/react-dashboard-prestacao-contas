import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  option: {
    "&:hover": {
      backgroundColor: "#ddd !important"
    }
  }
});

class TextFieldAutocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      options: [],
    }
  }

  search = async (filter) => {
    if (filter.trim() || this.props.minSizeFilter === 0) {
      this.setState({
        loading: true
      })

      const { actionFilter } = this.props;
      let data = await actionFilter(filter.replace(/[^\w\s]/g, ''));
      if (data && data.length) {
        this.setState({ options: data });
      }

      this.setState({
        loading: false
      })
    } else {
      this.setState({ options: [] });
    }

  }

  render() {
    const { label, classes } = this.props;

    return (
      <Autocomplete
        id={label}
        fullWidth={true}
        open={this.state.open}
        onOpen={() => {
          this.search('');
          this.setState({ open: true });
        }}
        onClose={() => {
          this.setState({ open: false });
        }}
        noOptionsText="Nenhum resultado"
        loadingText="Carregando..."
        getOptionSelected={this.props.getOptionSelected}
        classes={{
          option: classes.option
        }}
        getOptionLabel={this.props.getOptionLabel}
        options={this.state.options}
        filterOptions={this.props.filterOptions}
        loading={this.state.loading}
        onInputChange={(event, value, reason) => {
          if (reason === 'input' && !this.state.loading) {
            this.search(value)
          }
        }}
        onChange={(event, value) => this.props.actionChangeOption(value)}
        value={this.props.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            margin="dense"
            onBlur={(event) => { this.setState({ options: [] }) }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}

      />
    );
  }

}

export default withStyles(styles)(TextFieldAutocomplete);
