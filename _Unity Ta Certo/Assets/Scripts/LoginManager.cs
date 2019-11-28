using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Text;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;

public class LoginManager : MonoBehaviour
{
    private const string TESTE_URL = "https://localhost:5001/api/pessoas/";
    private const string LOGIN_URL = "https://localhost:5001/api/pessoas/";

    public TMP_InputField emailInputField;
    public TMP_InputField passwordInputField;

    public GameObject menuDeslogado;
    public GameObject menuLogado;

    public LoadManager loadManager;

    private void Awake()
    {
        RestClient.Instance.IsAlive();
        GameManager.Instance.IsAlive();
        CheckIfHasToken();
        //PlayerPrefs.DeleteAll();

    }

    public void CheckIfHasToken()
    {
        if (PlayerPrefs.HasKey("token") && PlayerPrefs.HasKey("idtoken"))
        {
            int idtoken = PlayerPrefs.GetInt("idtoken");

            StartCoroutine(RestClient.Instance.Get(1, "token/"+ idtoken, GetPessoaToken));
        }else if (PlayerPrefs.HasKey(GameConstants.NUM_DISCIPLINAS_PATH))
        {
            Debug.LogWarning("Carregando tudo pelo dispositivo");
            loadManager.LoadFromDevice();
        }
        else
        {
            loadManager.LoadDefault();
        }
    }

    public void validarELogar(){
        string email = emailInputField.text.ToString();
        string password = passwordInputField.text.ToString();

        if (string.IsNullOrEmpty(email))
        {
            print("Mostrar erro de falta de email");
            return;
        }else if (string.IsNullOrEmpty(password))
        {
            print("Mostrar erro de falta de senha");
            return;
        }

        PessoaLogin pessoaLogin = new PessoaLogin(email, password);
        string pessoaString = JsonConvert.SerializeObject(pessoaLogin);

        StartCoroutine(RestClient.Instance.LoginPost(1, "", pessoaString, GetPessoaToken));
    } 

    void GetPessoaToken(string jsonResult, int id, int id2)
    {
        print(jsonResult);

        try
        {
            PessoaToken pessoaToken = JsonUtility.FromJson<PessoaToken>(jsonResult);

            if (pessoaToken.autenticado)
            {
                print("Autenticado");
                GameManager.Instance.PessoaToken = pessoaToken;
                PlayerPrefs.SetString("token", pessoaToken.token);
                PlayerPrefs.SetInt("idtoken", pessoaToken.idPessoaToken);
                PlayerPrefs.Save();

                loadManager.loadScreen.SetActive(true);
                if (!PlayerPrefs.HasKey(GameConstants.NUM_DISCIPLINAS_PATH))
                {
                    Debug.LogWarning("Carregando tudo pela API");
                    loadManager.LoadStartInfo();
                }
                else
                {
                    Debug.LogWarning("Carregando tudo pelo dispositivo");
                    loadManager.LoadFromDevice();
                }
                menuDeslogado.SetActive(false);
                menuLogado.SetActive(true);
            }
            else
            {
                menuDeslogado.SetActive(true);
                menuLogado.SetActive(false);
                Debug.Log("Mostrar que email ou senha estão errados.");
            }
        }catch(ArgumentException e)
        {
            Debug.Log("Login inválido - " + e);
        }
    }
}