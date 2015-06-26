/**** categoriasFormButtons ******/

Template.categoriasFormButtons.helpers({
    isCategoriaSeleccionada: function () {
        return Session.get('categoriaSeleccionada') ? true : false;
    }
});

Template.categoriasFormButtons.events({
    'click button.delete-categoria': function (e, t) {
        e.preventDefault();
        var self = this;
        bootbox.confirm("Deseas eliminar este producto?", function (r) {
            if (r) {
                Meteor.call('removeCategoria', self._id);
                Session.set('categoriaSeleccionada', null);
            }
        });
    }
});

/**** addCategoria ******/
Template.addCategoria.helpers({
    categoriaSeleccionada: function () {
        return Session.get('categoriaSeleccionada') || {active: true};
    },
    getTitle: function () {
        return Session.get('categoriaSeleccionada') ? Session.get('categoriaSeleccionada').name : "Nueva Categoria";
    }
});

Template.addCategoria.events({
    'submit form#categoria-add-form': function (e, t) {
        'use strict';

        e.preventDefault();

        var id = $('.id').val();
        var s = {
            fnt: (!id || id.length < 1) ? 'Agregar' : 'Actualizar',
            add: (!id || id.length < 1)
        };

        e.preventDefault();
        bootbox.confirm("Desea " + s.fnt.toLowerCase() + " este Producto?", function (r) {
            if (r) {
                var c = new Categoria();
                c.setName($('.name').val());
                c.setDescription($('.description').val());
                c.setITBMS($('.itbms').val());
                c.setActive($('.active').is(':checked'));

                if (s.add) Meteor.call('addCategoria', c);
                else Meteor.call('updateCategoria', id, c);
                Session.set('categoriaSeleccionada', null);

                $('form#categoria-add-form').get(0).reset()
            }
        });
    }
});


/**** recientesCategorias ******/
Template.recientesCategorias.helpers({
    categoriasRecientes: function (limit) {
        return Categorias.find({}, {
            limit: limit,
            sort: {createdAt: -1}
        });
    }
});

Template.recientesCategorias.events({
    'click a.list-group-item': function (e, t) {
        e.preventDefault();
        Session.set('categoriaSeleccionada', this);
    }
});

