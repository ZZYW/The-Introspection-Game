
@script ExecuteInEditMode()
@CustomEditor (SuimonoObject)

class suimono_object_editor extends Editor {
	
	var renName : String="";
	var setRename : int = 0;
	
	var localPresetIndex : int = -1;
	
	var showErrors : boolean = false;
	var showPresets : boolean = false;
 	var showSplash : boolean = false;
  	var showWaves : boolean = false;
  	var showGeneral : boolean = false;
  	var showSurface : boolean = false;
   	var showUnderwater : boolean = false;
  	var showEffects : boolean = false;
  	var showColor : boolean = false;
   	var showReflect : boolean = false;
 	var showFoam : boolean = false;
 	
 	var logoTex : Texture = Resources.Load("textures/gui_tex_suimonologo");
	var divTex : Texture = Resources.Load("textures/gui_tex_suimonodiv");
	var divRevTex : Texture = Resources.Load("textures/gui_tex_suimonodivrev");
	var divVertTex : Texture = Resources.Load("textures/gui_tex_suimono_divvert");
	var divHorizTex : Texture = Resources.Load("textures/gui_tex_suimono_divhorz");
	
	var bgPreset : Texture = Resources.Load("textures/gui_bgpreset");
	var bgPresetSt : Texture = Resources.Load("textures/gui_bgpresetSt");
	var bgPresetNd : Texture = Resources.Load("textures/gui_bgpresetNd");
			
 	var colorEnabled : Color = Color(1.0,1.0,1.0,1.0);
	var colorDisabled : Color = Color(1.0,1.0,1.0,0.25);
	
