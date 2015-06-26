UI.registerHelper('selectedCategoria', function (categoriaId) {
    if (Session.get('productoSeleccionado')) {
        return Session.get('productoSeleccionado').categoriaId == categoriaId;
    }
    return false;
});

UI.registerHelper('shortIt', function (stringToShorten, maxCharsAmount) {
    if (stringToShorten.length > maxCharsAmount) {
        return stringToShorten.substring(0, maxCharsAmount) + '...';
    }
    return stringToShorten;
});

/**** productosFormButtons ******/
Template.productosFormButtons.helpers({
    isProductoSeleccionado: function () {
        return Session.get('productoSeleccionado') ? true : false;
    }
});

Template.productosFormButtons.events({
    'click button.delete-producto': function (e, t) {
        e.preventDefault();
        var self = this;
        bootbox.confirm("Deseas eliminar este producto?", function (r) {
            if (r) {
                Meteor.call('removeProducto', self._id);
                Session.set('productoSeleccionado', null);
            }
        });
    }
});

/**** addProducto ******/


Template.addProducto.created = function () {
    console.log("created");
};

Template.addProducto.rendered = function () {
    var $select = $('select.select2');
    if (!this.rendered) {
        $select.selectize();
        this.rendered = true;
    }
};

Template.addProducto.destroyed = function () {
    console.log("destroyed");
    Session.set('productoSeleccionado', null);
};

Template.addProducto.helpers({
    productoSeleccionado: function () {
        return Session.get('productoSeleccionado') || {active: true};
    },
    getActiveCategorias: function () {
        var categorias = Categorias.find({}, {active: true});
        if (Template.instance().rendered) {
            var $select = $('select.select2');
            if ($select.get(0)) {
                categorias.forEach(function (categoria) {
                    $select.get(0).selectize.addOption({value: categoria._id, text: categoria.name});
                    if (Session.get('productoSeleccionado').categoriaId == categoria._id) {
                        $select.get(0).selectize.setValue(categoria._id);
                    }
                });
                //$select.get(0).selectize.setValue("");
                //$select.get(0).selectize.refreshOptions();
            }
        }
        return categorias;
    },
    isCategoriaSelected: function () {
        console.log("isCategoriaSelected");
        if (Session.get('productoSeleccionado')) {
            if (Session.get('productoSeleccionado').categoriaId == this._id) {
                console.log("isCategoriaSelected1");
                var $select = $('select.select2');
                if ($select.get(0)) {
                    $select.get(0).selectize.setValue(this._id);
                }
            }
        }
        return false;
    },
    getTitle: function () {
        return Session.get('productoSeleccionado') ? Session.get('productoSeleccionado').name : "Nuevo Producto";
    },
    getPage: function () {
        return Session.get('productoSeleccionado') ? "Editar" : "Agregar";
    }
});

Template.addProducto.events({
    'submit form#producto-add-form': function (e, t) {
        'use strict';

        var id = $('.id').val();
        var s = {
            fnt: (!id || id.length < 1) ? 'Agregar' : 'Actualizar',
            add: (!id || id.length < 1)
        };

        e.preventDefault();
        bootbox.confirm("Desea " + s.fnt.toLowerCase() + " este Producto?", function (r) {
            if (r) {
                var c = new Producto();
                c.setName($('.name').val());
                c.setDescription($('.description').val());
                c.setCategoriaId($('select.categoriaId').val());
                c.setPrecio($('.precio').val());
                c.setCantidad($('.cantidad').val());
                c.setVendidos($('.vendido').val());
                c.setComprados($('.comprado').val());
                c.setActive($('.active').is(':checked'));
                if (s.add) console.log(Meteor.call('addProducto', c));
                else console.log(Meteor.call('updateProducto', id, c));
                Session.set('productoSeleccionado', null);

                $('#producto-add-form').get(0).reset();
                $('select.select2').get(0).selectize.setValue("");
            }
        });
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
        Session.set('producto-edit', true);
        Router.go('/producto/' + this._id);
    }
});