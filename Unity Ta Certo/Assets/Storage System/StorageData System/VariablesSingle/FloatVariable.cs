using System;
namespace UnityEngine.SaveSystem{
    [Serializable]
    public class FloatVariable : IBaseVariable{
        float _value;
        public System.Object value {
            get{
                return (System.Object) _value;
            }
            set{
                _value = (float) value;
            }
        }
    }
}