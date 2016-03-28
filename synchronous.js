(function (env) {
	var Gun = env.window ? env.window.Gun : require('gun/gun');

	Gun.chain.sync = function (obj, opt) {
		var gun = this;
		if (!Gun.obj.is(obj)) {
			console.log('First param is not an object');
			return gun;
		}
		if (Gun.bi.is(opt)) {
			opt = {
				meta: opt
			};
		}
		opt = opt || {};
		opt.ctx = opt.ctx || {};
		gun.on(function (change, field) {
			Gun.obj.map(change, function (val, field) {
				if (!obj) {
					return;
				}
				if (field === Gun._.meta || field === Gun._.soul) {
					if (opt.meta) {
						obj[field] = val;
					}
					return;
				}
				if (Gun.obj.is(val)) {
					var soul = Gun.is.rel(val);
					if (opt.ctx[soul + field]) {
						// don't re-subscribe.
						return;
					}
					// unique subscribe!
					opt.ctx[soul + field] = true;
					this.path(field).sync(
						obj[field] = (obj[field] || {}),
						Gun.obj.copy(opt)
					);
					return;
				}
				obj[field] = val;
			}, this);
		});
		return gun;
	};

}(this));
