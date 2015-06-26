/**
 * Created by christhoval on 02/04/15.
 */

Template.menu.helpers({
    getMenu: function () {
        return [
            /* PRODUCTOS */
            {
                label: 'Productos',
                sub: true,
                menu: [
                    {
                        item: true,
                        label: 'Lista',
                        page: 'productosList',
                        exec: function () {
                            Session.set('productos-skip', 0);
                            Session.set('productos-pagina', 0)
                            Session.set('productos-limit', 10);
                            Meteor.call('totalProductosCount', function (err, total) {
                                Session.set('productos-total', total);
                                Session.set('productos-last-pagina', Math.ceil(Session.get('productos-total') / Session.get('productos-limit')));
                            });
                        }
                    },
                    {
                        item: true,
                        label: 'Agregar',
                        page: 'addProducto',
                        exec: function () {
                            Session.set('productoSeleccionado', null);
                        }
                    },
                    {
                        divider: true
                    },
                    {
                        item: true,
                        label: 'En Invenmtario',
                        page: null,
                        exec: function () {
                        }
                    }
                ]
            },

            /* CATEGORIAS */
            {
                label: 'Categorias',
                sub: true,
                menu: [
                    {
                        item: true,
                        label: 'Lista',
                        page: 'categoriasList',
                        exec: function () {
                            Session.set('categorias-skip', 0);
                            Session.set('categorias-pagina', 0)
                            Session.set('categorias-limit', 10);
                            Meteor.call('totalCategotiasCount', function (err, total) {
                                Session.set('categorias-total', total);
                                Session.set('categorias-last-pagina', Math.ceil(Session.get('categorias-total') / Session.get('categorias-limit')));
                            });
                        }
                    },
                    {
                        item: true,
                        label: 'Agregar',
                        page: 'addCategoria',
                        exec: function () {
                            Session.set('categoriaSeleccionada', null);
                        }
                    },
                    {
                        divider: true
                    },
                    {
                        item: true,
                        label: 'En Invenmtario',
                        page: null,
                        exec: function () {
                        }
                    }
                ]
            }
        ];
    }
});
Template.menu.events({
    'click a.click-menu': function (e, t) {
        e.preventDefault();
        this.exec();
        Session.set("page", this.page);
    }
});
