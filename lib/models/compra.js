Compra = function () {
    this._numero = null;
    this._fecha = null;
    this._cliente = null;
    this._compraDetalle = [];
    this._articulos = 0;
    this._subtotal = 0;
    this._itbms = 0;
    this._descuento = 0;
    this._total = 0;
    this._active = 0;
};


Compra.prototype = {

    constructor: Compra,

    clone: function () {
        var c = new Compra();
        c.setNumero(this._numero);
        c.setFecha(this._fecha);
        c.setCliente(this._cliente);
        c.setCompraDetalle(this._compraDetalle);
        c.setArticulos(this._articulos);
        c.setSubtotal(this._subtotal);
        c.setDescuento(this._descuento);
        c.setITBMS(this._itbms);
        c.setTotal(this._total);
        c.setActive(this._active);
        return c;
    },

    equals: function (o) {
        if (!(o instanceof Compra)) {
            return false;
        }
        return EJSON.stringify(this) == EJSON.stringify(o);
    },

    toJSONValue: function () {
        return {
            _name: this._name,
            _description: this._description,
            _active: this._active,
            _categoriaId: this._categoriaId,
            _cantidad: this._cantidad,
            _vendidos: this._vendidos,
            _comprados: this._comprados,
        };
    },

    toString: function () {
        var str = "";
        str += "fecha: " + this._fecha;
        str += "|";
        str += "numero: " + this._numero;
        str += "|";
        str += "cliente: " + this._cliente;
        str += "|";
        str += "subtotal: " + this._subtotal;
        str += "|";
        str += "descuento: " + this._descuento;
        str += "|";
        str += "itbms: " + this._itbms;
        str += "|";
        str += "total: " + this._total;
        return str;
    },

    typeName: function () {
        return "Compra";
    },

    // --------------------------------------------------------------------------
    // Setter methods

    setFecha: function (f) {
        if (!f || f.length < 1) return;
        this._fecha = f;
    },

    setNumero: function (n) {
        if (!n || n.length < 1) return;
        this._numero = n.trim();
    },

    setActive: function (active) {
        this._active = active;
    },

    setCompraDetalle: function (c) {
        this._compraDetalle = c;
    },

    setCliente: function (c) {
        this._cliente = c
    },

    setSubtotal: function (s) {
        this._subtotal = Number(s) ? Number(s).toFixed(2) : 0;
    },

    setITBMS: function (itbms) {
        this._itbms = Number(itbms) ? Number(itbms).toFixed(2) : 0;
    },
    setDescuento: function (d) {
        this._descuento = Number(d) ? Number(d).toFixed(2) : 0;
    },
    setTotal: function (t) {
        this._total = Number(t) ? Number(t).toFixed(2) : 0;
    },
    setArticulos: function (a) {
        this._articulos = Number(a) ? a : 0;
    },
    // --------------------------------------------------------------------------
    // Getter methods

    getFecha: function () {
        return this._fecha;
    },
    getNumero: function () {
        return this._numero;
    },
    getCliente: function () {
        return this._cliente;
    },
    getArticulos: function () {
        return this._articulos;
    },
    getCompraDetalle: function () {
        return this._compraDetalle;
    },
    getSubtotal: function () {
        return this._subtotal;
    },
    getDescuento: function () {
        return this._descuento;
    },
    getITBMS: function () {
        return this._itbms;
    },
    getTotal: function () {
        return this._total;
    },
    getActive: function () {
        return this._active;
    },

    // --------------------------------------------------------------------------
    // API methods

    isValidProducto: function () {
        return (this._numero !== null) && (this._fecha !== null) && (this._cliente !== null) && this._compraDetalle;
    },

    clear: function () {
        this._numero = null;
        this._fecha = null;
        this._cliente = null;
        this._compraDetalle = [];
        this._articulos = 0;
        this._subtotal = 0;
        this._itbms = 0;
        this._descuento = 0;
        this._total = 0;
        this._active = 0;
    }
};

// To read about EJSON
// https://www.eventedmind.com/feed/meteor-what-is-ejson
EJSON.addType("Compra", function fromJSONValue(v) {
    var c = new Compra();
    c.setNumero(v._numero);
    c.setFecha(v._fecha);
    c.setCliente(v._cliente);
    c.setCompraDetalle(v._compraDetalle);
    c.setArticulos(v._articulos);
    c.setSubtotal(v._subtotal);
    c.setDescuento(v._descuento);
    c.setITBMS(v._itbm);
    c.setTotal(v._total);
    c.setActive(v._active);
    return c;
});
