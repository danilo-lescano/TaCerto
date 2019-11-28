using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CertoErradoManager : MonoBehaviour
{
    public AtividadeAtual atividadeAtual;
    private Questao questaoAtual;

    [Header("Sem Foto")]
    public GameObject certoErradoSemFotoPrefab;
    public TextMeshProUGUI certoErradoSemFotoText;

    [Header("Com Foto")]
    public GameObject certoErradoComFotoPrefab;
    public TextMeshProUGUI certoErradoComFotoText;
    public Image certoErradoImage;

    [Header("Botões")]
    public GameObject certoErradoBotoesPrefab;
    public Button botaoCerto;
    public Button botaoErrado;

    private bool currentAnswer;

    public void AtivaCertoErradoSemFoto(int idQuestaoAtual)
    {
        questaoAtual = atividadeAtual.questoes[idQuestaoAtual];
        ConteudoCertoErrado conteudo = (ConteudoCertoErrado)questaoAtual.conteudo;

        currentAnswer = conteudo.IsVerdadeiro;
        certoErradoSemFotoText.SetText(questaoAtual.enunciado);
        certoErradoSemFotoPrefab.SetActive(true);
        certoErradoBotoesPrefab.SetActive(true);
    }

    public void AtivaCertoErradoComFoto(string problemText, bool op, Sprite image)
    {
        currentAnswer = op;
        certoErradoSemFotoText.SetText(problemText);
        certoErradoImage.sprite = image;
        certoErradoComFotoPrefab.SetActive(true);
        certoErradoBotoesPrefab.SetActive(true);
    }

    public void RespondeCertoErrado(bool op)
    {
        bool acertou = false;
        if(op == currentAnswer)
        {
            print("ACERTOU!!");
            acertou = true;
        }
        else
        {
            print("ERROU!!");
        }

        GameManager.Instance.SetAnswer(acertou);
    }

    public void DesativaCertoErrado()
    {
        certoErradoSemFotoPrefab.SetActive(false);
        certoErradoComFotoPrefab.SetActive(false);
        certoErradoBotoesPrefab.SetActive(false);
    }
}