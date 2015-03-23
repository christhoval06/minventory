/**** categoriasList ******/
Template.categoriasList.helpers({
    getCategorias: function () {
        return Categorias.find({}, {
            skip: Session.get('categorias-skip'),
            limit: Session.get('categorias-limit'),
            sort: {createdAt: -1}
        });
    },
    previous: function () {
        return Session.get('categorias-pagina') == 0;
    },
    next: function () {
        return Session.get('categorias-pagina') + 1 == Session.get('categorias-last-pagina');
    },
    getPagination: function () {
        var pagination = [];
        for (var i = 1; i <= Session.get('categorias-last-pagina'); i++) {
            pagination[i - 1] = {
                page: i - 1,
                label: i,
                active: Session.get('categorias-pagina') + 1 == i,
                disabled: i < Session.get('categorias-pagina') + 1
            }
        }
        return pagination;
    }
});

Template.categoriasList.events({
    'click button.btn-active': function (e, t) {
        Meteor.call('toggleActiveCategoria', this);
    },
    'click a.categoria-previous': function (e, t) {
        e.preventDefault();
        if (Session.get('categorias-pagina') >= 0) {
            if (Session.get('categorias-skip') >= Session.get('categorias-limit')) {
                Session.set('categorias-skip', Session.get('categorias-skip') - Session.get('categorias-limit'));
                Session.set('categorias-pagina', this.page - 1);
            } else console.log('estas en el inicio');
        } else console.log('llegaste al inicio');
    },
    'click a.categoria-next': function (e, t) {
        e.preventDefault();
        if (Session.get('categorias-pagina') <= Session.get('categorias-last-pagina')) {
            if ((Session.get('categorias-skip') + Session.get('categorias-limit')) <= Session.get('categorias-total')) {
                Session.set('categorias-skip', Session.get('categorias-skip') + Session.get('categorias-limit'));
                Session.set('categorias-pagina', this.page + 1);
            } else console.log('llegaste al final');
        } else console.log('en el final');
    },
    'click a.categorias-edit': function (e, t) {
        e.preventDefault();
        Session.set('categoria-edit', true);
        Session.set('categoriaSeleccionada', this);
        Session.set("page", "addCategoria");
    },
    'click a.categorias-delete': function (e, t) {
        e.preventDefault();
    },
    'click a.categoria-pager': function (e, t) {
        e.preventDefault();
        Session.set('categorias-pagina', this.page);
        Session.set('categorias-skip', this.page * Session.get('categorias-limit'));
    }
});


