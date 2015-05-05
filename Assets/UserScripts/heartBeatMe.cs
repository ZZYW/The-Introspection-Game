using UnityEngine;
using System.Collections;

public class heartBeatMe : MonoBehaviour {

	float fadeOutSpeed = 0.1f;
	Vector3 fadeOutSpeedVec;

	void Start () {
		fadeOutSpeedVec = new Vector3(fadeOutSpeed,fadeOutSpeed,fadeOutSpeed);
	}
	
	void Update () {
		if(sensorInput.getSingleton().heartBeatValue > 1000){
			Vector3 tempScale = new Vector3(3,3,3);
			gameObject.transform.localScale = tempScale;
		}else{
			if(gameObject.transform.localScale.magnitude > 1){
				gameObject.transform.localScale -= fadeOutSpeedVec;
			}
		}
	}

}