using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameMenuManager : MonoBehaviour
{
    [Header("Game Top Menu")]
    public S_ModoCertoErrado_Cronometro scriptCronometro;
    public TextMeshProUGUI correctAnswerText;
    public TextMeshProUGUI timeText;
    public TextMeshProUGUI wrongAnswerText;
    private int acertos;
    private int erros;

    [Header("Backgrounds Images")]
    public GameObject portuguesImage;
    public GameObject geografiaImage;
    public GameObject historiaImage;
    public GameObject cienciasImage;
    public GameObject artesImage;
    public GameObject geralImage;
    public GameObject gameImage;

    [Header("Menu Atividade Completa")]
    public GameObject menuAtividadeCompleta;
    public TextMeshProUGUI numAcertosText;
    public TextMeshProUGUI numErrosText;
    public TextMeshProUGUI numTempoText;

    private void Start()
    {
        acertos = 0;
        erros = 0;
        GameManager.Instance.LoadGameSceneElements();
    }

    public void setBackgroundImage(string name)
    {
        print(name);
        if (name.Equals("Português"))
        {
            portuguesImage.SetActive(true);
        }else if (name.Equals("Geografia"))
        {
            geografiaImage.SetActive(true);
        }else if (name.Equals("História"))
        {
            historiaImage.SetActive(true);
        }else if (name.Equals("Ciências"))
        {
            cienciasImage.SetActive(true);
        }else if (name.Equals("Artes"))
        {
            artesImage.SetActive(true);
        }else if (name.Equals("Conhecimentos Gerais"))
        {
            geralImage.SetActive(true);
        }else
        {
            gameImage.SetActive(true);
        }
    }

    public void setAcerto(bool op)
    {
        if (op)
        {
            acertos++;
            correctAnswerText.SetText(acertos.ToString());
        }
        else
        {
            erros++;
            wrongAnswerText.SetText(erros.ToString());
        }
        print(acertos + "   " + erros);
    }

    public void showMenuAtividadeCompleta()
    {
        int.TryParse(correctAnswerText.text, out int numAcertos);
        int.TryParse(wrongAnswerText.text, out int numErros);
        string numTempo = scriptCronometro.getTimeAndStopCount();

        numAcertosText.SetText("Acertos: " + numAcertos);
        numErrosText.SetText("Erros: " + numErros);
        numTempoText.SetText("Tempo: " + numTempo);

        menuAtividadeCompleta.SetActive(true);
    }

    public void returnToMenuScene()
    {
        print("Devo voltar para a cena Menu na tela = " + GameManager.Instance.atividadeAtualSO.whereToReturn);
        SceneManager.LoadScene("Menus", LoadSceneMode.Single);
    }
}