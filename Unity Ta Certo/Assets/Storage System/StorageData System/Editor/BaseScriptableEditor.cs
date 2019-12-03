using UnityEditor;
using UnityEngine;
using System.Collections.Generic;

namespace UnityEngine.SaveSystem{
    [CustomEditor(typeof(BaseScriptable), true)]
    public class BaseScriptableEditor : Editor {
        //private BaseScriptable myTarget;

        void OnEnable(){
            //smyTarget = (BaseScriptable) target;
        }

        public override void OnInspectorGUI(){
            base.OnInspectorGUI();
            EditorGUILayout.HelpBox("Application path: " + Application.persistentDataPath, MessageType.Info);
        }
    }
}