using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SaveSystem;
public class ManagerNPC : MonoBehaviour{
    public TextMeshProUGUI nome, hp, mana;
    public SampleBaseScriptable sampleBaseScriptable;
    void Start(){
        sampleBaseScriptable.Load();
    }

    void Update(){
        nome.text = sampleBaseScriptable.npcName;
        hp.text = sampleBaseScriptable.hp.ToString();
        mana.text = sampleBaseScriptable.mana.ToString();
    }

    public void Save(){
        print("Save");
        sampleBaseScriptable.Save();
    }
    public void Load(){
        print("Load");
        sampleBaseScriptable.Load();
    }
    
    public void dano(){
        print("dano");
        sampleBaseScriptable.hp--;
    }
    public void cura(){
        print("cura");
        sampleBaseScriptable.hp++;
    }
    public void magia(){
        print("magia");
        sampleBaseScriptable.mana--;
    }
    public void pocao(){
        print("pocao");
        sampleBaseScriptable.mana++;
    }
}