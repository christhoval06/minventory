/**** productosList ******/
Template.productosList.helpers({
    getproductos: function () {
        return productos.find({}, {
            skip: Session.get('productos-skip'),
            limit: Session.get('productos-limit'),
            sort: {createdAt: -1}
        });
    },
    previous: function () {
        return Session.get('productos-pagina') == 0;
    },
    next: function () {
        return Session.get('productos-pagina') + 1 == Session.get('productos-last-pagina');
    },
    getPagination: function () {
        var pagination = [];
        for (var i = 1; i <= Session.get('productos-last-pagina'); i++) {
            pagination[i - 1] = {
                page: i - 1,
                label: i,
                active: Session.get('productos-pagina') + 1 == i,
                disabled: i < Session.get('productos-pagina') + 1
            }
        }
        return pagination;
    }
});

Template.productosList.events({
    'click button.btn-active': function (e, t) {
        Meteor.call('toggleActiveproducto', this);
    },
    'click a.producto-previous': function (e, t) {
        e.preventDefault();
        if (Session.get('productos-pagina') >= 0) {
            if (Session.get('productos-skip') >= Session.get('productos-limit')) {
                Session.set('productos-skip', Session.get('productos-skip') - Session.get('productos-limit'));
                Session.set('productos-pagina', this.page - 1);
            } else console.log('estas en el inicio');
        } else console.log('llegaste al inicio');
    },
    'click a.producto-next': function (e, t) {
        e.preventDefault();
        if (Session.get('productos-pagina') <= Session.get('productos-last-pagina')) {
            if ((Session.get('productos-skip') + Session.get('productos-limit')) <= Session.get('productos-total')) {
                Session.set('productos-skip', Session.get('productos-skip') + Session.get('productos-limit'));
                Session.set('productos-pagina', this.page + 1);
            } else console.log('llegaste al final');
        } else console.log('en el final');
    },
    'click a.productos-edit': function (e, t) {
        e.preventDefault();
        Session.set('producto-edit', true);
        Session.set('productoSeleccionado', this);
        Session.set("page", "addproducto");
    },
    'click a.productos-delete': function (e, t) {
        e.preventDefault();
    },
    'click a.producto-pager': function (e, t) {
        e.preventDefault();
        Session.set('productos-pagina', this.page);
        Session.set('productos-skip', this.page * Session.get('productos-limit'));
    }
});


