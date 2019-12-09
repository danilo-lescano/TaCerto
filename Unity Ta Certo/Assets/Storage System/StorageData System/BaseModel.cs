using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace UnityEngine.SaveSystem {
    [Serializable]
    public class BaseModel {
        public List<string> Key { get; set; }
        public List<IBaseVariable> Value { get; set; }
        public BaseModel() {
            Key = new List<string>();
            Value = new List<IBaseVariable>();
        }
        public void Add(string Key, IBaseVariable Value) {
            this.Key.Add(Key);
            this.Value.Add(Value);
        }
        public IBaseVariable this[string Key] {
            get {
                for (int i = 0; i < this.Key.Count; i++)
                    if(this.Key[i] == Key)
                        return Value[i];
                return null;
            }
            set {
                for (int i = 0; i < this.Key.Count; i++)
                    if(this.Key[i] == Key)
                        this.Value[i] = value;
            }
        }
        public IBaseVariable this[int index] {
            get {
                if(index >= 0 && index < this.Key.Count)
                    return this.Value[index];
                return null;
            }
            set {
                if(index >= 0 && index < this.Key.Count)
                    this.Value[index] = value;
            }
        }
    }
}