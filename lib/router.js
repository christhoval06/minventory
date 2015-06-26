Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('login', {
        path: '/login',
        template: "accountManager"
    });

    this.route('dashboard', {
        path: '/',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        }
    });

    /*
     *  CATEGORIAS
     */

    this.route('categoriasList', {
        path: ['/categorias', '/categorias/list'],
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        data: function () {
            Session.set('categorias-skip', 0);
            Session.set('categorias-pagina', 0);
            Session.set('categorias-limit', 10);
            Meteor.call('totalCategotiasCount', function (err, total) {
                Session.set('categorias-total', total);
                Session.set('categorias-last-pagina', Math.ceil(Session.get('categorias-total') / Session.get('categorias-limit')));
            });
        }
    });
    this.route('addCategoria', {
        path: ['/categoria', '/categorias/add'],
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        data: function () {
            Session.set('categoriaSeleccionada', null);
        }
    });
    this.route('editCategoria', {
        path: ['/categoria/:_id', '/categorias/edit/:_id'],
        onBeforeAction: function (pause) {
            console.log("onBeforeAction");
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        template: 'addCategoria',
        data: function () {
            Session.set('categoriaSeleccionada', Categorias.findOne({_id: this.params._id}));
        }
    });

    /*
     *  PRODUCTOS
     */

    this.route('productosList', {
        path: ['/productos', '/productos/list'],
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        data: function () {
            Session.set('productos-skip', 0);
            Session.set('productos-pagina', 0)
            Session.set('productos-limit', 10);
            Meteor.call('totalProductosCount', function (err, total) {
                Session.set('productos-total', total);
                Session.set('productos-last-pagina', Math.ceil(Session.get('productos-total') / Session.get('productos-limit')));
            });
        }
    });
    this.route('addProducto', {
        path: ['/producto', '/productos/add'],
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        data: function () {
            Session.set('productoSeleccionado', null);
        }
    });
    this.route('editProducto', {
        path: ['/producto/:_id', '/productos/edit/:_id'],
        //noDataFoundTemplate: "dashboard",
        //notFoundTemplate: 'dashboard',
        onBeforeAction: function (pause) {
            console.info("onBeforeAction");
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        template: 'addProducto',
        data: function () {
            Session.set('productoSeleccionado', Productos.findOne({_id: this.params._id}));
            console.info("editProducto");
            if (this.ready()) {
                console.info("ready");
            }
            return Session.get('productoSeleccionado');
        },
        onAfterAction: function () {
            console.info("onAfterAction");
        },

        action: function () {
            console.info("action");
            this.render();
        }
    });

    /*
     *  COMPRAS
     */

    this.route('comprasList', {
        path: ['/compras', '/compras/list'],
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        data: function () {
        }
    });

    this.route('facturaCompra', {
        path: ['/compra', '/compras/add'],
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('login');
            } else {
                this.next();
            }
        },
        data: function () {
        }
    });
});