/* le code utilise est la version minifiee (apps/web/View/partials/layout/context/dynamic.html.mu)*/
(function (lmd, undefined) {
  'use strict';

  var cook = function (i) {
    return (document.cookie.match('(^|; )' + i + '=([^;]*)') || 0)[2];
  },
  redirect = function (url) {
    if (window.location + '' !== url) {
      window.location = url;
    }
  },
  get_url_with_host = function (host) {
    return 'http://' + host + window.location.pathname + document.location.search + window.location.hash;
  },
  get_connection_url = function (host) {
    host = host.replace('www', 'wwws').replace('abonnes', 'wwws').replace('mobile', 'wwws').replace('mobileabo', 'wwws');
    var url = 'https://' + host + '/account/?route=connexion&redirect=';
    return url + encodeURIComponent(window.location.href);
  },
  conf_overload = function (cookie_suffix, conf) {
    var cookie_conf = cook('over_conf_' + cookie_suffix),
        vars,
        key;

    if (! cookie_conf) {
      return;
    }

    vars = JSON.parse(decodeURIComponent(cookie_conf));

    for (key in vars) {
      if (conf[key] === undefined) {
        continue;
      }

      if (vars[key] === 'false') {
        conf[key] = false;
      } else if (vars[key] === 'true') {
        conf[key] = true;
      } else {
        conf[key] = vars[key];
      }
    }
  },
  cookie_alm = cook('alm'),
  cookie_abo = cook('tdb_user_abo'),
  abo_user_id = 0,
  abo_user_id_tab,
  current_url = window.location.href,
  context = lmd.context,
  conf = lmd.conf,
  free_app = (context.application === 'mobileabo' ? 'mobile' : 'www'),
  abonne_app = (context.application === 'mobile' ? 'mobileabo' : 'abonnes'),
  tunnel = (context.pageType === 'Tunnel_Abonnement');

  if (cookie_alm !== undefined && cookie_alm !== '') {
    abo_user_id_tab = cookie_alm.split('-');
    if (abo_user_id_tab.length > 2) {
      abo_user_id = parseInt(abo_user_id_tab[abo_user_id_tab.length - 2], 10);
    }
  }

  lmd.auth_sync = {};
  lmd.auth_sync.user_id = abo_user_id;
  lmd.auth_sync.abonne = false;

  // Gestion surcharge conf
  conf_overload('fsw', conf.fsw, true);
  conf_overload('advert', context.page.advert, false);

  var url = null;

  /**
   * Pas de cookie abonne present.
   *
   * En temps normal, c'est le module Apache "mod_access_lemonde" qui fait
   * le controle d'access.
   * Mais la, nous sommes dans le cache CDN et on ne passe pas par Apache.
   * Donc, on doit refaire le meme controle ici en JavaScript.
   */
  if (cookie_abo === undefined || cookie_abo === '') {
    // ... et on essaie d'acceder une page abonne
    if (context.application === 'abonnes' || context.application === 'mobileabo') {
      // Dans le cas des articles, on redirige vers son teaser
      if (window.location.pathname.indexOf('/article/') > 1) {
        url = get_url_with_host(conf[free_app].location.hostname);
        redirect(url);
        return;
      }

      // Sinon, on redirige vers la page de connexion
      url = get_connection_url(conf[free_app].location.hostname);
      redirect(url);
    }

    // Le parcours sans cookie abonne s'arrete la
    return;
  }

  /**
   * Tout ce qui suit se passe en mode abonne
   */
  lmd.auth_sync.abonne = true;

  /**
   * Tentative d'acceder la page en www et pas sur le teaser =>
   * on redirige vers la version abonnes de l'url courante
   */
  if (!tunnel && context.application !== 'abonnes' && context.application !== 'mobileabo' && !/\/teaser\/?/.test(current_url))
  {
    url = get_url_with_host(conf[abonne_app].location.hostname);
    redirect(url);
    return;
  }

  /**
   * Utilisateur abonne mais pas connecte (donc cookie "alm" absent) =>
   * on repasse par Lemonde_Www_Controller_Commun_Connexion::actionIdentifierUtilisateur()
   * pour recuperer le cookie "alm".
   */
  if (!abo_user_id && (context.application === 'abonnes' || context.application === 'mobileabo'))
  {
    url = 'http://' + conf[free_app].location.hostname + '/teaser/?connexion&url_zop=' + encodeURIComponent(window.location.href);
    redirect(url);
    return;
  }
})(this.lmd);
