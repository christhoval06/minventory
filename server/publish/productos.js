/**
 * Created by christhoval on 01/27/15.
 */


/*PUBLISH PRODUCTOS*/
Meteor.publish("productos", function (filter, options) {
    return Productos.find(filter, options);
});