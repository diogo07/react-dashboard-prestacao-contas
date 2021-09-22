import api from '../../services/api';

export const findCandidatoByNome = async (nome) => {  
    return new Promise((resolve, reject) => {
      api.get(`/candidatos?nome=${nome}`)
      .then(response => {
        resolve(response.status === 200 && response.data.content);
      })
    }) 
};


export const findReceitasByCandidatoAndAnoGroupByCategoria = async (candidatoId, ano) => {  
  return new Promise((resolve, reject) => {
    api.get(`/receitas/por-categoria?candidatoId=${candidatoId}&ano=${ano}`)
    .then(response => {
      resolve(response.status === 200 && response.data);
    })
  }) 
};

export const findDespesasByCandidatoAndAnoGroupByCategoria = async (candidatoId, ano) => {  
  return new Promise((resolve, reject) => {
    api.get(`/despesas/por-categoria?candidatoId=${candidatoId}&ano=${ano}`)
    .then(response => {
      resolve(response.status === 200 && response.data);
    })
  }) 
};