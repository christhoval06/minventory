/**
 * Created by christhoval on 01/27/15.
 */


/*PUBLISH COMPRAS*/
Meteor.publish("compras", function (filter, options) {
    return Compras.find(filter, options);
});
Meteor.publish("comprasDetalles", function (filter, options) {
    return ComprasDetalle.find(filter, options);
});