Template.facturaCompra.created = function () {
    //this._compraDetalle = [];
    CompraDetalleTemp = new Mongo.Collection(null);
};

Template.facturaCompra.rendered = function () {
    var $select = $('select.select2');
    if (!this.rendered) {
        $select.selectize({
            persist: false,
            maxItems: 1,
            valueField: '_id',
            labelField: 'name',
            searchField: ['name', 'description'],
            options: Productos.find({active: true, cantidad: {$gt: 0}}, {sort: {name: -1}}).fetch(),
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                        (item.cantidad ? '<span class="email">' + escape(item.cantidad) + '</span>' : '') +
                        '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.cantidad ? item.cantidad : null;
                    return '<div>' +
                        '<span class="label">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption">Inventario: ' + escape(caption) + '</span>' : '') +
                        '</div>';
                }
            },
        });
        this.rendered = true;
    }
};

Template.facturaCompra.destroyed = function () {
    this._compraDetalle = [];
    Session.set('detalleCompra', []);
}


Template.facturaCompra.helpers({
    isFacturaSeleccionado: function () {
        return Session.get('compraSeleccionada') ? true : false;
    },
    getFacturaSelecionada: function () {
        return Session.get('compraSeleccionada') || {active: true};
    },
    getTitle: function () {
        return Session.get('compraSeleccionada') ? Session.get('compraSeleccionada').name : "Nueva Compra";
    },
    getCompraDetalle: function () {
        //return this._compraDetalle;
        if (!Session.get('compraSeleccionada')) {
            return CompraDetalleTemp.find({compraId: "new"});
        } else {
            return ComprasDetalle.find({compraId: Session.get('compraSeleccionada')._id});
        }
    },
    getProductos: function () {
        var productos = Productos.find({active: true, cantidad: {$gt: 0}}, {sort: {name: -1}});
        if (Template.instance().rendered) {
            var $select = $('select.select2');
            if ($select.get(0)) {
                productos.forEach(function (producto) {
                    $select.get(0).selectize.addOption({value: producto._id, text: producto.name});
                });
                $select.get(0).selectize.setValue("");
                //$select.get(0).selectize.refreshOptions();
            }
        }
        return productos;
    }
});

Template.facturaCompra.events({
    'click button.add-producto': function (t, e) {
        var $producto = $('.add-producto'),
            $precio = $('.add-precio'),
            $cantidad = $('.add-cantidad');
        producto = Productos.findOne({_id: $producto.val()});
        if (producto) {
            var precio = Number($precio.val()) ? Number($precio.val()) : Number(producto.precio),
                cantidad = Number($cantidad.val()) ? Number($cantidad.val()) : 1;
            var item = {
                compraId: "new",
                productoId: producto._id,
                producto: producto.name,
                categoria: producto.categoria().name,
                precio: Number(precio).toFixed(2),
                cantidad: cantidad,
                total: parseFloat(precio * cantidad).toFixed(2)
            };
            CompraDetalleTemp.insert(item);
            //Template.instance()._compraDetalle.push(item);

            $producto.val("");
            $precio.val("");
            $cantidad.val("");
        }
    }
});
