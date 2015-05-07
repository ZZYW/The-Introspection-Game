using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GSRDataProcessor : MonoBehaviour {

	enum States {
		WAITING_ACTUALLY_SENSOR_INPUT,
		READY,
		RUNNING
	}


	List<float> processedDataList;
	float dampRate = 0.04f;

	public bool drawCurve;


	// Use this for initialization
	void Start () {
		processedDataList = new List<float>();
	}
	
	// Update is called once per frame
	void Update () {
		float rawData = sensorInput.getSingleton().gsrRawValue;
//		float processedData

		if(drawCurve){
			SensorProcessingMethods.drawCurves(processedDataList);
		}
	}


}
