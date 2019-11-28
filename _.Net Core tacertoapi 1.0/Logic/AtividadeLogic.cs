using System.Collections.Generic;
using ApiTaCerto.Models;
using ApiTaCerto.Repositorio;

namespace ApiTaCerto.Logic
{
    public class AtividadeLogic
    {
        private readonly IAtividadeRepository _atividadeRepositorio;
        private readonly string OUR_CNPJ = "03.795.086/0025-51";

        public AtividadeLogic(IAtividadeRepository atividadeRepo){
            _atividadeRepositorio = atividadeRepo;
        }

        public IEnumerable<Disciplina> GetAllDefaultSubjects(){
            int defaultId = _atividadeRepositorio.GetDefaultInstituteId(OUR_CNPJ);

            return _atividadeRepositorio.GetAllSubjectsWithId(defaultId);
        }
    }
}