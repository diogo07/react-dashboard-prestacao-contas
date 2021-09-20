import api from '../../services/api';

export const findReceitaTotalByCandidato = async (candidatoId) => {  
    return new Promise((resolve, reject) => {
      api.get(`/receitas/total?candidatoId=${candidatoId}`)
      .then(response => {
        resolve(response.status === 200 && response.data);
      })
    }) 
};