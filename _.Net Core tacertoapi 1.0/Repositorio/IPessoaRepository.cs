using System.Collections.Generic;
using ApiTaCerto.Models.Usuario;

namespace ApiTaCerto.Repositorio
{
    public interface IPessoaRepository
    {
         void Add(Pessoa pessoa);

         void AddPessoaToken(PessoaToken pessoaToken);

         IEnumerable<Pessoa> GetAll();

         Pessoa Find(long id);

         PessoaToken FindPessoaToken(long id);

         void Remove(long id);

         void Update(Pessoa pessoa);
    }
}