let audioEnabler = function () {
	if (settings.soundStatus != true) {
			new Wikifier(null, "<<masteraudio stop>>");
	} else {
		
		new Wikifier(null, "<<playlist 'bgm' shuffle play>>");
	}					
};

setup.audioControls = function () {
	if (state.active.variables["controls"] === true) {
		 new Wikifier(null, "<<playlist 'bgm' skip>>");
	}
};