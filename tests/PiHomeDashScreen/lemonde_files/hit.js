define(function(){var arClicks=[],arAdc=[],arAdi=[],hit=function(){if(typeof xt_click==="function")xt_click.apply(this,arguments);else arClicks.push(arguments)},adc=function(){if(typeof xt_adc==="function")xt_adc.apply(this,arguments);else arAdc.push(arguments)},adi=function(){if(typeof xt_adi==="function")xt_adi.apply(this,arguments);else arAdi.push(arguments)},has_hit=function(label){var i;for(i=0;i<arClicks.length;i++)if(arClicks[i].label===label)return true;return false},resolve=function(){var i;
for(i=0;i<arClicks.length;i++)xt_click.apply(this,arClicks[i]);for(i=0;i<arAdc.length;i++)xt_adc.apply(this,arAdc[i]);for(i=0;i<arAdi.length;i++)xt_adi.apply(this,arAdi[i])};return{hit:hit,adc:adc,adi:adi,has_hit:has_hit,resolve:resolve}});