using UnityEngine;
using System.Collections;

public class BreathDataProcesser : MonoBehaviour {

	float rawData;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		rawData = sensorInput.getSingleton().rawBreathingValue;
		Debug.Log(rawData);
	}
}
