/**** productosFormButtons ******/

Template.productosFormButtons.helpers({
    isProductoSeleccionado: function () {
        return Session.get('productoSeleccionado') ? true : false;
    }
});

Template.productosFormButtons.events({
    'click button.delete-producto': function (e, t) {
        e.preventDefault();
        var c = Session.get('productoSeleccionado');
        Meteor.call('removeproducto', c._id);
        Session.set('productoSeleccionado', null);
    }
});

/**** addProducto ******/
Template.addProducto.helpers({
    productoSeleccionado: function () {
        return Session.get('productoSeleccionado') || {active: true};
    },
    getActiveCategorias: function () {
        return Categorias.find({}, {active: true});
    }
});

Template.addProducto.events({
    'submit form#producto-add-form': function (e, t) {
        'use strict';

        e.preventDefault();


        var c = new producto();
        c.setName(t.find('#producto-add-form-name').value);
        c.setDescription(t.find('#producto-add-form-description').value);
        c.setActive(t.find('#producto-add-form-active').checked);

        var id = t.find('#producto-add-form-id').value;
        if (!id || id.length < 1) Meteor.call('addproducto', c);
        else Meteor.call('updateproducto', id, c);

        t.find('#producto-add-form-name').value = '';
        t.find('#producto-add-form-description').value = '';
        t.find('#producto-add-form-name').checked = false;
        Session.set('productoSeleccionado', null);
        return true;
    }
});


/**** recientesProductos ******/
Template.recientesProductos.helpers({
    productosRecientes: function (limit) {
        return Productos.find({}, {
            limit: limit,
            sort: {createdAt: -1}
        });
    }
});

Template.recientesProductos.events({
    'click a.list-group-item': function (e, t) {
        e.preventDefault();
        Session.set('productoSeleccionado', this);
    }
});