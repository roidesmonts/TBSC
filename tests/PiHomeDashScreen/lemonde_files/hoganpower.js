define(["lmd/core/conf","hogan"],function(conf,hogan){return{version:"0.0.2",load:function(name,req,onLoad,config){var app=conf.current.app,appMatches=name.match(/(.*)@(.*)/),path,rqPath;if(appMatches)name=appMatches[1];app=app.replace("wwws","www");path="hgn/"+app+name+".js";rqPath=path+"@abs";if(typeof requirejs.s.contexts._.config.paths[rqPath]==="string")path=rqPath;else path="//"+conf.medias.location.hostname+"/"+path;require([path],function(tpl){onLoad(new hogan.Template(tpl))})}}});
