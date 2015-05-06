using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class BreathDataProcesser : MonoBehaviour {

	enum States {
		WAITING_ACTUALLY_SENSOR_INPUT,
		GETTING_FIX_AVERAGE,
		READY,
		RUNNING
	}

	States STATE;
	bool isStable = false;
	bool firstLogOut = false, secondLogOut = false, thirdLogOut = false; //log control, make sure log will only be printed once
	List<float> dataSetForFixAverage; //list for calculating fixed average
	public List<float> processedDataList;
	public float dampRate = 0.06f;
	public float totalAverage = 0.0f;
	public float inhaleExhalePurposeAverage =0.0f;
	int dataSetSize = 500;
	int lengthOfListForGettingFixedAverage = 1000;
	public float noiseRange = 50.0f;
	

	void Start () {
		processedDataList = new List<float>();
		dataSetForFixAverage = new List<float>();
	}
	
	void Update () {
		//get data from sensorInput
		float rawData = sensorInput.getSingleton().rawBreathingValue;
		float processedData = 0.0f;

		//get at least one data into the list
		if(processedDataList.Count == 0){
			processedDataList.Add(rawData);
		}else{
			//smoother
			float difference = rawData - processedDataList[processedDataList.Count-1];
			processedData = processedDataList[processedDataList.Count-1] + ( difference * dampRate );
			processedDataList.Add(processedData);
			//limit list's size to dataSetSize
			if(processedDataList.Count > dataSetSize){
				processedDataList.RemoveAt(0);
			}
		}

		//state control
		//super niubi!

		switch(STATE){

		case States.WAITING_ACTUALLY_SENSOR_INPUT:
		if(!firstLogOut){
			Debug.Log("Waiting for the actual sensor data come in......");
			firstLogOut = true;
		}
		if(processedDataList.Count >= dataSetSize){
			STATE++;
		}
		break;


		case States.GETTING_FIX_AVERAGE:
			if(!secondLogOut){
				Debug.Log ("Trying to get the fixed average value by collect " + lengthOfListForGettingFixedAverage
				           + "breath input data...");
				secondLogOut = true;
			}
			//add data into dataSetForFixedAverage, when the lengh reaches lengthOfListForGettingFixedAverage
			//then calculate the fixed average, pretty useful!
			dataSetForFixAverage.Add(processedData);
			if(dataSetForFixAverage.Count > lengthOfListForGettingFixedAverage){
			float temp_sum = 0.0f;
			for(int i=0;i<dataSetForFixAverage.Count;i++){
				temp_sum += dataSetForFixAverage[i];
			}
			inhaleExhalePurposeAverage = temp_sum/dataSetForFixAverage.Count;
			if(inhaleExhalePurposeAverage != 0){
				dataSetForFixAverage.Clear(); //clear the list to release some memory
				dataSetForFixAverage = null;
				STATE++;
			}
		}
		break;


		case States.READY:
			isStable = true;
			if(!thirdLogOut){
				Debug.Log("Breath Data All Set, Ready to use!");
				thirdLogOut = true;
			}
			STATE++;
		break;
		}

		drawCurves();

	}

	void drawCurves(){
		if(processedDataList.Count>2){
			for(int i=1; i< processedDataList.Count;i++){
				Vector3 point_one = new Vector3(i-1,processedDataList[i-1]);
				Vector3 point_two = new Vector3(i,processedDataList[i]);
				Debug.DrawLine(point_one,point_two);
			}
		}

		if(isStable){
			Debug.DrawLine(new Vector2(0,inhaleExhalePurposeAverage),new Vector2(processedDataList.Count,inhaleExhalePurposeAverage));
		}
	}
}
