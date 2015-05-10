using UnityEngine;
using System.Collections;

public class deGravityMe : MonoBehaviour {

	bool makeThisScriptWork = false;

	//ascending
	float decreaseRate = 0.0005f;
	public float gravity;

	//damp ascending
	bool firstDeepBreathHappened = false;
	bool timerExceeded = false;
	float increaseRate = 0.1f;
	float lastDeepBreathTime = 0.0f;
	float lastingTime = 15; //last ? second till start decreasing gravity


	void OnEnable(){
		BreathDataProcesser.deepBreathHappened += decreaseGravity;
		BreathDataProcesser.breathSensorReady += activeThisScript;
	}

	void Start(){
		gameObject.GetComponent<OVRPlayerController>().GravityModifier = decreaseRate;
		gravity = gameObject.GetComponent<OVRPlayerController>().GravityModifier;
	}

	void activeThisScript(){
		makeThisScriptWork = true;
	}

	void Update(){
		if(makeThisScriptWork){
			gameObject.GetComponent<OVRPlayerController>().GravityModifier = gravity;
			checkTimer(); //check if timer exceeds lastingTime
			if(timerExceeded){ 
				increaseGravity(); //if exceeded, then start increasing gravity
			}
		}

	}

	void decreaseGravity(){ //execute only once after each deep breath
	
		if(makeThisScriptWork){
			if(!firstDeepBreathHappened){
				startTimer();
	//			gravity -= 2 * decreaseRate;
				gravity = -0.004f;
				Debug.LogWarning("first deep breath, set timer to " + -1*decreaseRate);
				shiftFPS();
				firstDeepBreathHappened = true;
			}

			if(firstDeepBreathHappened){
				startTimer();
	//			gravity -= decreaseRate;
				gravity = -0.004f;
				shiftFPS();
				Debug.LogWarning("start decreasing gravity...");
			}
		}
	}

	void checkTimer(){
		if(lastDeepBreathTime != 0){
			if(Time.time - lastDeepBreathTime >= lastingTime){
				timerExceeded = true;
			}else{
				Debug.Log("Timer Counting Down: " + (Time.time - lastDeepBreathTime));
			}
		}
	}
	
	void increaseGravity(){
//		if(gravity <= 0.0f){
//			gravity += increaseRate;
//			Debug.Log("current gravity is: " + gravity);
//		}else{
//			Debug.Log("gravity reached to the highest value..stopped increasing");
//		}

		gravity = 0.009f;
	}


	void startTimer(){
		timerExceeded = false;
		lastDeepBreathTime = Time.time; //kick off timer
		Debug.Log ("timer just started");
	}

	void shiftFPS(){
		Vector3 currentPosition = gameObject.transform.position;
		gameObject.transform.position = currentPosition + new Vector3(0,1,0);
	}
	
	

}//monobehaviour ends
