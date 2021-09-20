import { Container, Typography, Grid, Card, CardContent, Divider } from '@material-ui/core';
import React, { Component } from 'react';
import { fetchLoading } from '../../actions/general/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findCandidatoByNome } from '../../actions/candidato/actions';
import TextFieldAutocomplete from '../../components/autocomplete';
import { moneyWithMask } from '../../helpers';
import InfoIcon from '@material-ui/icons/Info';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const INITIAL_STATE = {
  candidato: null,
  receitasTotais: [],
  option: 0
}


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  async componentDidMount() {

  }

  changeCandidato = async (candidato) => {
    this.props.fetchLoading(true);
    this.setState({ candidato: candidato });
    this.props.fetchLoading(false);
  }

  renderMenuOptions = (candidatura) => {
    switch (this.state.option) {
      case 0:
        return <Grid container>
          <Grid item={true} xs={12} md={12}>
            <Typography variant="body2" color="secondary" gutterBottom>
              <strong>Nome:</strong> {this.state.candidato.nome}
            </Typography>
          </Grid>

          <Grid item={true} xs={12} md={12}>
            <Typography variant="body2" color="secondary" gutterBottom>
              <strong>Partido:</strong> {candidatura.partido.sigla}
            </Typography>
          </Grid>

          <Grid item={true} xs={12} md={12}>
            <Typography variant="body2" color="secondary" gutterBottom>
              <strong>Ano:</strong> {candidatura.ano}
            </Typography>
          </Grid>

          <Grid item={true} xs={12} md={12}>
            <Typography variant="body2" color="secondary" gutterBottom>
              <strong>Número:</strong> {candidatura.numero}
            </Typography>
          </Grid>

          <Grid item={true} xs={12} md={12}>
            <Typography variant="body2" color="secondary" gutterBottom>
              <strong>CPF:</strong> {this.state.candidato.cpf}
            </Typography>
          </Grid>
        </Grid>;
      case 1: 
        return <Grid container>
          <Grid item={true} xs={12} md={12}>
            <Grid container justifyContent="center">
            <Typography variant="h6" style={{color: '#549e7b'}} gutterBottom>
              <strong>Receita Total:</strong> R$ {moneyWithMask(candidatura.receitas.reduce(function (a, b) {
                return a + b.valor;
              }, 0) + "00")}
            </Typography>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} md={12}>
            <List>
              {candidatura.receitas.map((receita) => {
                return <ListItem >
                <Grid container spacing={2} alignItems="center">
                    <ListItemAvatar>
                        <TrendingUpIcon style={{color: '#549e7b'}}/>
                    </ListItemAvatar>
                  <Grid item={true} xs={2} md={1}>
                    <ListItemText primary={<strong>Valor</strong>} secondary={`R$ ${moneyWithMask(receita.valor + "00")}`}/>
                  </Grid>
                  <Grid item={true} xs={6} md={8}>
                    <ListItemText primary={<strong>Descrição</strong>} secondary={receita.descricao && receita.descricao.trim().length ? receita.descricao : 'NÃO INFORMADO'}/>
                  </Grid>
                  <Grid item={true} xs={2} md={2}>
                    <ListItemText primary={<strong color="secondary">Tipo</strong>} secondary={receita.tipo}/>
                  </Grid>
                  <Divider  style={{width: '100%'}}/>
                </Grid>

              </ListItem>
              })}
            </List>
          </Grid>
          
        </Grid>;
      
      case 2: 
        return <Grid container>
          <Grid item={true} xs={12} md={12}>
            <Grid container justifyContent="center">
            <Typography variant="h6" style={{color: '#b55757'}} gutterBottom>
              <strong>Despesa Total:</strong> R$ {moneyWithMask(candidatura.despesas.reduce(function (a, b) {
                return a + b.valor;
              }, 0) + "00")}
            </Typography>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} md={12}>
            <List>
              {candidatura.despesas.map((despesa) => {
                return <ListItem >
                <Grid container spacing={2} alignItems="center">
                    <ListItemAvatar>
                        <TrendingDownIcon style={{color: '#b55757'}}/>
                    </ListItemAvatar>
                  <Grid item={true} xs={2} md={1}>
                    <ListItemText primary={<strong>Valor</strong>} secondary={`R$ ${moneyWithMask(despesa.valor + "00")}`}/>
                  </Grid>
                  <Grid item={true} xs={6} md={8}>
                    <ListItemText primary={<strong>Descrição</strong>} secondary={despesa.descricao && despesa.descricao.trim().length ? despesa.descricao : 'NÃO INFORMADO'}/>
                  </Grid>
                  <Grid item={true} xs={2} md={2}>
                    <ListItemText primary={<strong color="secondary">Tipo</strong>} secondary={despesa.tipo}/>
                  </Grid>
                  <Divider style={{width: '100%'}}/>
                </Grid>

              </ListItem>
              })}
            </List>
          </Grid>
          
        </Grid>;
      default:
        return <Grid container></Grid>;

    }

  }

  renderCandidaturas = () => {
    return this.state.candidato?.candidaturas.map((candidatura) => {
      return <Grid md={12}>
        <Card style={{ marginTop: '30px' }}>
          <CardContent>
            <Grid container>

              <Grid item={true} xs={12} md={12} style={{ marginBottom: '20px' }}>
                <Typography variant="h6" component="div">
                  {candidatura.cargo.descricao} - {candidatura.uf}
                </Typography>
              </Grid>
              <Grid item={true} xs={12} md={12} style={{ marginBottom: '20px' }}>

              <Tabs
                value={this.state.option}
                onChange={(event, newValue) => {
                  this.setState({ option: newValue });
                }}
                variant="fullWidth"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
                style={{backgroundColor: '#eee'}}
              >

                  <Tab label="Informações" icon={<InfoIcon />} color="red"/>
                  <Tab label="Receitas" icon={<TrendingUpIcon />} />
                  <Tab label="Despesas" icon={<TrendingDownIcon />} />
                </Tabs>
              </Grid>
              <Grid item={true} xs={12} md={12} style={{ marginBottom: '10px' }}>
                {
                  this.renderMenuOptions(candidatura)
                }
              </Grid>
            </Grid>
          </CardContent>          
        </Card>
      </Grid>
    })
  }


  render() {
    return <Container>
      <div style={{ height: '80px', width: '100%' }}></div>
      <Grid container spacing={1}>

        <Typography variant="h6" gutterBottom component="div">
          Pesquisa de Candidato
        </Typography>

        <TextFieldAutocomplete
          label="Nome do candidato"
          actionFilter={findCandidatoByNome}
          value={this.state.candidato}
          actionChangeOption={this.changeCandidato}
          getOptionLabel={(option) => option.nome ? option.nome : ""}
          filterOptions={(options, object) =>
            options.filter((item) =>
              item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase())
            )
          }
        />

        {this.renderCandidaturas()}
      </Grid>
    </Container>
  }
}


const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ fetchLoading }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
