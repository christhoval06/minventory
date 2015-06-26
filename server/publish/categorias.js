
/**
 * Created by christhoval on 01/27/15.
 */


/*PUBLISH CATEGORIAS*/
Meteor.publish("categorias", function (filter, options) {
    return Categorias.find(filter, options);
});
