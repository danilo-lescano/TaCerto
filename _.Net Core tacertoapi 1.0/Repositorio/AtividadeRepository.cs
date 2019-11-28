using System;
using System.Collections.Generic;
using System.Linq;
using ApiTaCerto.Models;
using ApiTaCerto.Models.Usuario;

namespace ApiTaCerto.Repositorio
{
    public class AtividadeRepository : IAtividadeRepository
    {

        private readonly MainDbContext _contexto;

        public AtividadeRepository(MainDbContext ctx)
        {
            _contexto = ctx;    
        }

        public Disciplina Find(long id)
        {
            return _contexto.Disciplinas.FirstOrDefault(p => p.IdDisciplina == id);
        }

        public IEnumerable<Disciplina> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Disciplina> GetAllSubjectsWithId(int id)
        {
            return _contexto.Disciplinas.Where(d => d.IdMatriz == id).ToList();
        }

        public int GetDefaultInstituteId(string cnpj)
        {
            return _contexto.Instituicoes.Where(i => i.CNPJ == cnpj).First().IdInstituicao;
        }

        public IEnumerable<AtividadeDisciplina> GetAllClassActivities(long idDisciplina){ 
            return _contexto.AtividadeDisciplinas.Where(ad => ad.IdDisciplina == idDisciplina).ToList();
        }

        public IEnumerable<Atividade> GetAllActivities(long idDisciplinaAutor){
            return _contexto.Atividades.Where(a => a.IdTurmaDisciplinaAutor == idDisciplinaAutor).ToList();
        }

        public IEnumerable<Questao> GetAllQuestions(long idAtividade){
            return _contexto.Questoes.Where(a => a.IdAtividade == idAtividade).ToList();
        }
    }
}