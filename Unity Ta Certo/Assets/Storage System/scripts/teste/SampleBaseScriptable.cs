using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SaveSystem;

[CreateAssetMenu(menuName = "Save System/Sample Character")]
public class SampleBaseScriptable : BaseScriptable{
    public string npcName;
    public int hp;
    public int mana;

    public string stringtype;
    public int inttype;
    public float floattype;
    public bool booltype;
    public Vector2 v2;
    public Vector3 v3;
    public string[] stringtypearr;
    public int[] inttypearr;
    public float[] floattypearr;
    public bool[] booltypearr;
    public Vector2[] v2arr;
    public Vector3[] v3arr;
}