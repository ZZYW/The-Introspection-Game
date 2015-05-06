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
	public bool isInhaling = false, isExhaling = false;
	List<float> dataSetForFixAverage; //list for calculating fixed average
	List<float> processedDataList;
	public float dampRate = 0.06f;
	public float totalAverage = 0.0f;
	public float inhaleExhalePurposeAverage =0.0f;
	int dataSetSize = 500;
	int lengthOfListForGettingFixedAverage = 1000;
	public float noiseRange = 50.0f;

	public bool isDecreasing = false, isIncreasing = false;
	public int decreaseCounter = 0;
	public int increaseCounter = 0;
	int falutTolerantThreshold = 5;
	int increaseFaultTolerantCounter = 0;
	int decreaseFaultTolerantCounter = 0;
	public int inhaleDetermineThreshold = 10;
	public int exhaleDetermineThreshold = 8;
	public int deepBreathDetermineThreshold = 25;
	public int inhaleCounter = 0;
	public int deepBreathCounter = 0;


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
			detectInExHale(processedData);
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
				Vector2 point_one = new Vector2(i-1,processedDataList[i-1]);
				Vector2 point_two = new Vector2(i,processedDataList[i]);
				Debug.DrawLine(point_one,point_two);
			}
		}

		if(isStable){
			Debug.DrawLine(new Vector2(0,inhaleExhalePurposeAverage),new Vector2(processedDataList.Count,inhaleExhalePurposeAverage));
		}
	}


	void detectInExHale(float newInput){


		if(!isIncreasing && !isDecreasing){
			if(newInput > processedDataList[processedDataList.Count-1]){
				isIncreasing = true;
			}else if(newInput < processedDataList[processedDataList.Count-1]){
				isDecreasing = true;
			}
		}

		if(isIncreasing){
			if(newInput > processedDataList[processedDataList.Count-1]){
				increaseCounter++;
			}else if(newInput < processedDataList[processedDataList.Count-1]){
				if(increaseFaultTolerantCounter < falutTolerantThreshold){
					increaseFaultTolerantCounter++;
				}else{
					increaseCounter = 0;
					isIncreasing = false;
					increaseFaultTolerantCounter = 0;
				}
			}
		}

		if(isDecreasing){
			if(newInput < processedDataList[processedDataList.Count-1]){
				decreaseCounter++;
			}else if(newInput > processedDataList[processedDataList.Count-1]){
				if(decreaseFaultTolerantCounter < falutTolerantThreshold){
					decreaseFaultTolerantCounter++;
				}else{
					decreaseCounter = 0;
					isDecreasing = false;
					decreaseFaultTolerantCounter = 0;
				}

			}
		}

		if(increaseCounter>=inhaleDetermineThreshold){
			isExhaling = true;
		}else if(increaseCounter < inhaleDetermineThreshold){
			isExhaling = false;
		}
		if(decreaseCounter >= exhaleDetermineThreshold){
			isInhaling = true;
		}else if(decreaseCounter < exhaleDetermineThreshold){
			isInhaling = false;
		}

//		if(increaseCounter>=deepBreathDetermineThreshold){
//			deepBreathCounter++;
//		}


	}



}
