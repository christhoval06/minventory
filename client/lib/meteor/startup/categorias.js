/**
 * Created by christhoval on 02/04/15.
 */

Meteor.startup(function () {
    Session.setDefault('categoriaSeleccionada', null);
    Session.setDefault('categorias-skip', 0);
    Session.setDefault('categorias-pagina', 0)
    Session.setDefault('categorias-limit', 10);
    Meteor.call('totalCategoriasCount', function (err, total) {
        Session.setDefault('categorias-total', total);
        Session.set('categorias-last-pagina', Math.ceil(Session.get('categorias-total') / Session.get('categorias-limit')));
    });
});
