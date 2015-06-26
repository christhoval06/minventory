/**
 * Created by christhoval on 01/27/15.
 */

Productos = new Mongo.Collection("productos");
Categorias = new Mongo.Collection("categories");
Inventario = new Mongo.Collection("inventarios");
Compras = new Mongo.Collection("compras");
ComprasDetalle = new Mongo.Collection("comprasdetalle");


Productos.helpers({
    categoria: function () {
        return Categorias.findOne(this.categoriaId);
    }
});

Compras.helpers({
    detalle: function () {
        return ComprasDetalle.find({compraId: this._id});
    },
    count: function () {
        return ComprasDetalle.find({compraId: this._id}).count();
    }
});

ComprasDetalle.helpers({
    producto: function () {
        return Productos.findOne(this.productoId);
    }
});
