// ----------------------------------------------------------------------------
// Constructor

Producto = function () {
    this._name = null;
    this._description = null;
    this._active = null;
};


Producto.prototype = {

    // --------------------------------------------------------------------------
    // EJSON methods

    constructor: Producto,

    clone: function () {
        var o = new Producto();
        o.setName(this._name);
        o.setDescription(this._description);
        o.setActive(this._active);
        return o;
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
            _active: this._active
        };
    },

    toString: function () {
        var str = "";
        str += "name: " + this._name;
        str += "|";
        str += "description: " + this._description;
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

    // --------------------------------------------------------------------------
    // API methods

    isValidProducto: function () {
        return (this._name !== null) && (this._description !== null);
    },

    clear: function () {
        this._name = null;
        this._description = null;
        this._active = null;
    }
};

// To read about EJSON
// https://www.eventedmind.com/feed/meteor-what-is-ejson
EJSON.addType("Producto", function fromJSONValue(v) {
    var c = new Producto();
    c.setName(v._name);
    c.setDescription(v._description);
    c.setActive(v._active)
    return c;
});
