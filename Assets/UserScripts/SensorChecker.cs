using UnityEngine;
using System.Collections;

public class SensorChecker : MonoBehaviour {

	bool breathSensorReady = false;
	bool pulseSensorReady = false;
	bool gsrSensorReady = false;


	void OnEnable(){
		BreathDataProcesser.breathSensorReady += makeBreathSensorReady;
	}
	// Use this for initialization
	void Start () {
	
	}

	void makeBreathSensorReady(){
		breathSensorReady = true;
	}
	void makePulseSensorReady(){
		pulseSensorReady = true;
	}
	void makeGSRSensorReady(){
		gsrSensorReady = true;
	}

	// Update is called once per frame
	void Update () {
	
	}
}
