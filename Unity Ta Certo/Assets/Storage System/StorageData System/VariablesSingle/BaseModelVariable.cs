using System;
using UnityEngine;
namespace UnityEngine.SaveSystem {
    [Serializable]
    public class BaseModelVariable : IBaseVariable {
        string[] _key;
        IBaseVariable[] _value;

        public System.Object value {
            get {
                BaseModel bm = new BaseModel();
                for(int i = 0; i < _key.Length; i++)
                    bm.Add(_key[i], _value[i]);
                return (System.Object)bm;
            }
            set {
                BaseModel bm = (BaseModel) value;
                _key = new string[bm.Key.Count];
                _value = new IBaseVariable[bm.Key.Count];
                for(int i = 0; i < bm.Key.Count; i++) {
                    _key[i] = bm.Key[i];
                    _value[i] = bm.Value[i];
                }
            }
        }
    }
}