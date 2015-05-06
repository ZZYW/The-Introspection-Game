using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class BreathDataProcesser : MonoBehaviour {



	List<float> processedDataList;
	public float dampRate = 0.06f;
	public float totalAverage = 0.0f;

	//for drawing debug line
	float incrX = 0.0f;
	float xIncrement = 0.4f;


	// Use this for initialization
	void Start () {
		processedDataList = new List<float>();
	}


	
	// Update is called once per frame
	void Update () {
		//get data from sensorInput
		float rawData = sensorInput.getSingleton().rawBreathingValue;

		if(processedDataList.Count == 0){
			processedDataList.Add(rawData);
		}else{
			float difference = rawData - processedDataList[processedDataList.Count-1];
			float processedData = processedDataList[processedDataList.Count-1] + ( difference * dampRate );
			Debug.Log ("currrent processed data -> " + processedData);
			processedDataList.Add(processedData);

			//get total average
			float sum = 0.0f;
			for(int i=0;i< processedDataList.Count; i++){
				sum += processedDataList[i];
			}
			totalAverage = sum/processedDataList.Count;

		}

		if(processedDataList.Count>500){
			processedDataList.RemoveAt(0);
		}

		//draw processed data
		if(processedDataList.Count>2){
			for(int i=1; i< processedDataList.Count;i++){
				Vector3 point_one = new Vector3(i-1,processedDataList[i-1]);
				Vector3 point_two = new Vector3(i,processedDataList[i]);
				Debug.DrawLine(point_one,point_two);
			}
		}
		//draw average
		Debug.DrawLine(new Vector2(0,totalAverage),new Vector2(processedDataList.Count,totalAverage));

	}
}
