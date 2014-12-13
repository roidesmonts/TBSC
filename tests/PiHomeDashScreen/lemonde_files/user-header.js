/**
 * Ajout des informations relatives aux utilisateurs dans le header
 */
define(
   ["jquery", "hogan", "lmd/core/auth", "lmd/core/conf", "lmd/module/user/avatar",
    "hoganpower!/partials/general/header/dropdown-inscrit.html.mu@www"],
   function lmdUiHeaderUserHeader($, hogan, auth, conf, avatar, _dropdown) {

      "use strict";

      // Securite sans doute excessive
      // Au-dela de ce point, on a deux cas : abonne ou inscrit
      // auth.user.abonne === true|false
      // auth.user.type === "abonne"|"inscrit"
      if (!auth.authenticated) {
         return {};
      }

      // Elements specifiques a l'utilisateur dans le header
      var user_area,
          user_area_avatar,
          user_area_name,
          _tpl_elements_compte,
          $elements_compte,
          tag,
          tagged_already,
          // Fonctions privees
          displayAvatar,
          displayName,
          initDomEls,
          tagDomBody,

          placeholder_recherche_abo = "Rechercher dans nos articles, archives depuis 1944";

      tagDomBody = function () {
         if (typeof tag === "string") {
            return;
         }
         tag = document.body.className;
         tagged_already = tag.match(/app_abonnes/);
         tagged_already = tagged_already && tag.match(/abonnes/);
         // @todo classes de body abonne a rationnaliser
         //document.body.className = [tag, (auth.user.abonne ? "app_abonnes abonnes js_compte_abonne" : "js_compte_inscrit")].join(" ");
         document.body.className = [tag, (auth.user.abonne ? (!tagged_already ? "app_abonnes" : "" ) : "app_inscrit")].join(" ");
      };

      initDomEls = function () {
         if (!auth.authenticated) {
            return false;
         }
         // Distinction abo / inscrit pour le DOM
         if (auth.user.abonne) {
            user_area = document.getElementById("header_utilisateur_abonnes");
            user_area_avatar = user_area.getElementsByTagName("img")[0];
            user_area_name = user_area.querySelectorAll(".nom")[0];
         } else {
           $elements_compte = $(_dropdown.render());
           user_area = document.getElementById("header_utilisateur");
           user_area_avatar = $elements_compte.find("img").get(0);
           user_area_name = $elements_compte.find(".nom").get(0);
         }
      };

      // Si on le peut, on registre des maintenant le dom utile
      if (auth.user && auth.user.type) {
         initDomEls();
         tagDomBody();
         // Arg, ces exports...
         initDomEls = function () { return ; };
      }

      /**
       * Affichage de l'avatar
       */
      displayAvatar = function () {
         var options = {
            width: user_area_avatar.width,
            height: user_area_avatar.height
         };

         avatar.get(options).done(
            function avatarGetCallback(url) {
               user_area_avatar.src = url;
            }
         );
      };

      /**
       * Affichage du nom
       */
      displayName = function () {
         if (!auth.user) {
            return false;
         }
         if (auth.user.abonne) {
            if (auth.user.nom) {
               user_area_name.innerHTML = auth.user.nom;
            }
            user_area_name.innerHTML = ((auth.user.prenom) ? auth.user.prenom[0] + '.' : '') + "&nbsp;" + user_area_name.innerHTML
         } else {
            user_area_name.innerHTML = "Bonjour";
        }
      };

      // Public
      return {

         /**
          * Mode export (partenaires)
          */
         exportMode : false,

         /**
          * Population des elements utilisateur
          */
         init : function () {
            var self = this;

            initDomEls();
            tagDomBody();

            $(".js_identifiant", user_area).empty().append($elements_compte).show();

            displayAvatar();
            displayName();

            //bouton deconnexion
            $('#bouton_deconnexion').on(
               "click",
               function boutonDeconnexionEvent() {
                  return self.disconnect();
               }
            );

            user_area.style.visibility = "visible";
         },

         /**
          * Rafraichissement des infos utilisateur
          * Marche pour les abonnes.
          */
         refreshUserInfo : function () {
            auth.loadUser(true).done(
               function refreshUserInfoCallback() {
                  displayAvatar();
                  displayName();
               }
            );
         },

         /**
          * Taggage de la page en inscrit/abo
          * @todo : voir en abo la place des classes "app_abonnes" et "abonnes" sur le body ; unifier
          */
         tagDomBody : tagDomBody,

         /**
          * Deconnexion
          */
         disconnect : function () {
            if (auth.authenticated) {
               auth.clearCache();
            }

            return true;
         }

      }; // End Public

   } // End Callback

); // End define
