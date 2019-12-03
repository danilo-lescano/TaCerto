using System;
namespace UnityEngine.SaveSystem{
    [Serializable]
    public class IntegerVariable : IBaseVariable{
        int _value;
        public System.Object value {
            get{
                return (System.Object) _value;
            }
            set{
                _value = (int) value;
            }
        }
    }
}