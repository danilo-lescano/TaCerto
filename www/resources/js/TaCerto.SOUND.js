var TaCerto = TaCerto || {};
TaCerto.SOUND = [
	{id:"clock", path:"resources/media/audio/clock.mp3"},
	{id:"freeze", path:"resources/media/audio/freeze.mp3"},
	{id:"vassoura", path:"resources/media/audio/vassoura.mp3"},
	{id:"clickcarta", path:"resources/media/audio/clickcarta.mp3"},
	{id:"combo2", path:"resources/media/audio/combo2.mp3"},
	{id:"combo3", path:"resources/media/audio/combo3.mp3"},
	{id:"clicklacuna", path:"resources/media/audio/clicklacuna.mp3"},
];
TaCerto.SOUND.find = function(id){
	for (var i = 0; i < TaCerto.SOUND.length; i++) {
		if (TaCerto.SOUND[i].id === id) {
			return TaCerto.SOUND[i].aud;
		}
	}
	return new Audio();
};