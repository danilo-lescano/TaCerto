using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class SubjectPanel : MonoBehaviour
{
    private Disciplina subject;
    private List<Atividade> activities;
    public Color panelColor;
    public Image subjectButtonImage;
    public TextMeshProUGUI subjectNameText;
    public Image iconImage;

    public void setSubject(Disciplina disc)
    {
        subject = disc;
        setNameText();
        setButtonColor();
    }

    private void setNameText()
    {
        subjectNameText.text = subject.nome;
    }

    private void setButtonColor()
    {
        float r = subject.corR / 255f;
        float g = subject.corG / 255f;
        float b = subject.corB / 255f;
        subjectButtonImage.color = new Color(r, g, b, subject.corA);
    }

    public void openActivitiesScreen()
    {
        print("Abrir a tela de questões da disciplina " + subject.nome + "\n");
        GameManager.Instance.SetDisciplina(subject.nome);
        GameManager.Instance.SetIdDisciplina(subject.idDisciplina);
        GameManager.Instance.SetActivitiesTitleText(subject.nome);
        GameManager.Instance.loadManager.loadActivitiesOfSubject(subject.idDisciplina);
    }
}