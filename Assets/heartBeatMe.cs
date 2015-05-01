using UnityEngine;
using System.Collections;

public class heartBeatMe : MonoBehaviour {

	Vector3 shrinkSpeed = new Vector3(0.1f,0.1f,0.1f);
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
//		Debug.Log (sensorInput.getSingleton().heartBeatValue);
		if(sensorInput.getSingleton().heartBeatValue > 1000){
			Vector3 tempScale = new Vector3(3,3,3);
			gameObject.transform.localScale = tempScale;
		}else{
			if(gameObject.transform.localScale.magnitude > 1){
				gameObject.transform.localScale -= shrinkSpeed;
			}
		}
	}

}