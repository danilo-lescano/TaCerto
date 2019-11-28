using System.Collections.Generic;
using System.Linq;
using ApiTaCerto.Models;
using ApiTaCerto.Models.Usuario;

namespace ApiTaCerto.Repositorio
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly MainDbContext _contexto;

        public PessoaRepository(MainDbContext ctx)
        {
            _contexto = ctx;    
        }

        public void Add(Pessoa pessoa)
        {
            _contexto.Pessoas.Add(pessoa);
            _contexto.SaveChanges();
        }

        public void AddPessoaToken(PessoaToken pessoaToken){
            _contexto.PessoaToken.Add(pessoaToken);
            _contexto.SaveChanges();
        }

        public Pessoa Find(long id)
        {
            Pessoa pessoa = _contexto.Pessoas.FirstOrDefault(p => p.IdPessoa == id);
            pessoa.Senha = "******************";
            return pessoa;
        }

        public PessoaToken FindPessoaToken(long id){
            return _contexto.PessoaToken.FirstOrDefault(p => p.IdPessoaToken == id);
        }

        public IEnumerable<Pessoa> GetAll()
        {
            return _contexto.Pessoas.ToList();
        }

        public void Remove(long id)
        {
            var entity = _contexto.Pessoas.First(p => p.IdPessoa == id);
            _contexto.Pessoas.Remove(entity);
            _contexto.SaveChanges();
        }

        public void Update(Pessoa pessoa)
        {
            _contexto.Pessoas.Update(pessoa);
            _contexto.SaveChanges();
        }

    }
}