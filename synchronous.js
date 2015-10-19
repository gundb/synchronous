(function(env){
	root = env.window? env.window : root;
	root.Gun = root.Gun || require('../gun');
}(this));

Gun.chain.synchronous = function(obj, opt){
	var gun = this;
	if(!Gun.obj.is(obj)){ 
		console.log("First parameter is not an object to synchronize too!");
		return gun;
	}
	opt = opt || {};
	opt.ctx = opt.ctx || {};
	gun.on(function(change, field){
		Gun.obj.map(change, function(val, field){
			if(!obj){ return }
			if(Gun._.meta == field){ return }
			if(Gun.obj.is(val)){
				var soul = Gun.is.soul(val);
				if(opt.ctx[soul + field]){ return } // do not re-subscribe.
				opt.ctx[soul + field] = true; // unique subscribe!
				this.path(field).synchronous(obj[field] = obj[field] || {}, Gun.obj.copy(opt));
				return;
			}
			obj[field] = val;
		}, this);
	});
	return gun;
}