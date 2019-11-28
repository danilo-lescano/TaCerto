using UnityEngine;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Generic;

public class SaveManager : MonoBehaviour
{
    // Salvar Informações da Pessoa
    public void SaveDefaultContent(List<Disciplina> disciplinas)
    {
        SavePessoa(GameManager.Instance.Pessoa);

        int index = 0;
        foreach (Disciplina disciplina in disciplinas)
        {
            SaveDisciplina(disciplina, index);
            index++;
        }
        PlayerPrefs.SetInt(GameConstants.NUM_DISCIPLINAS_PATH, index);
    }

    // Salvar Informações do Usuário
    private void SavePessoa(Pessoa pessoa)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        FileStream stream = GetStream("/" + GameConstants.USER_PATH);
        formatter.Serialize(stream, pessoa);
        stream.Close();
    }

    // Salvar Disciplinas Default
    public void SaveDisciplina(Disciplina disciplina, int indexDisciplina)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        FileStream stream = GetStream("/disciplinas/disc" + indexDisciplina);
        formatter.Serialize(stream, disciplina);
        stream.Close();

        int indexAtividade = 0;
        foreach (Atividade atividade in disciplina.atividades)
        {
            SaveAtividade(atividade, indexDisciplina, indexAtividade);
            indexAtividade++;
        }
        PlayerPrefs.SetInt(GameConstants.NUM_ATIVIDADES_PATH + "-" + indexDisciplina, indexAtividade);
    }

    // Salvar Atividades Default
    public void SaveAtividade(Atividade atividade, int indexDisciplina, int indexAtividade)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        FileStream stream = GetStream("/atividades/ativ-" + indexDisciplina + "-" + indexAtividade);
        formatter.Serialize(stream, atividade);
        stream.Close();

        int indexQuestao = 0;
        foreach (Questao questao in atividade.questoes)
        {
            SaveQuestao(questao, indexDisciplina, indexAtividade, indexQuestao);
            indexQuestao++;
        }
        PlayerPrefs.SetInt(GameConstants.NUM_QUESTOES_PATH + "-" + indexDisciplina + "-" + indexAtividade, indexQuestao);

    }
    // Salvar Questões Default
    public void SaveQuestao(Questao questao, int indexDisciplina, int indexAtividade, int indexQuestao)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        FileStream stream = GetStream("/questoes/quest-" + indexDisciplina + "-" + indexAtividade + "-" + indexQuestao);
        formatter.Serialize(stream, questao);
        stream.Close();

        // Salvar os "conteudos"
        SaveConteudo(questao.conteudo, indexDisciplina, 
            indexAtividade, indexQuestao, questao.idTipoQuestao);
    }

    public void SaveConteudo(Conteudo conteudo, int indexDisciplina, int indexAtividade, int indexQuestao, int tipo)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        FileStream stream = GetStream("/conteudos/cont-" + indexDisciplina + "-" +
                indexAtividade + "-" + indexQuestao + "-" + tipo);
        formatter.Serialize(stream, conteudo);
        stream.Close();
    }

    // Cria o arquivo e serialize
    public FileStream GetStream(string pathName)
    {
        string path = Application.persistentDataPath + pathName + ".sesi";
        print("Salvando em " + path);
        Directory.CreateDirectory(Path.GetDirectoryName(path));
        FileStream stream = new FileStream(path, FileMode.Create);

        return stream;
    }
}