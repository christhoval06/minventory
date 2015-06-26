/**
 * Created by christhoval on 02/04/15.
 */


/**** categoriasFormButtons ******/

Template.categoriasFormButtons.helpers({
    isCategoriaSeleccionada: function () {
        return Session.get('categoriaSeleccionada') ? true : false;
    }
});

Template.categoriasFormButtons.events({
    'click button.delete-categoria': function (e, t) {
        e.preventDefault();
        var c = Session.get('categoriaSeleccionada');
        Meteor.call('removeCategoria', c._id);
        Session.set('categoriaSeleccionada', null);
    }
});

/**** addCategoria ******/
Template.addCategoria.helpers({
    categoriaSeleccionada: function () {
        return Session.get('categoriaSeleccionada') || {active: true};
    }
});

Template.addCategoria.events({
    'submit form#categoria-add-form': function (e, t) {
        'use strict';

        e.preventDefault();


        var c = new Categoria();
        c.setName(t.find('#categoria-add-form-name').value);
        c.setDescription(t.find('#categoria-add-form-description').value);
        c.setActive(t.find('#categoria-add-form-active').checked);

        var id = t.find('#categoria-add-form-id').value;
        if (!id || id.length < 1) Meteor.call('addCategoria', c);
        else Meteor.call('updateCategoria', id, c);

        t.find('#categoria-add-form-name').value = '';
        t.find('#categoria-add-form-description').value = '';
        t.find('#categoria-add-form-name').checked = false;
        Session.set('categoriaSeleccionada', null);
        return true;
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

