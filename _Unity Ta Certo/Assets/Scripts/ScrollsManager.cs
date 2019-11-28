using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ScrollsManager : MonoBehaviour
{
    [Header("Subjects elements")]
    public ScrollRect subjectsScrollView;
    public GameObject subjectsScrollContent;
    public GameObject subjectPanelPrefab;
    private List<Disciplina> subjectsList { get; set; }

    [Header("Activities elements")]
    public ScrollRect activitiesScrollView;
    public GameObject activitiesScrollContent;
    public GameObject activityPanelPrefab;

    private List<Atividade> activitiesList { get; set; }

    public void CreateSubjectList(List<Disciplina> disciplinas)
    {
        ClearChildren(activitiesScrollContent.transform);
        subjectsList = disciplinas;

        foreach(Disciplina d in subjectsList)
        {
            GenerateSubjectItem(d);
        }
    }

    void GenerateSubjectItem(Disciplina disciplina)
    {
        GameObject scrollItem = Instantiate(subjectPanelPrefab);
        SubjectPanel prefabScript = scrollItem.GetComponent<SubjectPanel>();
        prefabScript.setSubject(disciplina);

        scrollItem.transform.SetParent(subjectsScrollContent.transform, false);    
    }

    public void CreateActivityList(List<Atividade> atividades)
    {
        ClearChildren(activitiesScrollContent.transform);
        activitiesList = atividades;
        foreach(Atividade a in activitiesList)
        {
            GenerateActivityItem(a);
        }
    }

    void GenerateActivityItem(Atividade atividade)
    {
        GameObject activityScrollItem = Instantiate(activityPanelPrefab);
        QuestionButton prefabScript = activityScrollItem.GetComponent<QuestionButton>();
        prefabScript.setActivity(atividade);

        activityScrollItem.transform.SetParent(activitiesScrollContent.transform, false);
    }

    public void ClearChildren(Transform transform)
    {
        float i = 0;
        foreach (Transform child in transform)
        {
            i += 1;
            DestroyImmediate(child.gameObject);
        }
    }
}