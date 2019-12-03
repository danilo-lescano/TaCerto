using System;
namespace UnityEngine.SaveSystem{
    [Serializable]
    public class StringVariableArray : IBaseVariable{
        string[] _value;
        public System.Object value {
            get{
                return (System.Object) _value;
            }
            set{
                _value = (string[]) value;
            }
        }
    }
}