// ----------------------------------------------------------------------------
// Constructor

CompraDetalle = function () {
    this._compraId = null;
    this._productoId = null;
    this._cantidad = 0;
    this._precio = 0;
};

Compra.prototype = {

    constructor: CompraDetalle,

    clone: function () {
        var c = new Compra();
        c.setCompraId(this._compraId);
        c.setProductoId(this._productoId);
        c.setCantidad(this._cantidad);
        c.setPrecio(this._precio);
        return c;
    },

    equals: function (o) {
        if (!(o instanceof CompraDetalle)) {
            return false;
        }
        return EJSON.stringify(this) == EJSON.stringify(o);
    },

    toJSONValue: function () {
        return {
            _compraId: this._compraId,
            _productoId: this._productoId,
            _cantidad: this._cantidad,
            _precio: this._precio
        };
    },

    toString: function () {
        var str = "";
        str += "compraId: " + this._compraId;
        str += "|";
        str += "productoId: " + this._productoId;
        str += "|";
        str += "cantidad: " + this._cantidad;
        str += "|";
        str += "subtotal: " + this._precio;
        return str;
    },

    typeName: function () {
        return "CompraDetalle";
    },

    // --------------------------------------------------------------------------
    // Setter methods

    setProductoId: function (p) {
        if (!p || p.length < 1) return;
        this._productoId = p;
    },

    setCompraId: function (c) {
        if (!c || c.length < 1) return;
        this._compraId = c;
    },

    setCantidad: function (c) {
        this._cantidad = Number(c) ? c : 0;
    },

    setPrecio: function (p) {
        this._precio = Number(p) ? p : 0;
    },

    // --------------------------------------------------------------------------
    // Getter methods

    getProductoId: function () {
        return this._productoId;
    },

    getCompraId: function () {
        return this._compraId;
    },

    getCantidad: function () {
        return this._cantidad;
    },

    getPrecio: function () {
        return this._precio;
    },

    // --------------------------------------------------------------------------
    // API methods

    isValidProducto: function () {
        return (this._productoId !== null) && (this._compraId !== null) && (this._cantidad !== null);
    },

    clear: function () {
        this._compraId = null;
        this._productoId = null;
        this._cantidad = 0;
        this._precio = 0;
    }
};

// To read about EJSON
// https://www.eventedmind.com/feed/meteor-what-is-ejson
EJSON.addType("CompraDetalle", function fromJSONValue(v) {
    var c = new CompraDetalle();
    c.setCompraId(v._compraId);
    c.setProductoId(v._productoId);
    c.setCantidad(v._cantidad);
    c.setPrecio(v._precio);
    return c;
});
