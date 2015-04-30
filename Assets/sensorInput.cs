using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Uniduino;

public class sensorInput : MonoBehaviour {

	public Arduino arduino;
	public int breathSensorPin = 0;
	volatile int Signal; //holds the incoming raw data

	List<float> rawDataList = new List<float>();
	List<float> xList = new List<float>();

//	//Interrupt
////	volatile int rate[10];   
//	volatile int[] rate;// array to hold last ten IBI values
//	volatile float sampleCounter = 0.0f;          // used to determine pulse timing
//	volatile float lastBeatTime = 0.0f;           // used to find IBI
//	volatile int P =512;                      // used to find peak in pulse wave, seeded
//	volatile int T = 512;                     // used to find trough in pulse wave, seeded
//	volatile int thresh = 525;                // used to find instant moment of heart beat, seeded
//	volatile int amp = 100;                   // used to hold amplitude of pulse waveform, seeded
//	volatile bool firstBeat = true;        // used to seed rate array so we startup with reasonable BPM
//	volatile bool secondBeat = false;      // used to seed rate array so we startup with reasonable BPM

	// Use this for initialization
	void Start () {
//		rate = new int[10];
		arduino = Arduino.global;
		arduino.Setup(ConfigurePins);
	}

	void ConfigurePins( )
	{
		arduino.pinMode(0, PinMode.ANALOG);
		arduino.reportAnalog(0,1); //report status
	}

	float incrX = 0.0f;
	float xIncrement = 0.4f;

	// Update is called once per frame
	void Update () {
//		Debug.Log(arduino.analogRead(breathSensorPin));
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
