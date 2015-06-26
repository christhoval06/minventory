// ----------------------------------------------------------------------------
// Constructor

Producto = function () {
    this._name = null;
    this._description = null;
    this._categoriaId = null;
    this._precio = 0;
    this._cantidad = 0;
    this._vendidos = 0;
    this._comprados = 0;
    this._active = true;
};


Producto.prototype = {

    constructor: Producto,

    clone: function () {
        var c = new Producto();
        c.setName(this._name);
        c.setDescription(this._description);
        c.setCategoriaId(this._categoriaId);
        c.setPrecio(this._precio);
        c.setCantidad(this._cantidad);
        c.setVendidos(this._vendidos);
        c.setComprados(this._comprados);
        c.setActive(this._active)
        return c;
    },

    equals: function (o) {
        if (!(o instanceof Producto)) {
            return false;
        }
        return EJSON.stringify(this) == EJSON.stringify(o);
    },

    toJSONValue: function () {
        return {
            _name: this._name,
            _description: this._description,
            _categoriaId: this._categoriaId,
            _precio: this._precio,
            _cantidad: this._cantidad,
            _vendidos: this._vendidos,
            _comprados: this._comprados,
            _active: this._active,
        };
    },

    toString: function () {
        var str = "";
        str += "name: " + this._name;
        str += "|";
        str += "description: " + this._description;
        str += "|";
        str += "precio: " + this.precio;
        return str;
    },

    typeName: function () {
        return "Producto";
    },

    // --------------------------------------------------------------------------
    // Setter methods

    setDescription: function (description) {
        if (!description || description.length < 1) return;
        this._description = description;
    },

    setName: function (name) {
        if (!name || name.length < 1) return;
        this._name = name.trim();
    },

    setActive: function (active) {
        this._active = active;
    },

    setCategoriaId: function (categotiaId) {
        this._categoriaId = categotiaId;
    },

    setPrecio: function (precio) {
        this._precio = Number(precio) ? parseFloat(Math.round(Number(precio) * 100) / 100).toFixed(2) : 0;
    },

    setCantidad: function (cantidad) {
        this._cantidad = Number(cantidad) ? Number(cantidad) : 0;
    },

    setComprados: function (comprado) {
        this._comprados = Number(comprado) ? Number(comprado) : 0;
    },

    setVendidos: function (vendidos) {
        this._vendidos = Number(vendidos) ? Number(vendidos) : 0;
    },

    // --------------------------------------------------------------------------
    // Getter methods

    getDescription: function () {
        return this._description;
    },

    getName: function () {
        return this._name;
    },

    getActive: function () {
        return this._active;
    },

    getCategoriaId: function () {
        return this._categoriaId;
    },

    getPrecio: function () {
        return this._precio;
    },
    getComprados: function () {
        return this._comprados;
    },
    getVendidos: function () {
        return this._vendidos;
    },
    getCantidad: function () {
        return this._cantidad;
    },

    // --------------------------------------------------------------------------
    // API methods

    isValidProducto: function () {
        return (this._name !== null) && (this._description !== null);
        return (this._name !== null) && (this._description !== null) && (this._categoriaId !== null);
    },

    clear: function () {
        this._name = null;
        this._description = null;
        this._categoriaId = null;
        this._precio = 0;
        this._cantidad = 0;
        this._vendidos = 0;
        this._comprados = 0;
        this._active = true;
    }
};

// To read about EJSON
// https://www.eventedmind.com/feed/meteor-what-is-ejson
EJSON.addType("Producto", function fromJSONValue(v) {
    var c = new Producto();
    c.setName(v._name);
    c.setDescription(v._description);
    c.setCategoriaId(v._categoriaId);
    c.setPrecio(v._precio)
    c.setCantidad(v._cantidad);
    c.setVendidos(v._vendidos);
    c.setComprados(v._comprados);
    c.setActive(v._active)
    return c;
});
