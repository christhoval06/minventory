/**
 * Created by christhoval on 02/04/15.
 */

/* HACIENDO SUSCRIBE DE categorias*/
Deps.autorun(function () {
    Meteor.subscribe("categorias", {}, {});
});
