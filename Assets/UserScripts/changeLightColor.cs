using UnityEngine;
using System.Collections;

public class changeLightColor : MonoBehaviour {

	Light theLight;

	// Use this for initialization
	void Start () {
		theLight = gameObject.GetComponent<Light>();
	}
	
	// Update is called once per frame
	void Update () {
//		theLight.color = Color.black;
	}
}
