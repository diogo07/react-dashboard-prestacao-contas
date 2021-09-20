import api from '../../services/api';

export const findCandidatoByNome = async (nome) => {  
    return new Promise((resolve, reject) => {
      api.get(`/candidatos?nome=${nome}`)
      .then(response => {
        resolve(response.status === 200 && response.data.content);
      })
    }) 
};