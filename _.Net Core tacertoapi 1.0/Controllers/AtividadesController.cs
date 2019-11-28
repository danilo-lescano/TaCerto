using System;
using ApiTaCerto.Logic;
using ApiTaCerto.Repositorio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ApiTaCerto.Controllers
{
    [Route("api/[Controller]")]
    [Authorize()]
    public class AtividadesController : Controller
    {
        private readonly IAtividadeRepository _atividadeRepositorio;
        private AtividadeLogic atividadeLogic;

        public AtividadesController(IAtividadeRepository atividadeRepo)
        {
            _atividadeRepositorio = atividadeRepo;
            atividadeLogic = new AtividadeLogic(atividadeRepo);
        }

        [AllowAnonymous]
        [HttpGet]
        public JsonResult GetAllDefaultSubjects(){
            return Json(atividadeLogic.GetAllDefaultSubjects());
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name="GetAtividadesDisciplina")]
        public JsonResult GetAtividadesDisciplinaByDisciplinaId(long id){
            var atividadesDisciplinas = _atividadeRepositorio.GetAllClassActivities(id);
            if(atividadesDisciplinas == null)
                return Json(null); // Código 404
            
            return Json(atividadesDisciplinas); // Código 200
        }
        
        [AllowAnonymous]
        [HttpGet("info/{id}", Name="GetAtividades")]
        public JsonResult GetAtividadesById(long id){
            var atividades = _atividadeRepositorio.GetAllActivities(id);
            if(atividades == null)
                return Json(null);

            return Json(atividades);
        }

        [AllowAnonymous]
        [HttpGet("questoes/{idatividade}", Name="GetQuestoes")]
        public JsonResult GetQuestoesDeAtividade(long idatividade){
            var questoes = _atividadeRepositorio.GetAllQuestions(idatividade);
            if(questoes == null)
                return Json(null);

            return Json(questoes);
        }
    }
}