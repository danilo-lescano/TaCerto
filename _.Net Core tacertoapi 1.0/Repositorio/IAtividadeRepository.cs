using System.Collections.Generic;
using ApiTaCerto.Models;

namespace ApiTaCerto.Repositorio
{
    public interface IAtividadeRepository
    {
        IEnumerable<Disciplina> GetAll();

        IEnumerable<Disciplina> GetAllSubjectsWithId(int id);

        int GetDefaultInstituteId(string cnpj);

        Disciplina Find(long id);

        IEnumerable<AtividadeDisciplina> GetAllClassActivities(long idDisciplina);

        IEnumerable<Atividade> GetAllActivities(long idDisciplinaAutor);
    
        IEnumerable<Questao> GetAllQuestions(long idAtividade);

    }
}