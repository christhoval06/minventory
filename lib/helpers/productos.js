Meteor.methods({
    addProducto: function (c) {
        "use strict";
        // TODO: should there a server validation of item?

        return Productos.insert({
            name: c.getName(),
            description: c.getDescription(),
            active: c.getActive(),
            createdBy: Meteor.userId(),
            createdAt: new Date()
        }, function (err, _id) {
            if (err) throw new Meteor.Error("user-defined-error", "no se pudo crear la Producto");
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
                active: c.getActive(),
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