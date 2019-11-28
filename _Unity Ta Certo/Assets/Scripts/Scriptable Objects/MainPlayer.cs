using UnityEngine;

[CreateAssetMenu( menuName = "MainPlayer")]
public class MainPlayer : ScriptableObject
{
    public long idPessoa;
    public string instituicao;
    public string nome;
    public string cpf;
    public string email;
}