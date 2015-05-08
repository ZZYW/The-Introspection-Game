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
	public delegate void del();
	public static event del breathSensorReady;

	//state control
	States STATE;
	bool isStable = false;
	bool firstLogOut = false, secondLogOut = false, thirdLogOut = false; //log control, make sure log will only be printed once


	//data process
	List<float> dataSetForFixAverage; //list for calculating fixed average
	List<float> processedDataList;
	float dampRate = 0.03f;
	float inhaleExhalePurposeAverage =0.0f;
	int dataSetSize = 500;
	int lengthOfListForGettingFixedAverage = 1000;


	//detect inhale/exhale
	public bool isInhaling = false, isExhaling = false;
	bool isDecreasing = false, isIncreasing = false;
	int decreaseCounter = 0;
	int increaseCounter = 0;
	int falutTolerantThreshold = 10; //how many times we ignore before swtich states between increasing and decrease
	int increaseFaultTolerantCounter = 0;
	int decreaseFaultTolerantCounter = 0;
	public int inhaleDetermineThreshold = 10;
	public int exhaleDetermineThreshold = 8;
	public int deepBreathDetermineThreshold = 85;
	public int inhaleCounter = 0;
	public int deepBreathCounter = 0;


	//data viz
	public bool drawCurve = true;

	void Start () {
		processedDataList = new List<float>();
		dataSetForFixAverage = new List<float>();
	}


	void Update () {
		//get data from sensorInput
		float rawData = sensorInput.getSingleton().rawBreathingValue;
		float processedData = 0.0f;
		processedData = SensorProcessingMethods.smoothDataAddToList(processedDataList, rawData, dampRate ,dataSetSize);

		//start detecing data when actually data comes in
		if(STATE!=States.WAITING_ACTUALLY_SENSOR_INPUT){
			detectInExHale(processedData);
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
			if(breathSensorReady != null){
				breathSensorReady();
			}
			if(!thirdLogOut){
				Debug.Log("Breath Data All Set, Ready to use!");
				thirdLogOut = true;
			}
			STATE++;
		break;
		}

		if(drawCurve){
				SensorProcessingMethods.drawCurves(processedDataList,inhaleExhalePurposeAverage,isStable);
		}
	}
	

	void detectInExHale(float newInput){

//		if(processedDataList.Count>=2){ //rocessedDataList[processedDataList.Count-2]

			//when neither increasing nor decreasing
			if(!isIncreasing && !isDecreasing){
				//if the new data is greater than the previous one, then turn on Increasing flag. 
				if(newInput > processedDataList[processedDataList.Count-2]){
					isIncreasing = true;
				}else if(newInput < processedDataList[processedDataList.Count-2]){
				//if the new data is greater than the previous one, then turn on Increasing flag. 
					isDecreasing = true;
				}
			}


	/* if increasing(exhale) flag is On.
	 * verify if next coming data is still smaller than its previous data
	 * if YES, then add up 1 into increasing counter,
	 * if NO && increaseFaultTolerantCounter hasn't reached the falutTolerantThreshold
	 * then add one to increaseFaultTolerantCounter
	 * If increaseFaultTolerantCounter has already reached the falutTolerantThreshold
	 * then turn increasing flag to false and clear increaseFaultTolerantCounter and increaseCounter to 0
	 * Decreasing(inhale) works exactly the same way.
				 */

			if(isIncreasing){
				if(newInput > processedDataList[processedDataList.Count-2]){
					increaseCounter++;
	 
				}else if(newInput < processedDataList[processedDataList.Count-2]){ 
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
				if(newInput < processedDataList[processedDataList.Count-2]){
					decreaseCounter++;
				}else if(newInput > processedDataList[processedDataList.Count-2]){
					if(decreaseFaultTolerantCounter < falutTolerantThreshold){
						decreaseFaultTolerantCounter++;
					}else{
						decreaseCounter = 0;
						isDecreasing = false;
						decreaseFaultTolerantCounter = 0;
					}

				}
			}
			
			//by knowing the level of the increasing/decreasing, we know wheather the user is inhaling or exhaling.
			//the inhaleDetermineThreshold & exhaleDetermineThreshold is a small number that used to filter noise.

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

			//if the decreasing is deeper than a certain threshold, then we add one to the deep breath counter.
			if(decreaseCounter>=deepBreathDetermineThreshold){
				deepBreathCounter++;
			}

		}

//	}



}
