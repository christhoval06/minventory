/**
 * Created by christhoval on 01/27/15.
 */


/*PUBLISH CATEGORIAS*/
Meteor.publish("categorias", function (options) {
    return Categorias.find({}, options);
});