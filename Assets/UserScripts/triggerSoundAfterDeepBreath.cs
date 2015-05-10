using UnityEngine;
using System.Collections;

public class triggerSoundAfterDeepBreath : MonoBehaviour {



	void OnEnable(){
		BreathDataProcesser.deepBreathHappened += triggerSound;
	}

	void triggerSound(){
		gameObject.GetComponent<AudioSource>().Play();
	}

	// Update is called once per frame
	void Update () {
	
	}

}
