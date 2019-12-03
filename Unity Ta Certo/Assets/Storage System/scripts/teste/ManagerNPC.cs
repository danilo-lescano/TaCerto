using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SaveSystem;
public class ManagerNPC : MonoBehaviour{
    public TextMeshProUGUI nome, hp, mana;
    public TextMeshProUGUI nomefilho, hpfilho, manafilho;
    public SampleBaseScriptable sampleBaseScriptable;
    void Start(){
        sampleBaseScriptable.Load();
    }

    void Update(){
        nome.text = sampleBaseScriptable.npcName;
        hp.text = sampleBaseScriptable.hp.ToString();
        mana.text = sampleBaseScriptable.mana.ToString();

        nomefilho.text = sampleBaseScriptable.sb2.npcName;
        hpfilho.text = sampleBaseScriptable.sb2.hp.ToString();
        manafilho.text = sampleBaseScriptable.sb2.mana.ToString();
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

    
    public void danofilho(){
        print("dano");
        sampleBaseScriptable.sb2.hp--;
    }
    public void curafilho(){
        print("cura");
        sampleBaseScriptable.sb2.hp++;
    }
    public void magiafilho(){
        print("magia");
        sampleBaseScriptable.sb2.mana--;
    }
    public void pocaofilho(){
        print("pocao");
        sampleBaseScriptable.sb2.mana++;
    }
}