using System;
using System.Reflection;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UnityEngine.SaveSystem {
    public class BaseScriptable : ScriptableObject {
        public string ID;

        public BaseModel ListValue;

        public void Save() {
            SaveOnList();
            StorageData.SaveData(ListValue, ID);
        }
        public void Load() {
            Type fieldsType = this.GetType();
            FieldInfo[] fields = fieldsType.GetFields(BindingFlags.Public | BindingFlags.Instance);
            ListValue = StorageData.LoadData(ID);
            if(ListValue == null) {
                ListValue = new BaseModel();
                for(int i = 0; i < fields.Length; i++) {
                    //Debug.Log(fields[i].Name + " : " + fields[i].GetValue(this) + " : " + fields[i].ReflectedType + " : " + fields[i].FieldType);
                    AddValueToList(fields[i]);
                }
            }
            else {
                LoadFromList();
            }
        }
        public void SaveOnList() {
            ListValue = new BaseModel();
            Type fieldsType = this.GetType();
            FieldInfo[] fields = fieldsType.GetFields(BindingFlags.Public | BindingFlags.Instance);
            for(int i = 0; i < fields.Length; i++)
                AddValueToList(fields[i]);
        }
        public void LoadFromList() {
            Type fieldsType = this.GetType();
            FieldInfo[] fields = fieldsType.GetFields(BindingFlags.Public | BindingFlags.Instance);
            for(int i = 0; i < fields.Length; i++) {
                if(ListValue[fields[i].Name] != null) {
                    if(fields[i].FieldType.IsSubclassOf(typeof(BaseScriptable))){
                        Debug.Log(fields[i].FieldType);
                        BaseScriptable bs = (BaseScriptable)ScriptableObject.CreateInstance(fields[i].FieldType);
                        bs.ListValue = (BaseModel)ListValue[fields[i].Name].value;
                        Debug.Log(bs.ListValue.Key.Count);
                        for (int j = 0; j < bs.ListValue.Key.Count; j++){
                            Debug.Log(bs.ListValue.Key[i] + " " + bs.ListValue.Value[i]);
                        }
                        bs.LoadFromList();
                        bs.printsh();
                        fields[i].SetValue(this, (System.Object)bs);
                    }
                    else
                        fields[i].SetValue(this, ListValue[fields[i].Name].value);
                }
            }
        }
        public void printsh(){
            Debug.Log(ListValue.Key.Count);
            for (int i = 0; i < ListValue.Key.Count; i++){
                Debug.Log(ListValue.Key[i] + " " + ListValue.Value[i]);
            }
        }
        private void AddValueToList(FieldInfo f) {
            IBaseVariable variable = null;
            if(f.FieldType.ToString() == "System.String")
                variable = new StringVariable();
            else if(f.FieldType.ToString() == "System.Int32")
                variable = new IntegerVariable();
            else if(f.FieldType.ToString() == "System.Single")
                variable = new FloatVariable();
            else if(f.FieldType.ToString() == "System.Boolean")
                variable = new BooleanVariable();
            else if(f.FieldType.ToString() == "System.String[]")
                variable = new StringVariableArray();
            else if(f.FieldType.ToString() == "System.Int32[]")
                variable = new IntegerVariableArray();
            else if(f.FieldType.ToString() == "System.Single[]")
                variable = new FloatVariableArray();
            else if(f.FieldType.ToString() == "System.Boolean[]")
                variable = new BooleanVariableArray();
            else if(f.FieldType.ToString() == "UnityEngine.Vector2")
                variable = new Vector2Variable();
            else if(f.FieldType.ToString() == "UnityEngine.Vector3")
                variable = new Vector3Variable();
            else if(f.FieldType.ToString() == "UnityEngine.Vector2[]")
                variable = new Vector2VariableArray();
            else if(f.FieldType.ToString() == "UnityEngine.Vector3[]")
                variable = new Vector3VariableArray();

            if(variable != null) {
                variable.value = f.GetValue(this);
                ListValue.Add((string) f.Name, variable);
            }

            if(f.FieldType.IsSubclassOf(typeof(BaseScriptable))){
                Debug.Log(f.FieldType);
                Debug.Log(f.FieldType);
                Debug.Log(f.FieldType);
                Debug.Log(f.FieldType);
                Debug.Log(f.FieldType);
                //BaseScriptable bs = (BaseScriptable)Activator.CreateInstance(f.FieldType);
                //bs.ListValue

                variable = new BaseModelVariable();
                BaseScriptable baseScriptable = ((BaseScriptable)f.GetValue(this));
                baseScriptable.SaveOnList();
                variable.value = baseScriptable.ListValue;
                Debug.Log(((BaseModel)variable.value).Key.Count);

                ListValue.Add((string) f.Name, variable);
            }
        }
    }
}