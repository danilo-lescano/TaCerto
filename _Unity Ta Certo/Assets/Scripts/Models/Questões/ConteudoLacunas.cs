using System;

[Serializable]
public class ConteudoLacunas : Conteudo
{
    private int[] coluna1Index;
    private string[] coluna1Texto;
    private int[] coluna2Index;
    private string[] coluna2Texto;

    public int[] Coluna1Index { get => coluna1Index; set => coluna1Index = value; }
    public string[] Coluna1Texto { get => coluna1Texto; set => coluna1Texto = value; }
    public int[] Coluna2Index { get => coluna2Index; set => coluna2Index = value; }
    public string[] Coluna2Texto { get => coluna2Texto; set => coluna2Texto = value; }

    public ConteudoLacunas(Questao questao)
    {
        IdQuestao = questao.idQuestao;
        // passar o json para os atributos
    }
}