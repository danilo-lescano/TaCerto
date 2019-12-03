using System;
namespace UnityEngine.SaveSystem{
    [Serializable]
    public class IntegerVariableArray : IBaseVariable{
        int[] _value;
        public System.Object value {
            get{
                return (System.Object) _value;
            }
            set{
                _value = (int[]) value;
            }
        }
    }
}