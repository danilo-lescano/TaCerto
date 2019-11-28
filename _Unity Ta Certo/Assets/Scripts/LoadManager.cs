using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using UnityEngine;
using UnityEngine.UI;

public class LoadManager : MonoBehaviour
{
    [Header("Scriptable objects")]
    public AtividadeAtual atividadeAtualSO;
    public MainPlayer mainPlayer;

    [Header("Bottom Buttons")]
    public Button salasButton;
    public Image salasImage;

    [Header("Aux elements")]
    public GameObject loadScreen;
    private int loadStartCount = 0;
    public ScrollsManager scrollsManager;

    // Lista de disciplinas existentes
    public List<Disciplina> disciplinasDefault { get; set; }

    // Lista de ids das atividadesdisciplinas existentes
    public List<AtividadeDisciplina> atividadeDisciplinas { get; set; }
    public List<AtividadeDisciplina> atividadeDisciplinasAux { get; set; }

    // Lista de Atividades existentes
    public List<Atividade> atividades { get; set; }

    // Lista de Questoes existentes
    public List<Questao> questoes { get; set; }

    private void Awake()
    {
        StartMyLists();
    }

    private void Start()
    {
        if (PlayerPrefs.HasKey("token") && PlayerPrefs.HasKey("idtoken"))
        {
            SwitchSalasButton(true);
        }
        else
        {
            SwitchSalasButton(false);
        }
    }

    private void SwitchSalasButton(bool op)
    {
        salasButton.interactable = op;
        if (op)
        {
            salasImage.color = new Color(1, 1, 1, 1);
        }
        else
        {
            salasImage.color = new Color(1, 1, 1, .5f);
        }
    }

    private void StartMyLists()
    {
        disciplinasDefault = new List<Disciplina>();
        atividadeDisciplinas = new List<AtividadeDisciplina>();
        atividades = new List<Atividade>();
        questoes = new List<Questao>();
    }

    public void OpenDemonstracao(string whereToReturn)
    {
        GameManager.Instance.SetCurrentActivity(disciplinasDefault[0].atividades[0], whereToReturn);
    }

    /* LOAD FROM API */
    public void LoadStartInfo()
    {
        // Carregar informações do perfil
        StartCoroutine(RestClient.Instance.Get(1, "" + GameManager.Instance.PessoaToken.idPessoa, GetPessoa));

        // Carregar Notificações - Depois

        // Carregar Sala de aula - Depois

        // Carregar Disciplinas Existentes
        StartCoroutine(RestClient.Instance.Get(2, "", GetDisciplinas));

        // Carregar Atividades de Português
        //StartCoroutine(RestClient.Instance.Get());

        // Carregar Atividades de História

        // Carregar Atividades de Geografia

        // Carregar Atividades de Ciências

        // Carregar Atividades de Artes

        // Carregar Atividades de Conhecimento Gerais
    }

    public void LoadDefault()
    {
        // Carregar Disciplinas Existentes
        StartCoroutine(RestClient.Instance.Get(2, "", GetDisciplinas));
    }

    void GetPessoa(string jsonResult, int id, int id2)
    {
        GameManager.Instance.SetPessoa(JsonUtility.FromJson<Pessoa>(jsonResult));

        loadStartCount++;
    }

    void GetDisciplinas(string jsonResult, int id, int id2)
    {
        disciplinasDefault = JsonConvert.DeserializeObject<List<Disciplina>>(jsonResult);
        scrollsManager.CreateSubjectList(disciplinasDefault);
        loadStartCount++;

        int i = 0;
        foreach (Disciplina d in disciplinasDefault)
        {
            StartCoroutine(RestClient.Instance.Get(2, ""+d.idDisciplina, GetAtividadesDisciplinas, i));
            i++;
        }
    }

    void GetAtividadesDisciplinas(string jsonResult, int id, int id2)
    {
        atividadeDisciplinasAux = JsonConvert.DeserializeObject<List<AtividadeDisciplina>>(jsonResult);

        foreach (AtividadeDisciplina ativDiscAux in atividadeDisciplinasAux)
            atividadeDisciplinas.Add(ativDiscAux);

        foreach(AtividadeDisciplina ad in atividadeDisciplinasAux)
        {
            StartCoroutine(RestClient.Instance.Get(2, "info/" + ad.idTurmaDisciplinaAutor, GetAtividades, id));
        }
    }

    void GetAtividades(string jsonResult, int id, int id2)
    {
        List<Atividade> ativs = JsonConvert.DeserializeObject<List<Atividade>>(jsonResult);
        foreach(Atividade at in ativs)
            disciplinasDefault[id].atividades.Add(at);

        int idAtividade = 0;
        foreach (Atividade at in ativs)
        {
            StartCoroutine(RestClient.Instance.Get(2, "questoes/" + at.idAtividade, GetQuestoes, idAtividade, id));
            idAtividade++;
        }
    }

    void GetQuestoes(string jsonResult, int id, int idDisciplina)
    {
        List<Questao> questoes = JsonConvert.DeserializeObject<List<Questao>>(jsonResult);
        foreach (Questao q in questoes)
        {
            q.GetConteudo();
            disciplinasDefault[idDisciplina].atividades[id].questoes.Add(q);
        }

        GameManager.Instance.saveManager.SaveDefaultContent(disciplinasDefault);
        loadScreen.SetActive(false);
    }

