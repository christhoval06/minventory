Meteor.methods({
    addProducto: function (c) {
        "use strict";
        // TODO: should there a server validation of item?

        return Productos.insert({
            name: c.getName(),
            description: c.getDescription(),
            categoriaId: c.getCategoriaId(),
            precio: c.getPrecio(),
            cantidad: c.getCantidad(),
            vendidos: c.getVendidos(),
            comprados: c.getComprados(),
            active: c.getActive(),
            createdBy: Meteor.userId(),
            createdAt: new Date()
        }, function (err, _id) {
            if (err) throw new Meteor.Error("user-defined-error", "no se pudo crear el Producto");
            Inventario.insert({
                productoId: _id,
                cantidad: c.getCantidad(),
                precio: c.getPrecio(),
                createdBy: Meteor.userId(),
                createdAt: new Date()
            }, function (err, id) {
                if (err) throw new Meteor.Error("user-defined-error", "no se pudo agregar" + c.getName() + "al Inventario");
            });
            return _id;
        });
    },

    removeProducto: function (_id) {
        Productos.remove(_id);
    },

    updateProducto: function (_id, c) {
        return Productos.update({
            _id: _id
        }, {
            $set: {
                name: c.getName(),
                description: c.getDescription(),
                categoriaId: c.getCategoriaId(),
                active: c.getActive(),
                precio: c.getPrecio(),
                cantidad: c.getCantidad(),
                vendidos: c.getVendidos(),
                comprados: c.getComprados(),
                updatedBy: Meteor.userId(),
                updatedAt: new Date()
            }
        }, function (err, rows) {
            if (err) new Meteor.Error("user-defined-error", "no se pudo actualizar la Producto");
            return rows;
        });
    },
    totalProductosCount: function () {
        return Productos.find().count();
    },
    toggleActiveProducto: function (c) {
        return Productos.update({
            _id: c._id
        }, {
            $set: {
                active: !c.active,
                updatedBy: Meteor.userId(),
                updatedAt: new Date()
            }
        }, function (err, rows) {
            if (err) new Meteor.Error("user-defined-error", "no se pudo cambiar el estado de  la Producto");
            return rows;
        });
    }
});
