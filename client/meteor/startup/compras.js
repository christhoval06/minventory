/**
 * Created by christhoval on 06/22/15.
 */
Meteor.startup(function () {
    Session.set('compraSeleccionada', null);
    Session.set('detalleCompra', []);
});