    public void loadActivitiesOfSubject(int idDisciplina)
    {
        /*List<AtividadeDisciplina> _atividadeDisciplinas = atividadeDisciplinas;

        List<AtividadeDisciplina> atividadeDisciplinasFiltradas = _atividadeDisciplinas.Where(
            (AtividadeDisciplina ad) =>{
                return ad.idDisciplina == idDisciplina;
            }).ToList();
        print(atividadeDisciplinasFiltradas.Count());
        int idTurmaDisciplinaAutor = atividadeDisciplinasFiltradas[0].idTurmaDisciplinaAutor;
        List<Atividade> atividadesOfSubject = atividades.Where(
            (Atividade a) =>
            {
                return a.idTurmaDisciplinaAutor == idTurmaDisciplinaAutor;
            }).ToList();
*/
        int i;
        for(i = 0; i < disciplinasDefault.Count(); i++)
        {
            if (idDisciplina == disciplinasDefault[i].idDisciplina)
                break;
        }
        scrollsManager.CreateActivityList(disciplinasDefault[i].atividades);

        GameManager.Instance.SwitchActivityScreen(true);
    }

    /* LOAD FROM DEVICE */
    public void LoadFromDevice()
    {
        // Checa se tem dados salvos checando se os valores do PlayerPrefs
        if (PlayerPrefs.HasKey(GameConstants.NUM_DISCIPLINAS_PATH))
        {
            int numDisciplinas = PlayerPrefs.GetInt(GameConstants.NUM_DISCIPLINAS_PATH);
            //LoadPessoa("/"+GameConstants.USER_PATH);
            LoadDisciplinasFromDevice(numDisciplinas);
        }
    }

    private void LoadPessoa(string path)
    {
        if (FileExists(path))
        {
            BinaryFormatter formatter = new BinaryFormatter();
            FileStream stream = GetStream(path);
            GameManager.Instance.SetPessoa(formatter.Deserialize(stream) as Pessoa);
            stream.Close();           
        }
        else
        {
            Debug.LogError("Save file not found in " + path);
        }
    }

    private void LoadDisciplinasFromDevice(int numDisciplinas)
    {
        FileStream stream = null;

        for (int i = 0; i < numDisciplinas; i++)
        {
            string path = "/disciplinas/disc" + i;
            if (FileExists(path))
            {
                BinaryFormatter formatter = new BinaryFormatter();
                stream = GetStream(path);
                Disciplina disciplina = formatter.Deserialize(stream) as Disciplina;
                disciplina.atividades = new List<Atividade>();
                disciplinasDefault.Add(disciplina);
                stream.Close();

                LoadAtividadesFromDevice(i);
            }
        }

        scrollsManager.CreateSubjectList(disciplinasDefault);
    }

    private void LoadAtividadesFromDevice(int numDisciplina)
    {
        FileStream stream = null;
        bool hasActivities = true;

        int numAtividade = 0;
        while (hasActivities)
        {
            string path = "/atividades/ativ-" + numDisciplina + "-" + numAtividade;
            if (FileExists(path))
            {
                BinaryFormatter formatter = new BinaryFormatter();
                stream = GetStream(path);
                Atividade atividade = formatter.Deserialize(stream) as Atividade;
                atividade.questoes = new List<Questao>();
                disciplinasDefault[numDisciplina].atividades.Add(atividade);
                stream.Close();

                LoadQuestoesFromDevice(numDisciplina, numAtividade);
                numAtividade++;
            }
            else
            {
                hasActivities = false;
            }
        }
    }

    private void LoadQuestoesFromDevice(int numDisciplina, int numAtividade)
    {
        FileStream stream = null;
        bool hasQuestions = true;

        int numQuestao = 0;
        while (hasQuestions)
        {
            string path = "/questoes/quest-" + numDisciplina + "-" + numAtividade + "-" + numQuestao;
            if (FileExists(path))
            {
                BinaryFormatter formatter = new BinaryFormatter();
                stream = GetStream(path);
                Questao questao = formatter.Deserialize(stream) as Questao;
                disciplinasDefault[numDisciplina].atividades[numAtividade].questoes.Add(questao);

                LoadConteudoFromDevice(numDisciplina, numAtividade,numQuestao);

                numQuestao++;
            }
            else
            {
                hasQuestions = false;
            }
        }

        loadScreen.SetActive(false);
    }

    private void LoadConteudoFromDevice(int numDisciplina, int numAtividade, int numQuestao)
    {
        FileStream stream = null;
        int tipo = disciplinasDefault[numDisciplina].atividades[numAtividade].questoes[numQuestao].idTipoQuestao;

        string path = "/conteudos/cont-" + numDisciplina + "-" +
            numAtividade + "-" + numQuestao + "-" + tipo;
        if (FileExists(path))
        {
            BinaryFormatter formatter = new BinaryFormatter();
            stream = GetStream(path);
            Conteudo conteudo = formatter.Deserialize(stream) as Conteudo;
            disciplinasDefault[numDisciplina].atividades[numAtividade].questoes[numQuestao].conteudo = conteudo;
        }
        else
        {
            print("Caminho " + path + ", não existe");
        }
    }


    /*
    public static PlayerData LoadPlayer()
    {
        string path = Application.persistentDataPath + "/player.fun";
        if (File.Exists(path))
        {
            BinaryFormatter formatter = new BinaryFormatter();
            FileStream stream = new FileStream(path, FileMode.Open);

            PlayerData data = formatter.Deserialize(stream) as PlayerData;
            stream.Close();

            return data;
        }
        else
        {
            Debug.LogError("Save file not found in " + path);
        }
    }*/

    public FileStream GetStream(string pathName)
    {
        string path = Application.persistentDataPath + pathName + ".sesi";
        FileStream stream = new FileStream(path, FileMode.Open);

        return stream;
    }

    public bool FileExists(string pathName)
    {
        string path = Application.persistentDataPath + pathName + ".sesi";
        if (File.Exists(path))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}