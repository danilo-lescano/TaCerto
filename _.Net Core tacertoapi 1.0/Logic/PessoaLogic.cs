using System.Linq;
using System.Text;
using ApiTaCerto.Models.Usuario;
using ApiTaCerto.Repositorio;

namespace ApiTaCerto.Logic
{
    public class PessoaLogic
    {
        private readonly IPessoaRepository _pessoaRepositorio;

        private string stringKey = "13#$-@#$@##@fwefwerWEFWefWEFWE-wefwe-3r3r-4etefge4e4fe";

        public PessoaLogic(IPessoaRepository pessoaRepo)
        {
            _pessoaRepositorio = pessoaRepo;
        }

        public int ValidarLogin(string email, string senha){
            // code == 1 == Autenticado
            // code == 0 == Não autenticado (Email ou senha incorreto)
            Pessoa pessoa = _pessoaRepositorio.GetAll().Where(p => p.Email == email && p.Senha == senha).FirstOrDefault();

            if(pessoa == null)
                return 0;
            else 
                return pessoa.IdPessoa;
        }

        public void GerarToken(PessoaToken pessoaToken, Pessoa pessoa){

            if(pessoaToken.Autenticado){
                pessoaToken.Message = "Usuário autenticado";
                pessoaToken.Token = GetToken(pessoa.Email, pessoa.Senha);
                _pessoaRepositorio.AddPessoaToken(pessoaToken);
            }else
                pessoaToken.Token = pessoaToken.Message = null;
        }

        private string GetToken(string email, string senha){

            string token = string.Empty;
            
            token = Encrypt.EncryptString(senha, stringKey);

            return token;
        }

        public PessoaToken getPessoaToken(long id){
            
            return _pessoaRepositorio.FindPessoaToken(id);
        }
    }
}