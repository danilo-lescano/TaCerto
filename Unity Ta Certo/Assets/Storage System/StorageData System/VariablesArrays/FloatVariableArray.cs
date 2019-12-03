using System;
namespace UnityEngine.SaveSystem{
    [Serializable]
    public class FloatVariableArray : IBaseVariable{
        float[] _value;
        public System.Object value {
            get{
                return (System.Object) _value;
            }
            set{
                _value = (float[]) value;
            }
        }
    }
}