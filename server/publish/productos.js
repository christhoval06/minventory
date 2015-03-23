/**
 * Created by christhoval on 01/27/15.
 */


/*PUBLISH CATEGORIAS*/
Meteor.publish("productos", function (options) {
    return Categorias.find({}, options);
});