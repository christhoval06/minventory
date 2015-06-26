Meteor.methods({
    addCategoria: function (c) {
        "use strict";
        // TODO: should there a server validation of item?

        return Categorias.insert({
            name: c.getName(),
            description: c.getDescription(),
            itbms: c.getITBMS(),
            active: c.getActive(),
            createdBy: Meteor.userId(),
            createdAt: new Date()
        }, function (err, _id) {
            if (err) throw new Meteor.Error("user-defined-error", "no se pudo crear la categoria");
            return _id;
        });
    },

    removeCategoria: function (_id) {
        Categorias.remove(_id);
    },

    updateCategoria: function (_id, c) {
        return Categorias.update({
            _id: _id
        }, {
            $set: {
                name: c.getName(),
                description: c.getDescription(),
                itbms: c.getITBMS(),
                active: c.getActive(),
                updatedBy: Meteor.userId(),
                updatedAt: new Date()
            }
        }, function (err, rows) {
            if (err) new Meteor.Error("user-defined-error", "no se pudo actualizar la categoria");
            return rows;
        });
    },
    totalCategoriasCount: function () {
        return Categorias.find().count();
    },
    toggleActiveCategoria: function (c) {
        return Categorias.update({
            _id: c._id
        }, {
            $set: {
                active: !c.active,
                updatedBy: Meteor.userId(),
                updatedAt: new Date()
            }
        }, function (err, rows) {
            if (err) new Meteor.Error("user-defined-error", "no se pudo cambiar el estado de  la categoria");
            return rows;
        });
    }
});
