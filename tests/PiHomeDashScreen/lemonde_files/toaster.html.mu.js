define(function(){return function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"meter_toaster js_meter_toaster\">");_.b("\n" + i);_.b("   <p class=\"entete\"><span class=\"logo\">Le monde .fr</span><a href=\"#meter_toaster\" class=\"bt_fermer_rond\"></a></p>");_.b("\n" + i);_.b("   <div class=\"pad16\">");_.b("\n" + i);if(_.s(_.f("isLast",c,p,1),c,p,0,224,335,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("         <p class=\"mgb8\"><strong>Vous avez lu la totalité des articles offerts ce mois-ci.</strong></p>");_.b("\n");});c.pop();}if(!_.s(_.f("isLast",c,p,1),c,p,1,0,0,"")){_.b("         <p class=\"mgb8\"><strong>Vous avez lu ");_.b(_.v(_.f("readNumber",c,p,0)));_.b(" des ");_.b(_.v(_.f("limit",c,p,0)));_.b(" articles offerts ce mois-ci.</strong></p>");_.b("\n");};_.b("      <p class=\"mgb8\">Pour un accès illimité, <a onclick=\"return xt_adc(this, 'INT-43-");_.b(_.v(_.f("step",c,p,0)));_.b("')\" href=\"/abonnement/achat.html#");_.b(_.v(_.f("key",c,p,0)));_.b("\">abonnez-vous</a></p>");_.b("\n" + i);_.b("      <p class=\"txt1\">Déjà abonné ? <a href=\"/account/?route=connexion\">Identifiez-vous</a></p>");_.b("\n" + i);_.b("   </div>");_.b("\n" + i);_.b("</div>");return _.fl();;}})