	var highlightColor2 : Color = Color(0.7,1,0.2,0.6);//Color(0.7,1,0.2,0.6);
	var highlightColor : Color = Color(1,0.5,0,0.9);
 	//var highlightColor3 : Color = Color(0.7,1,0.2,0.6);
 	
 	
 	//function OnInspectorUpdate() {
	//	Repaint();
	//}	
		
		
    function OnInspectorGUI () {
    	

 	
    	if (localPresetIndex == -1) localPresetIndex = target.presetUseIndex;
    
        //check for unity vs unity pro & load textures
        /*
        #if !UNITY_4_3
		if (!PlayerSettings.advancedLicense){
			divTex = Resources.Load("textures/gui_tex_suimonodiv_i");
			logoTex = Resources.Load("textures/gui_tex_suimonologo_i");
			bgPreset = Resources.Load("textures/gui_bgpreset_i");
			bgPresetSt = Resources.Load("textures/gui_bgpresetSt_i");
			bgPresetNd = Resources.Load("textures/gui_bgpresetNd_i");
			highlightColor = Color(0.0,0.81,0.9,0.6);
		}
		#endif
		*/
		
		if (!target.useDarkUI){
			divTex = Resources.Load("textures/gui_tex_suimonodiv_i");
			logoTex = Resources.Load("textures/gui_tex_suimonologo_i");
			bgPreset = Resources.Load("textures/gui_bgpreset_i");
			bgPresetSt = Resources.Load("textures/gui_bgpresetSt_i");
			bgPresetNd = Resources.Load("textures/gui_bgpresetNd_i");
			highlightColor = Color(0.0,0.81,0.9,0.6);
		} else {
			divTex = Resources.Load("textures/gui_tex_suimonodiv");
			logoTex = Resources.Load("textures/gui_tex_suimonologo");
			bgPreset = Resources.Load("textures/gui_bgpreset");
			bgPresetSt = Resources.Load("textures/gui_bgpresetSt");
			bgPresetNd = Resources.Load("textures/gui_bgpresetNd");
			highlightColor = Color(1,0.5,0,0.9);
		}
		
		
		//SET SCREEN WIDTH
		var setWidth = Screen.width-220;
		if (setWidth < 120) setWidth = 120;
		
		
		//SUIMONO LOGO
		var buttonText : GUIContent = new GUIContent(""); 
		var buttonStyle : GUIStyle = GUIStyle.none; 
		var rt : Rect = GUILayoutUtility.GetRect(buttonText, buttonStyle);
		var margin : int = 15;
		//GUI.color = colorEnabled;


		//start menu
        GUI.contentColor = Color(1.0,1.0,1.0,0.4);
		EditorGUI.LabelField(Rect(rt.x+margin+2, rt.y+37, 50, 18),"Version");
		GUI.contentColor = Color(1.0,1.0,1.0,0.6);
		
		var linkVerRect : Rect = Rect(rt.x+margin+51, rt.y+37, 40, 18);
		EditorGUI.LabelField(linkVerRect,target.suimonoVersionNumber);
		//if (Event.current.type == EventType.MouseUp && linkVerRect.Contains(Event.current.mousePosition)) Application.OpenURL("http://www.tanukidigital.com/suimono/");
		
		GUI.contentColor = Color(1.0,1.0,1.0,1.0);
	    GUI.contentColor = Color(1.0,1.0,1.0,0.4);
	    var linkHelpRect : Rect = Rect(rt.x+margin+165, rt.y+37, 28, 18);
	    var linkBugRect : Rect = Rect(rt.x+margin+165+42, rt.y+37, 65, 18);
	    var linkURLRect : Rect = Rect(rt.x+margin+165+120, rt.y+37, 100, 18);
	    
		if (Event.current.type == EventType.MouseUp && linkHelpRect.Contains(Event.current.mousePosition)) Application.OpenURL("http://www.tanukidigital.com/forum/");
		if (Event.current.type == EventType.MouseUp && linkBugRect.Contains(Event.current.mousePosition)) Application.OpenURL("http://www.tanukidigital.com/forum/");
		if (Event.current.type == EventType.MouseUp && linkURLRect.Contains(Event.current.mousePosition)) Application.OpenURL("http://www.tanukidigital.com/suimono/");

		EditorGUI.LabelField(Rect(rt.x+margin+165+30, rt.y+37, 220, 18),"|");
		EditorGUI.LabelField(Rect(rt.x+margin+165+110, rt.y+37, 220, 18),"|");
		
		GUI.contentColor = Color(1.0,1.0,1.0,0.4);
		EditorGUI.LabelField(linkHelpRect,"help");
		EditorGUI.LabelField(linkBugRect,"report bug");
		EditorGUI.LabelField(linkURLRect,"tanukidigital.com");
		// end menu
		
		
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,36),logoTex);
        GUILayout.Space(40.0);
        
        
        
    	//ERROR CHECK (require WATER_Module game object in scene!)
	    //if (GameObject.Find("SUIMONO_Module").gameObject == null){
	    //	EditorGUILayout.HelpBox("A SUIMONO_Module object is required in your scene!",MessageType.Error);
	    //}
        

        // GENERAL SETTINGS
        GUI.contentColor = colorEnabled;
        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        target.showGeneral = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showGeneral, "");
        GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("GENERAL SETTINGS"));
        if (target.showGeneral){
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 80, 18),"Surface Type");
			target.typeIndex = EditorGUI.Popup(Rect(rt.x+margin+100, rt.y+30, 145, 18),"",target.typeIndex, target.typeOptions);
			
			if (target.typeIndex == 0){
				EditorGUI.LabelField(Rect(rt.x+margin+260, rt.y+30, 80, 18),"Ocean Scale");
	        	target.overallScale = EditorGUI.FloatField(Rect(rt.x+margin+343, rt.y+30, 30, 18),"",target.overallScale);
			}

			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+60, 90, 18),"Flow Direction");
        	target.flow_dir_degrees = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+60, setWidth, 18),"",target.flow_dir_degrees,0.0,360.0);
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+80, 90, 18),"Wave Speed");
        	target.flowSpeed = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+80, setWidth, 18),"",target.flowSpeed,0.0,1.0);
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+100, 90, 18),"Flow Speed");
			target.foamSpeed = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+100, setWidth, 18),"",target.foamSpeed,0.0,3.0);

			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+130, 140, 18),"Use Custom Textures");
  			target.enableCustomTextures = EditorGUI.Toggle(Rect(rt.x+margin+145, rt.y+130, 20, 18),"", target.enableCustomTextures);
  			if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
  			EditorGUI.LabelField(Rect(rt.x+margin+200, rt.y+130, 140, 18),"Use Dynamic Reflection");
  			target.enableDynamicReflections = EditorGUI.Toggle(Rect(rt.x+margin+350, rt.y+130, 20, 18),"", target.enableDynamicReflections);
  			GUI.contentColor = colorEnabled;
			GUILayout.Space(130.0);
			
		}
        GUILayout.Space(10.0);
        
        
        
        
              
        //TESSELLATION SETTINGS
        //only show for non OSX users and only when DX11 is enabled.
        #if !UNITY_STANDALONE_OSX
        if (PlayerSettings.useDirect3D11){
	        if (target.typeIndex == 0 || target.typeIndex == 1){
	        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
	        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
	        target.showTess = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showTess, "");
	        GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("TESSELLATION DX11"));
	        if (target.showTess){
	        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 140, 18),"Tessellation Factor");
				target.waveTessAmt = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+30, setWidth, 18),"",target.waveTessAmt,0.001,400.0);
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+50, 140, 18),"Tessellation Start");
				target.waveTessMin = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+50, setWidth, 18),"",target.waveTessMin,0.0,1.0);
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+70, 140, 18),"Tessellation Spread");
				target.waveTessSpread = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+70, setWidth, 18),"",target.waveTessSpread,0.0,1.0);
				//EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+90, 140, 18),"Use Auto Tessellation");
				//target.autoTess = EditorGUI.Toggle(Rect(rt.x+margin+165, rt.y+90, setWidth, 18),"",target.autoTess);

				target.waveFac = 1.0;
	
				GUILayout.Space(80.0);
			}
	        GUILayout.Space(10.0);
	        
	        } else {
		       	
		       	target.waveFac = 0.0;
		       	
	        }
        }
		#endif
    
        
        
        //WAVE SETTINGS
        //if (target.typeIndex == 0 || target.typeIndex == 1){
        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        target.showWaves = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showWaves, "");
        if (target.typeIndex == 0 || target.typeIndex == 1){
        	GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("3D WAVE SETTINGS"));
        } else {
        	GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("WAVE SETTINGS"));
        }
        if (target.showWaves){

			if (target.typeIndex != 0 && target.typeIndex != 1) GUI.contentColor = colorDisabled;
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 140, 18),"Height Projection");
				target.projectHeight = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+30, setWidth, 18),"",target.projectHeight,0.0,2.0);
			
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+50, 140, 18),"Wave Height Blend");
				target.colorSurfHigh = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+50, setWidth, 18),"",target.colorSurfHigh);
            GUI.contentColor = colorEnabled;
            
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+85, 140, 18),"Deep Wave Height");
				target.waveHeight = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+85, setWidth, 18),"",target.waveHeight,0.0,10.0);
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+105, 140, 18),"Deep Wave Scale");
				target.waveScale = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+105, setWidth, 18),"",target.waveScale,0.0,1.0);


				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+125, 140, 18),"Detail Wave Height");
				target.detailHeight = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+125, setWidth, 18),"",target.detailHeight,0.0,3.0);
				EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+145, 140, 18),"Detail Wave Scale");
				target.detailScale = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+145, setWidth, 18),"",target.detailScale,0.0,1.0);

			


			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+180, 140, 18),"Normalize Shoreline");
			target.normalShore = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+180, setWidth, 18),"",target.normalShore,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+200, 140, 18),"Shallow Wave Height");
			target.waveShoreHeight = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+200, setWidth, 18),"",target.waveShoreHeight,0.0,20.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+220, 140, 18),"Shallow Wave Scale");
			target.waveShoreScale = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+220, setWidth, 18),"",target.waveShoreScale,0.0,1.0);
        	
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+240, 140, 18),"Shallow Wave Breaks");
        	target.waveBreakAmt = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+240, setWidth, 18),"",target.waveBreakAmt,0.0,20.0);
        	
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+260, 140, 18),"Shallow Wave Speed");
        	target.shoreSpeed = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+260, setWidth, 18),"",target.shoreSpeed,0.0,1.0);



  			target.waveFac = 1.0;
			GUILayout.Space(270.0);

		}
        GUILayout.Space(10.0);
        
        //} else {
	       	
	    //  	target.waveFac = 0.0;
	       	
        //}
        
        
        
        
        
        // SURFACE SETTINGS
        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        target.showSurface = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showSurface, "");
        GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("WATER SURFACE"));
        //if (target.currVersionIndex != 2 && target.currVersionIndex != 3){
        	//GUI.contentColor = colorDisabled;
        	//GUI.Label (Rect (rt.x+margin+160, rt.y+5, 300, 20), GUIContent ("Unity Pro"));
        	//GUI.contentColor = colorEnabled;
        //}
        
        if (target.showSurface){
        
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 140, 18),"Overall Brightness");
            target.overallBright = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+30, setWidth, 18),"",target.overallBright,0.0,10.0);
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+50, 140, 18),"Overall Transparency");
        	target.overallTransparency = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+50, setWidth, 18),"",target.overallTransparency,0.0,1.0);


			if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+85, 140, 18),"Light Absorption");
			target.lightAbsorb = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+85, setWidth, 18),"",target.lightAbsorb,0.0,1.0);
			GUI.contentColor = colorEnabled;
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+105, 140, 18),"Shadow Amount");
			target.shadowAmount = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+105, setWidth, 18),"",target.shadowAmount,0.0,1.0);
			if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+125, 140, 18),"Refraction Amount");
			target.lightRefract = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+125, setWidth, 18),"",target.lightRefract,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+145, 140, 18),"Chromatic Shift");
			target.refractShift = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+145, setWidth, 18),"",target.refractShift,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+165, 140, 18),"Blur Amount");
			target.blurSpread = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+165, setWidth, 18),"",target.blurSpread,0.0,1.0);
			GUI.contentColor = colorEnabled;
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+185, 140, 18),"Surface Roughness");
			target.surfaceSmooth = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+185, setWidth, 18),"",target.surfaceSmooth,0.0,1.0);
			
			
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+220, 140, 18),"Reflection Distance");
			target.reflectDist = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+220, setWidth, 18),"",target.reflectDist,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+240, 140, 18),"Reflection Spread");
			target.reflectSpread = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+240, setWidth, 18),"",target.reflectSpread,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+260, 140, 18),"Reflection Strength");
			target.reflectionOffset = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+260, setWidth, 18),"",target.reflectionOffset,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+280, 140, 18),"Reflection Color");
			target.colorDynReflect = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+280, setWidth, 18),"",target.colorDynReflect);
			

            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+320, 140, 18),"Surface Blend Color");
            target.depthColor = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+320, setWidth, 18),"",target.depthColor);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+340, 140, 18),"Surface Overlay Color");
            target.colorSurfLow = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+340, setWidth, 18),"",target.colorSurfLow);
            if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+360, 140, 18),"Depth Color (Shallow)");
            target.depthColorR = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+360, setWidth, 18),"",target.depthColorR);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+380, 140, 18),"Depth Color (Medium)");
            target.depthColorG = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+380, setWidth, 18),"",target.depthColorG);
            GUI.contentColor = colorEnabled;
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+400, 140, 18),"Depth Color (Deep)");
            target.depthColorB = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+400, setWidth, 18),"",target.depthColorB);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+420, 140, 18),"Back Light Scatter");
            target.specColorL = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+420, setWidth, 18),"",target.specColorL);
            
            
           	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+465, 140, 18),"Specular Hot");
            target.specColorH = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+465, setWidth, 18),"",target.specColorH);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+485, 140, 18),"Hot Specular Amount");
            target.specScatterWidth = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+485, setWidth, 18),"",target.specScatterWidth,0.0,1.0);
                
            
            //target.tideColor = EditorGUI.ColorField(Rect(rt.x+margin+10, rt.y+500, 370, 18),"Tide Color",target.tideColor);
            //target.tideAmount = EditorGUI.Slider(Rect(rt.x+margin+10, rt.y+520, 370, 18),"Tide Offset",target.tideAmount,0.0,1.0);
            //target.tideSpread = EditorGUI.Slider(Rect(rt.x+margin+10, rt.y+540, 370, 18),"Tide Spread",target.tideSpread,0.02,1.0);
               
               
            //GUI.color = colorDisabled;
            //if (target.enableCustomTextures) GUI.color = colorEnabled;
  			//target.enableCustomTextures = EditorGUI.Toggle(Rect(rt.x+margin+10, rt.y+520, 170, 18),"Use Custom Textures", target.enableCustomTextures);
  			//GUI.color = colorEnabled;
			//if (target.customTextures){
	        
	        //}
  			
			GUILayout.Space(490.0);
		}
        GUILayout.Space(10.0);

      
      
      
      
      
      
      

        
      
      
      
        // FOAM and EDGE SETTINGS
        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        target.showFoam = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showFoam, "");
        GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("FOAM & EDGE"));
        if (target.showFoam){
			
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 90, 18),"Foam Scale");
        	target.foamScale = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+30, setWidth, 18),"",target.foamScale,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+50, 90, 18),"Foam Speed");
        	target.foamMoveSpeed = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+50, setWidth, 18),"",target.foamMoveSpeed,0.0,1.0);
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+70, 90, 18),"Foam Color");
        	target.foamColor = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+70, setWidth, 18),"",target.foamColor);
        	
        	if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+90, 90, 18),"Edge Foam");
        	target.foamAmt = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+90, setWidth, 18),"",target.foamAmt,0.0,1.0);
			GUI.contentColor = colorEnabled;
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+120, 90, 18),"Wave Foam");
        	target.hFoamHeight = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+120, setWidth, 18),"",target.hFoamHeight,0.0,1.0);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+140, 90, 18),"Wave Height");
        	target.hFoamAmt = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+140, setWidth, 18),"",target.hFoamAmt,0.0,1.0);
        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+160, 90, 18),"Wave Spread");
        	target.hFoamSpread = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+160, setWidth, 18),"",target.hFoamSpread,0.0,1.0);

        	EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+180, 90, 18),"Shallow Foam");
        	target.shallowFoamAmt = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+180, setWidth, 18),"",target.shallowFoamAmt,0.0,2.0);
        	
        	if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+210, 90, 18),"Edge Blend");
        	target.edgeBlend = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+210, setWidth, 18),"",target.edgeBlend,0.0001,0.2);
        	GUI.contentColor = colorEnabled;
			//EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+210, 90, 18),"Edge Amount");
        	//target.edgeSpread = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+210, setWidth, 18),"",target.edgeSpread,0.0,1.0);
        	//EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+230, 90, 18),"Edge Color");
        	//target.edgeColor = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+230, setWidth, 18),"",target.edgeColor);


			GUILayout.Space(210.0);
		}
        GUILayout.Space(10.0);
        
        
        
        
        
        

        // UNDERWATER SETTINGS
        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        target.showUnderwater = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showUnderwater, "");
        GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("UNDERWATER"));
        if (target.showUnderwater){

           	//if (!target.enableUnderwaterFX) GUI.color = colorDisabled;
            //target.enableUnderwaterFX = EditorGUILayout.Toggle("     Enable UnderwaterFX", target.enableUnderwaterFX);
			//GUI.color = colorEnabled;
            	
            //if (target.enableUnderwaterFX){
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 90, 18),"Enable Debris");
			target.enableUnderDebris = EditorGUI.Toggle(Rect(rt.x+margin+110, rt.y+30, 30, 18),"", target.enableUnderDebris);
			EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+50, 90, 18),"Light Factor");
            target.reflectDistUnderAmt = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+50, setWidth, 18),"",target.reflectDistUnderAmt,0.0,1.0);

            if (target.currVersionIndex != 2 && target.currVersionIndex != 3) GUI.contentColor = colorDisabled;
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+70, 90, 18),"Refract Amt");
            target.underRefractionAmount = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+70, setWidth, 18),"",target.underRefractionAmount,0.0,1.0);
            
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+90, 90, 18),"Refract Scale");
            target.underRefractionScale = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+90, setWidth, 18),"",target.underRefractionScale,0.0,3.0);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+110, 90, 18),"Refract Speed");
            target.underRefractionSpeed = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+110, setWidth, 18),"",target.underRefractionSpeed,0.0,1.0);
                       
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+130, 90, 18),"Blur Amount");
            target.underBlurAmount = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+130, setWidth, 18),"",target.underBlurAmount,0.0,1.0);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+150, 90, 18),"Fog Distance");
			target.underwaterFogDist = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+150, setWidth, 18),"",target.underwaterFogDist,0.0,1.0);
            EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+170, 90, 18),"Fog Spread");
			target.underwaterFogSpread = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+170, setWidth, 18),"",target.underwaterFogSpread,0.0,0.005);
           	GUI.contentColor = colorEnabled;
             EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+190, 90, 18),"Fog Color");
			target.underwaterColor = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+190, setWidth, 18),"",target.underwaterColor);
            //}
            
            
            
			GUILayout.Space(210.0);
		}
        GUILayout.Space(10.0);
        
        
        
        
        
        
        // SHADOW SETTINGS
        //rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        //EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        //target.showEffects = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showEffects, "");
        //GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("SHADOW SETTINGS"));
        //if (target.showEffects){

            //EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+30, 140, 18),"Enable Shadow Casting");
			//target.castshadowIsOn = EditorGUI.Toggle(Rect(rt.x+margin+165, rt.y+30, 30, 18),"", target.castshadowIsOn);
            //EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+50, 140, 18),"Cast Shadow Strength");
			//target.castshadowStrength = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+50, setWidth, 18),"",target.castshadowStrength,0.0,1.0);
            //EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+70, 140, 18),"Cast Shadow Fadeout");
			//target.castshadowFade = EditorGUI.Slider(Rect(rt.x+margin+165, rt.y+70, setWidth, 18),"",target.castshadowFade,0.0,1.0);
            //EditorGUI.LabelField(Rect(rt.x+margin+10, rt.y+90, 140, 18),"Cast Shadow Color");
			//target.castshadowColor = EditorGUI.ColorField(Rect(rt.x+margin+165, rt.y+90, setWidth, 18),"",target.castshadowColor);

			//GUILayout.Space(95.0);
		//}
        //GUILayout.Space(10.0);
        
        
        
        
              
        
        
        // PRESET MANAGER
        rt = GUILayoutUtility.GetRect(buttonText, buttonStyle);
        EditorGUI.DrawPreviewTexture(Rect(rt.x+margin,rt.y,387,24),divTex);
        target.showPresets = EditorGUI.Foldout(Rect (rt.x+margin+3, rt.y+5, 20, 20), target.showPresets, "");
        GUI.Label (Rect (rt.x+margin+20, rt.y+5, 300, 20), GUIContent ("PRESET MANAGER"));
        if (target.showPresets){


			var presetWidth = Screen.width-78;
			if (presetWidth < 120) presetWidth = 120;
		
		
			//select preset file
			EditorGUI.LabelField(Rect(rt.x+margin+18, rt.y+24, 110, 18),"Use Preset File:");
			target.presetFileIndex = EditorGUI.Popup(Rect(rt.x+margin+125, rt.y+24, 258, 13),"",target.presetFileIndex, target.presetFiles);

			//transition preset
			//target.showPresetsTrans = EditorGUI.Foldout(Rect(rt.x+margin+85, rt.y+44, 80, 13), target.showPresetsTrans, "");
        	//GUI.Label (Rect(rt.x+margin+105, rt.y+44, 80, 13), GUIContent ("Preset Transitions"));
        	//if (target.showPresetsTrans){
        
			EditorGUI.LabelField(Rect(rt.x+margin+18, rt.y+44, 100, 18),"Transition:");
			target.presetTransIndexFrm = EditorGUI.Popup(Rect(rt.x+margin+85, rt.y+44, 80, 13),"",target.presetTransIndexFrm, target.presetOptions);
			EditorGUI.LabelField(Rect(rt.x+margin+167, rt.y+44, 100, 18),"-->");
			target.presetTransIndexTo = EditorGUI.Popup(Rect(rt.x+margin+194, rt.y+44, 80, 13),"",target.presetTransIndexTo, target.presetOptions);
			target.presetTransitionTime = EditorGUI.FloatField(Rect(rt.x+margin+285, rt.y+43, 30, 18),target.presetTransitionTime);
    		var transAction : String = "Start";
        	if (target.presetStartTransition) transAction = (target.presetTransitionCurrent*target.presetTransitionTime).ToString("F2");//"Stop";
        	if(GUI.Button(Rect(rt.x+margin+324, rt.y+44, 60, 15), transAction)){
        		target.presetStartTransition = !target.presetStartTransition;
        	}
        	
			//}
			
			
			//start presets
			GUI.color = Color(1,1,1,0.1);
			EditorGUI.DrawPreviewTexture(Rect(rt.x+margin+20,rt.y+65,presetWidth,5),bgPresetSt); //364
			
			//fill presets
			//for (var pr:int = 0; pr < 4; pr++){
			//presetOptions
			for (var pr:int = 0; pr <= target.presetOptions.length; pr++){
			
				if (pr > 0){
				//background
				GUI.color = Color(1,1,1,0.1);
				if ((pr/2.0) > Mathf.Floor(pr/2.0)) GUI.color = Color(1,1,1,0.13);
				//if (target.presetUseIndex == pr) GUI.color = Color(1,0.5,0,0.9);
				if (localPresetIndex == pr) GUI.color = highlightColor;
				EditorGUI.DrawPreviewTexture(Rect(rt.x+margin+20,rt.y+70+(pr*13),presetWidth,12),bgPreset); //364
				
				//preset name/button
				if (setRename != (pr+1)){
					GUI.color = Color(1,1,1,0.75);
            		EditorGUI.LabelField(Rect(rt.x+margin+32, rt.y+67+(pr*13), 300, 16), target.presetOptions[pr-1]);
            		GUI.color = Color(1,1,1,0.12);
            		if (GUI.Button(Rect(rt.x+margin+32, rt.y+67+(pr*13)+2, (presetWidth-72), 13),"")){
            			localPresetIndex = pr;
            			target.presetIndex = pr-1;
            			//target.PresetLoad();
            			target.SuimonoSetPreset(target.presetFileIndex,pr-1);
            		}
            	}
            	
            	//rename
            	GUI.color = Color(1,1,1,0.4);
				if (GUI.Button(Rect(rt.x+margin+21, rt.y+67+(pr*13)+2, 11, 11),"")){
					Debug.Log("rename");
					setRename = (pr +1);
				}
				if (setRename == (pr+1)){
					renName = EditorGUI.TextField(Rect(rt.x+margin+32, rt.y+69+(pr*13), 200, 14), renName);
					GUI.color = highlightColor2;
					if (GUI.Button(Rect(rt.x+margin+230, rt.y+69+(pr*13), 30, 14),"OK")){
						setRename = 0;
						target.PresetRename(target.presetOptions[pr-1],renName);
						renName="";
						
					}
					GUI.color = Color(1,1,1,0.4);
					if (GUI.Button(Rect(rt.x+margin+262, rt.y+69+(pr*13), 20, 14),"X")){
						setRename = 0;
					}
            	}
            	
            	//add/delete
            	GUI.color = Color(1,1,1,0.35);
            	if (localPresetIndex == pr) GUI.color = highlightColor;
				if (GUI.Button(Rect(rt.x+margin+(presetWidth-35), rt.y+68+(pr*13)+1, 25, 12),"+")) target.PresetSave(target.presetOptions[pr-1]);
            	if (GUI.Button(Rect(rt.x+margin+(presetWidth-9), rt.y+68+(pr*13)+1, 25, 12),"-")) target.PresetDelete(target.presetOptions[pr-1]);

           		GUI.color = Color(1,1,1,1);

           	} else {
           	
           	
           		//background
				GUI.color = Color(1,1,1,0.1);
				if ((pr/2.0) > Mathf.Floor(pr/2.0)) GUI.color = Color(1,1,1,0.13);
				//if (target.presetUseIndex == pr) GUI.color = Color(1,0.5,0,0.9);
				if (localPresetIndex == pr) GUI.color = highlightColor;
				EditorGUI.DrawPreviewTexture(Rect(rt.x+margin+20,rt.y+70+(pr*13),presetWidth,12),bgPreset); //364
				
				//preset name/button
				if (setRename != (pr+1)){
					GUI.color = Color(1,1,1,0.75);
            		EditorGUI.LabelField(Rect(rt.x+margin+32, rt.y+67+(pr*13), 300, 16), "- NONE -");
            		GUI.color = Color(0,0,0,0.06);
            		if (GUI.Button(Rect(rt.x+margin+32, rt.y+67+(pr*13)+2, (presetWidth-15), 13),"")){
            			localPresetIndex = 0;
            			target.presetIndex = -1;
            			//target.PresetLoad();
            			//SetPreset(target.presetFileIndex,pr-1);
            		}
            	}

           	
           	}
           	}
           	//end presets
           	GUI.color = Color(1,1,1,0.1);
			EditorGUI.DrawPreviewTexture(Rect(rt.x+margin+20,rt.y+81+((pr-1)*13),presetWidth,23),bgPresetNd);
			
			GUI.color = Color(1,1,1,1);
			GUI.color = Color(1,1,1,0.55);
			if (GUI.Button(Rect(rt.x+margin+(presetWidth-49), rt.y+86+((pr-1)*13), 65, 18),"+ NEW")) target.PresetSave("");
			
			GUI.color = colorEnabled;
			
			GUILayout.Space(80.0+(pr*12)+10);
			
			
			
		}
        GUILayout.Space(10.0);
        

  

	    EditorGUILayout.Space();



        	
        if (GUI.changed) EditorUtility.SetDirty (target);
    }
    
    
    
    
    
    
}