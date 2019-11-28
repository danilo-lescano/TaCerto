using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

public class RestClient : MonoBehaviour
{
    private static RestClient _instance;
    public int test = 1231;
    private const string LOGIN_URL = "https://localhost:5001/api/pessoas/";
    private const string ATIVIDADES_URL = "https://localhost:5001/api/atividades/";

    private void Start()
    {
        gameObject.transform.parent = null; 
    }

    public static RestClient Instance
    {
        get
        {
            if(_instance == null)
            {
                _instance = FindObjectOfType<RestClient>();
                if(_instance == null)
                {
                    GameObject go = new GameObject();
                    go.name = typeof(RestClient).Name;
                    _instance = go.AddComponent<RestClient>();
                    DontDestroyOnLoad(go);
                }
            }
            return _instance;
        }
    }

    public void IsAlive()
    {
        print(name + " is alive");
    }

    private UnityWebRequest SetUpUnityWebRequest(UnityWebRequest unityWebRequest, string url, string method, bool needDownload = false, bool needUpload = false, string bodyJson = null)
    {
        unityWebRequest.url = url;

        unityWebRequest.SetRequestHeader("content-Type", "application/json");
        unityWebRequest.SetRequestHeader("Accept", "application/json");
        unityWebRequest.SetRequestHeader("api-version", "0.1");

        string token = null;
        if (PlayerPrefs.HasKey("token"))
            token = PlayerPrefs.GetString("token");

        unityWebRequest.SetRequestHeader("Authorization", "Bearer " + token);
        if (method.Equals("get"))
        {
            unityWebRequest.method = UnityWebRequest.kHttpVerbGET;
        }else if (method.Equals("post"))
        {
            unityWebRequest.method = UnityWebRequest.kHttpVerbPOST;
        }

        if (needDownload)
        {
            DownloadHandlerBuffer _downloadHandler = new DownloadHandlerBuffer();
            unityWebRequest.downloadHandler = _downloadHandler;
        }
        if (needUpload)
        {
            byte[] bodyRaw = Encoding.UTF8.GetBytes(bodyJson);
            unityWebRequest.uploadHandler = new UploadHandlerRaw(bodyRaw);
        }

        unityWebRequest.useHttpContinue = false;
        unityWebRequest.chunkedTransfer = false;
        unityWebRequest.redirectLimit = 0;

        AcceptAllCertificatesSignedWithASpecificKeyPublicKey certHandler = new AcceptAllCertificatesSignedWithASpecificKeyPublicKey();
        unityWebRequest.certificateHandler = certHandler;

        return unityWebRequest;
            
    }

    public IEnumerator Get(int op, string offset, System.Action<string, int, int> callBack, int id = -1, int id2 = -1)
    {
        string url = getUrl(op) + offset;
        using (UnityWebRequest unityWebRequest = new UnityWebRequest())
        {
            SetUpUnityWebRequest(unityWebRequest, url, "get", true); 

            yield return unityWebRequest.SendWebRequest();

            if (unityWebRequest.isNetworkError)
            {
                Debug.Log("Código de resposta: " + unityWebRequest.error);
            }
            else
            {
                if (unityWebRequest.isDone && unityWebRequest.downloadHandler.isDone)
                {
                    string jsonResult = Encoding.UTF8.GetString(unityWebRequest.downloadHandler.data);

                    callBack(jsonResult, id, id2);
                }
            }
            unityWebRequest.certificateHandler?.Dispose();
        }
    }

    public IEnumerator LoginPost(int op,string offset, string jsonBody, System.Action<string, int, int> callBack, int id = -1)
    {
        string url = getUrl(op) + offset;
        using(UnityWebRequest unityWebRequest = new UnityWebRequest())
        {
            SetUpUnityWebRequest(unityWebRequest, url, "post", true, true, jsonBody);

            yield return unityWebRequest.SendWebRequest();
  
            if (unityWebRequest.isNetworkError)
            {
                Debug.LogError("Código de resposta: " + unityWebRequest.error);
            }
            else
            {
                if(unityWebRequest.isDone && unityWebRequest.downloadHandler.isDone)
                {
                    string jsonResult = Encoding.UTF8.GetString(unityWebRequest.downloadHandler.data);

                    callBack(jsonResult, id, id);
                }
            }

            unityWebRequest.certificateHandler?.Dispose();
        }
    }

    private string getUrl(int op)
    {
        if(op == 1)
        {
            return LOGIN_URL;
        }
        else if(op == 2)
        {
            return ATIVIDADES_URL;
        }else
        {
            return LOGIN_URL;
        }
    }
}