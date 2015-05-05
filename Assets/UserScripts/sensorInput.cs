using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Uniduino;

public class sensorInput : MonoBehaviour {

	private static sensorInput singleton = null;

	public static sensorInput getSingleton(){
		return singleton;
	}

	public Arduino arduino;

	//pins
	public int breathSensorPin = 0;
	public int pulseBeatPin = 2;

	//rawValues
	public float heartBeatValue = 0.0f; 
	public float rawBreathingValue = 0.0f;

	List<float> rawDataList = new List<float>();
	List<float> xList = new List<float>();
	
	void Start () {
		singleton = this;
		arduino = Arduino.global;
		arduino.Setup(ConfigurePins);
	}

	void ConfigurePins( )
	{
		arduino.pinMode(0, PinMode.ANALOG);
		arduino.pinMode(1, PinMode.ANALOG);
		arduino.pinMode(2,PinMode.ANALOG);
		arduino.reportAnalog(0,1); //report status
		arduino.reportAnalog(1,1); //report statu
		arduino.reportAnalog(2,1);
	}

	//for drawing debug line
	float incrX = 0.0f;
	float xIncrement = 0.4f;

	// Update is called once per frame
	void Update () {
//		Debug.Log(arduino.analogRead(breathSensorPin));
		heartBeatValue = arduino.analogRead(pulseBeatPin);
		rawBreathingValue = arduino.analogRead(breathSensorPin);

		//for drawing debug line
		rawDataList.Add(arduino.analogRead(breathSensorPin));

		xList.Add(incrX);
		incrX+=xIncrement;

		for(int i=1; i< rawDataList.Count;i++){
			Vector3 point_one = new Vector3(xList[i-1],rawDataList[i-1],0);
			Vector3 point_two = new Vector3(xList[i],rawDataList[i],0);
			Debug.DrawLine(point_one,point_two);
		}

	}
	


}
