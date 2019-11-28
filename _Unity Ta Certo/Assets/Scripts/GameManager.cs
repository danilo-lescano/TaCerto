using Newtonsoft.Json;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    private static GameManager _instance;
    public MainPlayer mainPlayer;

    private PessoaToken pessoaToken = new PessoaToken();
    public PessoaToken PessoaToken { get => pessoaToken; set => pessoaToken = value; }
    public Pessoa Pessoa { get; set; }
  
    [Header("Managers")]
    public LoadManager loadManager;
    public SaveManager saveManager;
    public ScrollsManager scrollsManager;

    [Header("Screens")]
    public GameObject activityScreen;
    public TextMeshProUGUI activitiesScreenTitleText;

    /*[Header("Config Modal")]
    public TextMeshProUGUI nameText;
    public TextMeshProUGUI emailText;
    public Image profilePictureImage;*/

    [Header("Current Activity")]
    public AtividadeAtual atividadeAtualSO;
    private int numeroDeQuestoes = 0;
    private int idQuestaoAtual = 0;
    private List<Questao> questoes;

    [Header("Game Scene Managers")]
    private GameMenuManager gameMenuManager;
    private CertoErradoManager certoErradoManager;

    [Header("GameObject for Open Activity Scene")]
    public Button demoButton;
    public GameObject mainPanel;

    public static GameManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<GameManager>();
                if (_instance == null)
                {
                    GameObject go = new GameObject();
                    go.name = typeof(GameManager).Name;
                    _instance = go.AddComponent<GameManager>();
                    DontDestroyOnLoad(go);
                }
            }
            return _instance;
        }
    }

    private void Awake()
    {
        LoadMyThings();
        Pessoa = new Pessoa();
    }

    private void Start()
    {
        SceneManager.sceneLoaded += OnLoadCallback;
    }

    private void OnLoadCallback(Scene scene, LoadSceneMode sceneMode)
    {
        if(scene.buildIndex == 0) {
            LoadMyThings();
            if (atividadeAtualSO.whereToReturn.Equals("Inicial"))
            {
                print("Não precisa fazer nada");
            }
            else if (atividadeAtualSO.whereToReturn.Equals("Atividade"))
            {
                print("Voltar para a tela de atividades que estava");
                BackToActivityScreen();
            } 
            atividadeAtualSO.whereToReturn = "";
        }   
    }

    private void BackToActivityScreen()
    {
        mainPanel.SetActive(false);
        demoButton.onClick.Invoke();
        SetDisciplina(atividadeAtualSO.disciplina);
        SetActivitiesTitleText(atividadeAtualSO.disciplina);
        loadManager.loadActivitiesOfSubject(atividadeAtualSO.idDisciplina);
    }

    public void IsAlive()
    {
        print(name + " is alive");
    }

    private void LoadMyThings()
    {
        loadManager = GameObject.FindWithTag("LoadSaveManager").GetComponent<LoadManager>();
        saveManager = GameObject.FindWithTag("LoadSaveManager").GetComponent<SaveManager>();
        scrollsManager = GameObject.FindWithTag("ScrollsManager").GetComponent<ScrollsManager>();

        activityScreen = GameObject.FindWithTag("AtividadeScreen");
        activitiesScreenTitleText = GameObject.FindWithTag("AtividadeScreenTitle").GetComponent<TextMeshProUGUI>();
        demoButton = GameObject.FindWithTag("DemoButton").GetComponent<Button>();
        mainPanel = GameObject.FindWithTag("MainPanel");

        activityScreen.SetActive(false);

        mainPlayer = loadManager.mainPlayer;
        atividadeAtualSO = loadManager.atividadeAtualSO;
    }

    public void SwitchActivityScreen(bool op)
    {
        activityScreen.SetActive(op);
    }

    public void SetActivitiesTitleText(string title)
    {
        activitiesScreenTitleText.text = title;
    }

    public void SetPessoa(Pessoa p)
    {
        Pessoa = p;
        mainPlayer.idPessoa = Pessoa.idPessoa;
        mainPlayer.nome = Pessoa.nome;
        mainPlayer.cpf = Pessoa.cpf;
        mainPlayer.email = Pessoa.email;
        print("informação da pessoa carregada");

        /*SetConfigInfo();*/
    }

    /*public void SetConfigInfo()
    {
        nameText.SetText(Pessoa.nome);
        print(Pessoa.nome);
        emailText.SetText(Pessoa.email);
        print(Pessoa.email);
        Debug.Log("Carregar imagem do usuário aqui");
    }*/
    public void SetIdDisciplina(int id)
    {
        atividadeAtualSO.idDisciplina = id;
    }

    public void SetDisciplina(string disciplina)
    {
        atividadeAtualSO.disciplina = disciplina;
    }

    public void SetCurrentActivity(Atividade atividade, string whereToReturn = "Atividade")
    {
        print(atividade.questoes.Count);

        atividadeAtualSO.idAtividade = atividade.idAtividade;
        atividadeAtualSO.titulo = atividade.titulo;
        atividadeAtualSO.acertos = 0;
        atividadeAtualSO.erros = 0;
        atividadeAtualSO.questoes = atividade.questoes;
        numeroDeQuestoes = atividade.questoes.Count;
        atividadeAtualSO.numQuestoes = numeroDeQuestoes;
        atividadeAtualSO.whereToReturn = whereToReturn;

        OpenScene("Jogo");
    }

    private void OpenScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName, LoadSceneMode.Single);
    }

    public void LoadGameSceneElements()
    {
        certoErradoManager = GameObject.FindWithTag("CertoErradoManager").GetComponent<CertoErradoManager>();
        gameMenuManager = GameObject.FindWithTag("GameMenuManager").GetComponent<GameMenuManager>();

        gameMenuManager.setBackgroundImage(atividadeAtualSO.disciplina);

        StartAtividade();
    }

    private void StartAtividade()
    {
        idQuestaoAtual = 0;

        print(atividadeAtualSO.questoes.Count);
        CarregaQuestao(atividadeAtualSO.questoes[idQuestaoAtual]);
    }

    private void CarregaQuestao(Questao questao)
    {
        int tipo = questao.idTipoQuestao;
        if (tipo == 1)
        {
            print("Ver depois se tem foto ou não");
            certoErradoManager.AtivaCertoErradoSemFoto(idQuestaoAtual);
        }else if(tipo == 2)
        {
            print("Carregar o modo Lacuna");
        }
        else if (tipo == 3)
        {
            print("Carregar o modo Colunas");
        }
        else if (tipo == 4)
        {
            print("Carregar o modo Associação");
        }
    }

    public void SetAnswer(bool op)
    {
        print("Jogador acertou ? " + op);
        numeroDeQuestoes = atividadeAtualSO.questoes.Count;
        gameMenuManager.setAcerto(op);
        idQuestaoAtual++;
        print(numeroDeQuestoes);
        print(idQuestaoAtual);
        if (numeroDeQuestoes > idQuestaoAtual)
        {
            CarregaQuestao(atividadeAtualSO.questoes[idQuestaoAtual]);
        }
        else
        {
            gameMenuManager.showMenuAtividadeCompleta();
        }
    }
}