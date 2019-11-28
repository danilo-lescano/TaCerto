using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApiTaCerto.Logic;
using ApiTaCerto.Models.Usuario;
using ApiTaCerto.Repositorio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace ApiTaCerto.Controllers
{
    [Route("api/[Controller]")]
    [Authorize()]
    public class PessoasController : Controller
    {
        private readonly string SecurityKey = "DFSF23F@#FWEDwd@#d2#d@3D2#D@#V@3V@3F2#f@#^^@#^D";
        private readonly IPessoaRepository _pessoaRepositorio;
        private PessoaLogic pessoaLogic;

        public PessoasController(IPessoaRepository pessoaRepo)
        {
            _pessoaRepositorio = pessoaRepo;
            pessoaLogic = new PessoaLogic(_pessoaRepositorio);
        }

        [HttpGet]
        public JsonResult GetAll(){
            return Json(_pessoaRepositorio.GetAll());
        }


        [HttpGet("{id}", Name="GetPessoa")]
        public JsonResult GetById(long id){
            var pessoa = _pessoaRepositorio.Find(id);
            if(pessoa == null)
                return Json(null); // Código 404
            
            return Json(pessoa); // Código 200
        }

        [HttpGet("token/{id}", Name="GetPessoaToken")]
        public JsonResult GetTokenById(long id){
            var pessoa = _pessoaRepositorio.FindPessoaToken(id);
            if(pessoa == null)
                return Json(null); // Código 404
            
            return Json(pessoa); // Código 200
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Pessoa pessoa){

            if(pessoa == null || pessoa.IdPessoa != id)
                return BadRequest();

            var _pessoa = _pessoaRepositorio.Find(id);

            if(_pessoa == null)
                return NotFound();
            
            _pessoa.Email = pessoa.Email;
            _pessoa.Nome = pessoa.Nome;

            _pessoaRepositorio.Update(_pessoa);

            return new NoContentResult();
        }


        [AllowAnonymous]
        [HttpPost]
        public JsonResult Login([FromBody] PessoaLogin pessoaLogin){

            Pessoa pessoa = new Pessoa();
            pessoa.Email = pessoaLogin.Email;
            pessoa.Senha = pessoaLogin.Senha;
            bool loginAutenticado = true;

            if(pessoa == null)
                return Json(null); // Código 404

            pessoa.IdPessoa = pessoaLogic.ValidarLogin(pessoa.Email, pessoa.Senha);
            if(pessoa.IdPessoa == 0)
                loginAutenticado = false;

            PessoaToken pessoaToken = new PessoaToken();
            pessoaToken.IdPessoa = pessoa.IdPessoa;
            pessoaToken.Autenticado = loginAutenticado;

            if(loginAutenticado){
                var claims = new []{
                    new Claim(ClaimTypes.Name, pessoa.Email),
                };

                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(SecurityKey)
                );

                pessoaToken.Message = "Usuário autenticado";

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "sesi",
                    audience: "usuário",
                    claims: claims,
                    expires: DateTime.Now.AddYears(13),
                    signingCredentials: creds);

                pessoaToken.Token = new JwtSecurityTokenHandler().WriteToken(token);
                _pessoaRepositorio.AddPessoaToken(pessoaToken);
                
                return Json(pessoaToken);
            }
                      
            return Json("Credenciais inválidas..."); // Código 200
        }
    }
}