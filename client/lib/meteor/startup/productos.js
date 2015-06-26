/**
 * Created by christhoval on 02/04/15.
 */

Meteor.startup(function () {
    Session.setDefault('productoSeleccionado', null);
    Session.setDefault('productos-skip', 0);
    Session.setDefault('productos-pagina', 0)
    Session.setDefault('productos-limit', 10);
    Meteor.call('totalProductosCount', function (err, total) {
        Session.setDefault('productos-total', total);
        Session.set('productos-last-pagina', Math.ceil(Session.get('productos-total') / Session.get('productos-limit')));
    });
});
