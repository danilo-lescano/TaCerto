using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "Atividade/AtividadeAtual")]
public class AtividadeAtual : ScriptableObject
{
    public int idAtividade;
    public int idDisciplina;
    public string whereToReturn;
    public string disciplina;
    public string titulo;
    public int acertos;
    public int erros;
    public int numQuestoes;

    public List<Questao> questoes = new List<Questao>();
}