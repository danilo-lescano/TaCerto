using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class QuestionButton : MonoBehaviour
{
    public Atividade activity;
    private Color buttonColor;
    public TextMeshProUGUI activityNameText;

    public void setActivity(Atividade atividade)
    {
        activity = atividade;
        setNameText();
    }

    private void setNameText()
    {
        activityNameText.text = activity.titulo.ToString();
    }

    public void setButtonColor(Color color)
    {
        buttonColor = color;
    }

    public void openActivityScreen()
    {
        GameManager.Instance.SetCurrentActivity(activity);
    }
}
