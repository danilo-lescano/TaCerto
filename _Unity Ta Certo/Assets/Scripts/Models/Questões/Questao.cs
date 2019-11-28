using System;

[Serializable]
public class Questao 
{
    public int idQuestao { get; set; }
    public int idAtividade { get; set; }
    public int idTipoQuestao { get; set; }
    public string titulo { get; set; }
    public string enunciado { get; set; }
    public string jsonQuestao { get; set; }
    public int pesoNota { get; set; }

    [NonSerialized]
    public Conteudo conteudo;

    public void GetConteudo()
    {
        ConteudoFactory aux = new ConteudoFactory();
        conteudo = new Conteudo();
        conteudo = aux.GetConteudo(this);
    }
}