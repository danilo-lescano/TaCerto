using System;
namespace UnityEngine.SaveSystem{
    [Serializable]
    public class StringVariable : IBaseVariable{
        string _value;
        public System.Object value {
            get{
                return (System.Object) _value;
            }
            set{
                _value = (string) value;
            }
        }
    }
}